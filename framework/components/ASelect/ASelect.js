import PropTypes from "prop-types";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

import AInputBase from "../AInputBase";
import AFormContext from "../AForm/AFormContext";
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
      required,
      rules,
      validateOnBlur,
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
    const [error, setError] = useState("");
    const [workingValidationState, setWorkingValidationState] = useState(
      validationState
    );

    const {register} = useContext(AFormContext);
    useEffect(() => {
      setWorkingValidationState(validationState);
    }, [validationState]);

    useEffect(() => {
      if (register) {
        register(`a-select_${selectId}`, {
          reset,
          validate
        });
      }
    }, [validationState, selectedItem, rules]); // eslint-disable-line react-hooks/exhaustive-deps

    let className = "a-select";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    const getSelectedIndex = () => {
      return items.findIndex((item) => {
        if (typeof item === "string") {
          return item === selectedItem;
        } else if (typeof item === "object") {
          return selectedItem
            ? item[itemValue] === selectedItem[itemValue]
            : null;
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

    const validate = (testValue = selectedItem) => {
      if (rules || required) {
        let workingRules = [];
        if (rules) {
          workingRules = [...rules];
        }

        if (required) {
          workingRules = [
            {
              test: (v) => {
                if (typeof testValue === "string") {
                  return !!v || `${label ? label + " is r" : "R"}equired`;
                }

                if (typeof testValue === "object") {
                  return (
                    !!v[itemValue] || `${label ? label + " is r" : "R"}equired`
                  );
                }

                return `${label ? label + " is r" : "R"}equired`;
              },
              level: "danger"
            },
            ...workingRules
          ];
        }

        setWorkingValidationState("default");
        setError(null);
        for (let i = 0; i < workingRules.length; i++) {
          const error = workingRules[i].test(testValue);
          if (error !== true) {
            setError(error);
            setWorkingValidationState(workingRules[i].level || "danger");
            return {
              message: error,
              level: workingRules[i].level || "danger"
            };
          }
        }
      }
    };

    const reset = () => {
      setWorkingValidationState(validationState);
      setError("");
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

      selectionProps.onBlur = (e) => {
        setIsFocused(false);
        validateOnBlur &&
          !dropdownMenuRef.current.contains(e.relatedTarget) &&
          validate(selectedItem);
      };

      if (!readOnly) {
        chevronProps.onClick = selectionProps.onClick = () => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            reset();
          }

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
      !validateOnBlur && validate(item);
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
        validationState={workingValidationState}
        hint={error || hint}>
        <ADropdown style={{width: "100%"}}>
          <div {...selectionProps} className="a-select__selection">
            {typeof selectedItem === "string"
              ? selectedItem
              : typeof selectedItem === "object"
              ? selectedItem[itemText]
              : placeholder}
          </div>
          <ADropdownMenu
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
              surfaceRef.current.focus();
            }}
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
   * Toggles a default rule for required values.
   */
  required: PropTypes.bool,
  /**
   * Sets validation rules for the component.
   */
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      test: PropTypes.func,
      level: PropTypes.string
    })
  ),
  /**
   * Sets the validation rules to evaluate on `blur` rather than on `change`.
   */
  validateOnBlur: PropTypes.bool,
  /**
   * Applies a validation state.
   */
  validationState: PropTypes.oneOf(["default", "warning", "danger"])
};

ASelect.displayName = "ASelect";

export default ASelect;
