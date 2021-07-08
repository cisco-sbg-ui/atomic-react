import PropTypes from "prop-types";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

import {ADropdown, ADropdownMenu, ADropdownMenuItem} from "../ADropdown";
import AInputBase from "../AInputBase";
import AFormContext from "../AForm/AFormContext";
import AIcon from "../AIcon";
import AMenu from "../AMenu";
import {AListItem} from "../AList";
import {useCombinedRefs} from "../../utils/hooks";
import {keyCodes} from "../../utils/helpers";
import "./ACombobox.scss";

let comboboxCounter = 0;

const ACombobox = forwardRef(
  (
    {
      appendContent,
      className: propsClassName,
      clearable,
      disabled,
      hint,
      itemText = "text",
      itemValue = "value",
      items = [],
      label,
      noDataContent,
      onChange,
      onClear,
      onSelected,
      placeholder,
      prependContent,
      readOnly,
      required,
      rules,
      useMenu,
      validateOnBlur,
      validationState,
      value,
      ...rest
    },
    ref
  ) => {
    const comboboxRef = useRef(null);
    const dropdownMenuRef = useRef(null);
    const inputBaseSurfaceRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, comboboxRef);

    const [comboboxId] = useState(comboboxCounter++);
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
      if (isFocused && items.length) setIsOpen(true);
    }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      if (register) {
        register(`a-combobox_${comboboxId}`, {
          reset,
          validate
        });
      }
    }, [validationState, value, rules]); // eslint-disable-line react-hooks/exhaustive-deps

    const validate = (testValue = value) => {
      if (rules || required) {
        let workingRules = [];
        if (rules) {
          workingRules = [...rules];
        }

        if (required) {
          workingRules = [
            {
              test: (v) => !!v || `${label ? label + " is r" : "R"}equired`,
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
      className: "a-combobox__chevron",
      size: 10
    };

    if (!disabled && !readOnly) {
      chevronProps.onClick = () => {
        setIsOpen(!isOpen);
        combinedRef.current.querySelector(".a-combobox__input").focus();
      };
    }

    const inputBaseProps = {
      ...rest,
      ref: combinedRef,
      surfaceRef: inputBaseSurfaceRef,
      className: "a-combobox",
      clearable,
      disabled,
      focused: Boolean(isFocused || isOpen),
      append: <AIcon {...chevronProps}>chevron-down</AIcon>,
      hint: error || hint,
      label,
      labelFor: `a-combobox_${comboboxId}`,
      onClear: () => {
        const e = combinedRef.current.querySelector(".a-combobox__input");
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        ).set;
        nativeInputValueSetter.call(e, "");
        var event = new Event("input", {bubbles: true});
        e.dispatchEvent(event);
        setIsOpen(false);
        reset();
        onClear && onClear(e);
      },
      readOnly,
      validationState: workingValidationState
    };

    if (propsClassName) {
      inputBaseProps.className += ` ${propsClassName}`;
    }

    const inputProps = {
      autoComplete: "off",
      className: "a-combobox__input",
      disabled,
      id: `a-combobox_${comboboxId}`,
      onBlur: (e) => {
        setIsFocused(false);
        !dropdownMenuRef?.current?.contains(e.relatedTarget) && validate(value);
      },
      onChange: (e) => {
        setIsOpen(items.length || noDataContent);
        !validateOnBlur && validate(e.target.value);
        onChange && onChange(e);
      },
      onClick: () => setIsOpen(items.length || noDataContent),
      onFocus: () => {
        setIsFocused(true);
      },
      onKeyDown: (e) => {
        if (e.keyCode === keyCodes.up) {
          e.preventDefault();
          setIsOpen(items.length || noDataContent);
          const menuItems = Array.from(
            dropdownMenuRef?.current?.querySelectorAll(
              useMenu
                ? ".a-combobox__menu-items__wrapper .a-list-item[tabindex]"
                : ".a-combobox__menu-items__wrapper .a-dropdown__item[tabindex]"
            )
          );
          if (menuItems.length) {
            menuItems[menuItems.length - 1].focus();
          }
        } else if (e.keyCode === keyCodes.down) {
          e.preventDefault();
          setIsOpen(items.length || noDataContent);
          const menuItems = Array.from(
            dropdownMenuRef?.current?.querySelectorAll(
              useMenu
                ? ".a-combobox__menu-items__wrapper .a-list-item[tabindex]"
                : ".a-combobox__menu-items__wrapper .a-dropdown__item[tabindex]"
            )
          );
          if (menuItems.length) {
            menuItems[0].focus();
          }
        }
      },
      placeholder,
      readOnly,
      value
    };

    let WrapperComponent = ADropdown;
    let MenuComponent = ADropdownMenu;
    let ListItemComponent = ADropdownMenuItem;

    const menuComponentProps = {
      focusOnOpen: false,
      open: Boolean((items.length || noDataContent) && isOpen),
      onClose: () => setIsOpen(false),
      role: "listbox",
      className: "a-combobox__menu-items",
      style: {width: inputBaseSurfaceRef?.current?.clientWidth + 2 || "auto"}
    };

    if (useMenu) {
      WrapperComponent = "div";
      MenuComponent = AMenu;
      ListItemComponent = AListItem;

      menuComponentProps.anchorRef = inputBaseSurfaceRef;
      menuComponentProps.closeOnClick = false;
    }

    return (
      <AInputBase {...inputBaseProps}>
        <WrapperComponent style={{width: "100%"}}>
          <input {...inputProps} />
          <MenuComponent ref={dropdownMenuRef} {...menuComponentProps}>
            {prependContent}
            <div className="a-combobox__menu-items__wrapper">
              {!items.length && !!noDataContent && (
                <ListItemComponent>{noDataContent}</ListItemComponent>
              )}
              {items.map((item, index) => {
                const itemProps = {
                  value: null,
                  children: null,
                  className: "a-combobox__menu-item",
                  role: "option",
                  "aria-selected": false,
                  onClick: () => {
                    validate(typeof item === "string" ? item : item[itemValue]);
                    setIsOpen(false);
                    onSelected && onSelected(item);
                    setTimeout(() => {
                      combinedRef.current
                        .querySelector(".a-combobox__input")
                        .focus();
                    }, 30);
                  }
                };

                if (typeof item === "string") {
                  itemProps.value = item;
                  itemProps.children = item;
                } else if (typeof item === "object") {
                  itemProps.value = item[itemValue];
                  itemProps.children = item[itemText];
                }

                return (
                  <ListItemComponent
                    key={`a-combobox__menu-item_${index}`}
                    {...itemProps}
                  />
                );
              })}
            </div>
            {appendContent}
          </MenuComponent>
        </WrapperComponent>
      </AInputBase>
    );
  }
);

ACombobox.propTypes = {
  /**
   * Sets the content to append to the dropdown list.
   */
  appendContent: PropTypes.node,
  /**
   * Toggles whether to display a clearable icon.
   */
  clearable: PropTypes.bool,
  /**
   * Toggles the disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * Sets the hint content.
   */
  hint: PropTypes.node,
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
   * Sets the content for when no matches are available.
   */
  noDataContent: PropTypes.node,
  /**
   * Handles the `change` event for when the text input is modified.
   */
  onChange: PropTypes.func,
  /**
   * Handles the `clear` event (for supplemental handling).
   */
  onClear: PropTypes.func,
  /**
   * Handles the `selected` event for when a selection is chosen in the dropdown.
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
   * Toggles the `readOnly` state.
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
   * Toggles using AMenu/ADropdown internally.
   */
  useMenu: PropTypes.bool,
  /**
   * Delays validation until the `blur` event.
   */
  validateOnBlur: PropTypes.bool,
  /**
   * Applies a validation state.
   */
  validationState: PropTypes.oneOf(["default", "warning", "danger"]),
  /**
   * Sets the text input value.
   */
  value: PropTypes.string
};

ACombobox.displayName = "ACombobox";

export default ACombobox;
