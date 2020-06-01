import PropTypes from "prop-types";
import React, {forwardRef, useRef, useState} from "react";

import AInputBase from "../AInputBase";
import AIcon from "../AIcon";
import {ADropdown, ADropdownMenu, ADropdownMenuItem} from "../ADropdown";
import {keyCodes} from "../../utils/helpers";
import "./ASelect.scss";

let selectCounter = 0;
const WAIT_TO_FOCUS_ACTIVE_ITEM = 50;

const ASelect = forwardRef(
  (
    {
      className: propsClassName,
      disabled,
      hint,
      itemDisabled = "disabled",
      itemSelected = "selected",
      itemText = "text",
      itemValue = "value",
      items = [],
      label,
      onSelected,
      placeholder,
      readOnly,
      validationState,
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
    const [isFocused, setIsFocused] = useState(false);
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

    const chevronProps = {
      className: "a-select__chevron"
    };

    const selectionProps = {
      className: "a-select__selection"
    };

    if (label) {
      selectionProps["aria-labelledby"] = `a-select__label_${selectId}`;
    }

    if (!disabled) {
      selectionProps.ref = surfaceRef;
      selectionProps.tabIndex = 0;
      selectionProps.role = "button";

      selectionProps.onFocus = () => {
        setIsFocused(true);
      };

      selectionProps.onBlur = () => {
        setIsFocused(false);
      };

      if (!readOnly) {
        chevronProps.onClick = selectionProps.onClick = () => {
          setIsOpen(!isOpen);
          setTimeout(() => {
            const selectedIndex = getSelectedIndex();
            if (selectedIndex > -1) {
              const dropdownItems = dropdownMenuRef.current.querySelectorAll(
                ".a-dropdown__item"
              );
              dropdownItems[selectedIndex].focus();
            }
          }, WAIT_TO_FOCUS_ACTIVE_ITEM);
        };

        if (isOpen) {
          selectionProps.className += " a-select__surface--focused";
        }

        selectionProps.onKeyDown = (e) => {
          if ([keyCodes.enter, keyCodes.space].includes(e.keyCode)) {
            e.preventDefault();
            setIsOpen(!isOpen);
            setTimeout(() => {
              const selectedIndex = getSelectedIndex();
              if (selectedIndex > -1) {
                const dropdownItems = dropdownMenuRef.current.querySelectorAll(
                  ".a-dropdown__item"
                );
                dropdownItems[selectedIndex].focus();
              }
            }, WAIT_TO_FOCUS_ACTIVE_ITEM);
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
    }

    const selectItem = (item) => {
      setSelectedItem(item);
      onSelected && onSelected(item);
    };

    return (
      <AInputBase
        {...rest}
        ref={ref}
        className={className}
        label={label}
        labelId={`a-select__label_${selectId}`}
        onClickLabel={() => !disabled && surfaceRef.current.focus()}
        disabled={disabled}
        append={
          <AIcon {...chevronProps} size={10}>
            chevron-down
          </AIcon>
        }
        focused={isFocused || isOpen}
        readOnly={readOnly}
        validationState={validationState}
        hint={hint}>
        <ADropdown style={{width: "100%"}}>
          <div {...selectionProps} className="a-select__selection">
            {(selectedItem && selectedItem[itemText]) ||
              selectedItem ||
              placeholder}
          </div>
          <ADropdownMenu
            open={isOpen}
            onClose={() => setIsOpen(false)}
            ref={dropdownMenuRef}
            role="listbox"
            className="a-select__menu-items">
            {items.map((item, index) => {
              const itemProps = {
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

                if (
                  selectedItem &&
                  item[itemValue] === selectedItem[itemValue]
                ) {
                  itemProps.className += " a-select__menu-item--selected";
                  itemProps["aria-selected"] = true;
                }
              }

              return (
                <ADropdownMenuItem
                  key={`a-select__menu-item_${index}`}
                  {...itemProps}
                />
              );
            })}
          </ADropdownMenu>
        </ADropdown>
      </AInputBase>
    );
  }
);

ASelect.propTypes = {
  /**
   * Toggles the disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * Sets the hint content.
   */
  hint: PropTypes.node,
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
   * Sets the label content.
   */
  label: PropTypes.node,
  /**
   * Handles the `selected` event.
   */
  onSelected: PropTypes.func,
  /**
   * Sets the text when no option is selected.
   */
  placeholder: PropTypes.string,
  /**
   * Toggles the `read-only` state
   */
  readOnly: PropTypes.bool,
  /**
   * Applies a validation state.
   */
  validationState: PropTypes.oneOf(["default", "warning", "danger"])
};

ASelect.displayName = "ASelect";

export default ASelect;
