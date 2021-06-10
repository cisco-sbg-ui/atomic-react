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
import AMenu from "../AMenu";
import {AListItem} from "../AList";
import {keyCodes} from "../../utils/helpers";
import "./ASelect.scss";

let selectCounter = 0;
const WAIT_TO_FOCUS_ACTIVE_ITEM = 50;

const ASelect = forwardRef(
  (
    {
      appendContent,
      className: propsClassName,
      disabled,
      hint,
      itemDisabled = "disabled",
      itemSelected = "selected",
      itemTemplate,
      itemText = "text",
      itemValue = "value",
      items = [],
      label,
      onSelected,
      placeholder,
      prependContent,
      readOnly,
      required,
      rules,
      validateOnBlur,
      validationState,
      ...rest
    },
    ref
  ) => {
    const menuRef = useRef(null);
    const inputBaseSurfaceRef = useRef(null);
    const surfaceRef = useRef(null);
    const [selectId] = useState(selectCounter++);
    const [originalSelectedItem, setOriginalSelectedItem] = useState(
      items.find((x) => x[itemSelected])
    );
    const [selectedItem, setSelectedItem] = useState(
      items.find((x) => x[itemSelected])
    );
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState("");
    const [workingValidationState, setWorkingValidationState] =
      useState(validationState);

    const {register} = useContext(AFormContext);
    useEffect(() => {
      setWorkingValidationState(validationState);
    }, [validationState]);

    useEffect(() => {
      const newSelectedItem = items.find((x) => x[itemSelected]);

      if (
        (!["string", "object"].includes(typeof originalSelectedItem) &&
          ["string", "object"].includes(typeof newSelectedItem)) ||
        (["string", "object"].includes(typeof originalSelectedItem) &&
          !["string", "object"].includes(typeof newSelectedItem)) ||
        (typeof newSelectedItem === "string" &&
          typeof originalSelectedItem === "object") ||
        (typeof newSelectedItem === "object" &&
          typeof originalSelectedItem === "string") ||
        (typeof newSelectedItem === "string" &&
          typeof originalSelectedItem === "string" &&
          newSelectedItem !== originalSelectedItem) ||
        (typeof newSelectedItem === "object" &&
          typeof originalSelectedItem === "object" &&
          (newSelectedItem[itemValue] !== originalSelectedItem[itemValue] ||
            newSelectedItem[itemText] !== originalSelectedItem[itemText]))
      ) {
        setOriginalSelectedItem(newSelectedItem);
        setSelectedItem(newSelectedItem);
      }
    }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

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
        !menuRef.current?.contains(e.relatedTarget) && validate(selectedItem);
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
              menuRef.current
                ?.querySelectorAll("a-select__menu-items__wrapper .a-list-item")
                [selectedIndex]?.focus();
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
                menuRef.current
                  .querySelectorAll(
                    "a-select__menu-items__wrapper .a-list-item"
                  )
                  [selectedIndex]?.focus();
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

    const menuComponentProps = {
      anchorRef: inputBaseSurfaceRef,
      className: "a-select__menu-items",
      closeOnClick: false,
      onClose: () => {
        setIsOpen(false);
        surfaceRef.current.focus();
      },
      open: isOpen,
      role: "listbox",
      style: {
        width: inputBaseSurfaceRef?.current?.clientWidth
          ? inputBaseSurfaceRef.current.clientWidth + 2
          : "auto"
      }
    };

    return (
      <AInputBase
        {...rest}
        ref={ref}
        surfaceRef={inputBaseSurfaceRef}
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
        <div className="a-select__selection-wrapper">
          <div {...selectionProps}>
            {typeof selectedItem === "string"
              ? selectedItem
              : typeof selectedItem === "object"
              ? selectedItem[itemText]
              : placeholder}
          </div>
          <AMenu ref={menuRef} {...menuComponentProps}>
            {prependContent}
            <div className="a-select__menu-items__wrapper">
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
                    setIsOpen(false);
                    surfaceRef.current.focus();
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
                    itemProps.onClick = (e) => {
                      e.stopPropagation();
                    };
                  } else {
                    itemProps.onClick = () => {
                      setIsOpen(false);
                      surfaceRef.current.focus();
                      selectItem(item);
                    };
                  }

                  if (
                    selectedItem &&
                    item[itemValue] === selectedItem[itemValue]
                  ) {
                    itemProps.selected = true;
                    itemProps.className += " a-select__menu-item--selected";
                    itemProps["aria-selected"] = true;
                  }
                }

                const MenuItemComponent = itemTemplate
                  ? itemTemplate
                  : AListItem;
                return (
                  <MenuItemComponent
                    key={`a-select__menu-item_${index}`}
                    {...itemProps}
                    item={item}
                    index={index}
                  />
                );
              })}
            </div>
            {appendContent}
          </AMenu>
        </div>
      </AInputBase>
    );
  }
);

ASelect.propTypes = {
  /**
   * Sets the content to append to the dropdown list.
   */
  appendContent: PropTypes.node,
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
   * Sets a React component to use when rendering menu items. The component will be sent the following props: `item`, `index`, `aria-disabled`, `aria-selected`, `children`, `className`, `onClick`, `role`, `selected`, `value`.
   */
  itemTemplate: PropTypes.elementType,
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
   * Sets the content to prepend to the dropdown list.
   */
  prependContent: PropTypes.node,
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
   * Delays validation until the `blur` event.
   */
  validateOnBlur: PropTypes.bool,
  /**
   * Applies a validation state.
   */
  validationState: PropTypes.oneOf(["default", "warning", "danger"])
};

ASelect.displayName = "ASelect";

export default ASelect;
