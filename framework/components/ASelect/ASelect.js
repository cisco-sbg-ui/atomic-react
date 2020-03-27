import PropTypes from "prop-types";
import React, {forwardRef, useRef, useState} from "react";

import "./ASelect.scss";
import AIcon from "../AIcon";
import {ADropdown, ADropdownMenu, ADropdownMenuItem} from "../ADropdown";
import {keyCodes} from "../../utils/helpers";

let selectCounter = 0;

const ASelect = forwardRef(
  (
    {
      children,
      className: propsClassName,
      disabled,
      itemDisabled = "disabled",
      itemSelected = "selected",
      itemText = "text",
      itemValue = "value",
      items = [],
      label,
      onSelected,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const dropdownMenuRef = useRef(null);
    const surfaceRef = useRef(null);

    const [selectId] = useState(selectCounter++);

    const [selectedItem, setSelectedItem] = useState(
      items.find((x) => x[itemSelected])
    );
    const [isOpen, setIsOpen] = useState(false);
    let className = "a-select";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    const getSelectedIndex = () => {
      return items.findIndex((item) => {
        if (typeof item === "string") {
          return item === selectedItem;
        } else if (typeof item === "object") {
          return item[itemValue] === selectedItem[itemValue];
        }
      });
    };

    const getPreviousItem = (selectedIndex) => {
      if (items.every((x) => x[itemDisabled])) return null;

      let newItem = items[selectedIndex - 1];
      if (!newItem) {
        newItem = items[items.length - 1];
      }

      if (newItem[itemDisabled]) {
        return getPreviousItem(selectedIndex - 1);
      }

      return newItem;
    };

    const getNextItem = (selectedIndex) => {
      if (items.every((x) => x[itemDisabled])) return null;

      let newItem = items[selectedIndex + 1];
      if (!newItem) {
        newItem = items[0];
      }

      if (newItem[itemDisabled]) {
        return getNextItem(selectedIndex + 1);
      }

      return newItem;
    };

    const surfaceProps = {
      className: "a-select__surface"
    };

    if (disabled) {
      surfaceProps.className += " a-select__surface--disabled";
    } else {
      if (label) {
        surfaceProps["aria-labelledby"] = `a-select__label_${selectId}`;
      }

      surfaceProps.ref = surfaceRef;
      surfaceProps.tabIndex = 0;
      surfaceProps.onClick = () => {
        setIsOpen(!isOpen);
        setTimeout(() => {
          const selectedIndex = getSelectedIndex();
          if (selectedIndex > -1) {
            dropdownMenuRef.current
              .querySelectorAll(".a-dropdown__item")
              [selectedIndex].focus();
          }
        }, 10);
      };
      if (isOpen) {
        surfaceProps.className += " a-select__surface--focused";
      }

      surfaceProps.onKeyDown = (e) => {
        if ([keyCodes.enter, keyCodes.space].includes(e.keyCode)) {
          e.preventDefault();
          setIsOpen(!isOpen);
          setTimeout(() => {
            const selectedIndex = getSelectedIndex();
            if (selectedIndex > -1) {
              dropdownMenuRef.current
                .querySelectorAll(".a-dropdown__item")
                [selectedIndex].focus();
            }
          }, 10);
        } else if (e.keyCode === keyCodes.up) {
          e.preventDefault();
          const newItem = getPreviousItem(getSelectedIndex());
          newItem && selectItem(newItem);
        } else if (e.keyCode === keyCodes.down) {
          e.preventDefault();
          const newItem = getNextItem(getSelectedIndex());
          newItem && selectItem(newItem);
        }
      };
    }

    const selectItem = (item) => {
      setSelectedItem(item);
      onSelected && onSelected(item);
    };

    return (
      <div {...rest} ref={ref} className={className}>
        {label && (
          <div
            id={`a-select__label_${selectId}`}
            onClick={() => !disabled && surfaceRef.current.focus()}
            className="a-select__label">
            {label}
          </div>
        )}
        <ADropdown style={{width: "100%"}}>
          <div {...surfaceProps}>
            <div className="a-select__selection">
              {(selectedItem && selectedItem[itemText]) ||
                selectedItem ||
                placeholder}
            </div>
            <AIcon size={10}>chevron-down</AIcon>
          </div>
          <ADropdownMenu
            open={isOpen}
            onClose={() => setIsOpen(false)}
            ref={dropdownMenuRef}
            role="listbox"
            className="a-select__menu-items">
            {items.map((item, index) => {
              const itemProps = {
                key: `a-select__menu-item_${index}`,
                value: null,
                children: null,
                className: "a-select__menu-item",
                role: "option",
                "aria-selected": false
              };

              if (typeof item === "string") {
                itemProps.value = item;
                itemProps.children = item;
                itemProps.onClick = () => {
                  selectItem(item);
                };

                if (item === selectedItem) {
                  itemProps.className += " a-select__menu-item--selected";
                  itemProps["aria-selected"] = true;
                }
              } else if (typeof item === "object") {
                itemProps.value = item[itemValue];
                itemProps.children = item[itemText];
                if (item[itemDisabled]) {
                  itemProps["aria-disabled"] = true;
                } else {
                  itemProps.onClick = () => {
                    selectItem(item);
                  };
                }

                if (item[itemValue] === selectedItem[itemValue]) {
                  itemProps.className += " a-select__menu-item--selected";
                  itemProps["aria-selected"] = true;
                }
              }

              return <ADropdownMenuItem {...itemProps} />;
            })}
          </ADropdownMenu>
        </ADropdown>
      </div>
    );
  }
);

ASelect.propTypes = {
  /**
   * Toggles the disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * The property name of the value indicating a disabled option when `items` is an array of objects.
   */
  itemDisabled: PropTypes.string,
  /**
   * The property name of the value indicating a selected option when `items` is an array of objects.
   */
  itemSelected: PropTypes.string,
  /**
   * The property name of the option text when `items` is an array of objects.
   */
  itemText: PropTypes.string,
  /**
   * The property name of the option value when `items` is an array of objects.
   */
  itemValue: PropTypes.string,
  /**
   * An array of select options.
   */
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object)
  ]),
  /**
   * Sets the select label text.
   */
  label: PropTypes.node,
  /**
   * Handles the `selected` event.
   */
  onSelected: PropTypes.func,
  /**
   * Sets the text when no option is selected.
   */
  placeholder: PropTypes.string
};

export default ASelect;
