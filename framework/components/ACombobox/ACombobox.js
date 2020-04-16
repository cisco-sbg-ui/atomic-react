import PropTypes from "prop-types";
import React, {forwardRef, useRef, useState} from "react";

import "./ACombobox.scss";
import {ADropdown, ADropdownMenu, ADropdownMenuItem} from "../ADropdown";
import ATextInput from "../ATextInput";
import {keyCodes} from "../../utils/helpers";

const ACombobox = forwardRef(
  (
    {
      children,
      className: propsClassName,
      disabled,
      itemText = "text",
      itemValue = "value",
      items = [],
      label,
      noDataContent,
      onChange,
      onSelected,
      placeholder,
      value,
      ...rest
    },
    ref
  ) => {
    const dropdownMenuRef = useRef(null);
    const surfaceRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    let className = "a-combobox";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    return (
      <div {...rest} ref={ref} className={className}>
        <ADropdown style={{width: "100%"}}>
          <ATextInput
            appendIcon="chevron-down"
            onClickAppend={() => setIsOpen(!isOpen)}
            disabled={disabled}
            placeholder={placeholder}
            ref={surfaceRef}
            value={value}
            onChange={(e) => {
              setIsOpen(items.length || noDataContent);
              onChange && onChange(e);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === keyCodes.up) {
                e.preventDefault();
                setIsOpen(items.length || noDataContent);
                const menuItems = Array.from(
                  dropdownMenuRef.current.querySelectorAll(
                    ".a-dropdown__item[tabindex]"
                  )
                );
                if (menuItems.length) {
                  menuItems[menuItems.length - 1].focus();
                }
              } else if (e.keyCode === keyCodes.down) {
                e.preventDefault();
                setIsOpen(items.length || noDataContent);
                const menuItems = Array.from(
                  dropdownMenuRef.current.querySelectorAll(
                    ".a-dropdown__item[tabindex]"
                  )
                );
                if (menuItems.length) {
                  menuItems[0].focus();
                }
              }
            }}
          />
          <ADropdownMenu
            focusOnOpen={false}
            open={Boolean((items.length || noDataContent) && isOpen)}
            onClose={() => setIsOpen(false)}
            ref={dropdownMenuRef}
            role="listbox"
            className="a-combobox__menu-items">
            {!items.length && !!noDataContent && (
              <ADropdownMenuItem>{noDataContent}</ADropdownMenuItem>
            )}
            {items.map((item, index) => {
              const itemProps = {
                key: `a-combobox__menu-item_${index}`,
                value: null,
                children: null,
                className: "a-combobox__menu-item",
                role: "option",
                "aria-selected": false
              };

              if (typeof item === "string") {
                itemProps.value = item;
                itemProps.children = item;
                itemProps.onClick = () => {
                  setIsOpen(false);
                  onSelected && onSelected(item);
                };
              } else if (typeof item === "object") {
                itemProps.value = item[itemValue];
                itemProps.children = item[itemText];
                itemProps.onClick = () => {
                  setIsOpen(false);
                  onSelected && onSelected(item);
                };
              }

              return <ADropdownMenuItem {...itemProps} />;
            })}
          </ADropdownMenu>
        </ADropdown>
      </div>
    );
  }
);

ACombobox.propTypes = {
  /**
   * Toggles the disabled state.
   */
  disabled: PropTypes.bool,
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
   * Sets the content for when no matches are available.
   */
  noDataContent: PropTypes.node,
  /**
   * Handles the `change` event for when the text input is modified.
   */
  onChange: PropTypes.func,
  /**
   * Handles the `selected` event for when a selection is chosen in the dropdown.
   */
  onSelected: PropTypes.func,
  /**
   * Sets the text when no option is selected.
   */
  placeholder: PropTypes.string,
  /**
   * Sets the text input value.
   */
  value: PropTypes.string
};

export default ACombobox;
