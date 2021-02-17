import PropTypes from "prop-types";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

import {ADotLoader} from "../ALoader";
import {ADropdown, ADropdownMenu, ADropdownMenuItem} from "../ADropdown";
import AInputBase from "../AInputBase";
import AFormContext from "../AForm/AFormContext";
import AIcon from "../AIcon";
import AMenu from "../AMenu";
import {AListItem} from "../AList";
import {useCombinedRefs} from "../../utils/hooks";
import {keyCodes} from "../../utils/helpers";
import "./AAutocomplete.scss";

let autocompleteCounter = 0;

const AAutocomplete = forwardRef(
  (
    {
      className: propsClassName,
      clearable,
      disabled,
      hint,
      itemText = "text",
      itemValue = "value",
      items,
      label,
      loading,
      noDataContent,
      onChange,
      onClear,
      onSelected,
      placeholder,
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
    const autocompleteRef = useRef(null);
    const dropdownMenuRef = useRef(null);
    const inputBaseSurfaceRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, autocompleteRef);

    const [autocompleteId] = useState(autocompleteCounter++);
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
        register(`a-autocomplete_${autocompleteId}`, {
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

    const inputBaseProps = {
      ...rest,
      ref: combinedRef,
      surfaceRef: inputBaseSurfaceRef,
      className: "a-autocomplete",
      clearable,
      disabled,
      focused: Boolean(isFocused || isOpen),
      prepend: loading ? (
        <ADotLoader className="a-autocomplete__dot-loader" />
      ) : (
        <AIcon className="a-autocomplete__prepend-icon" size={16}>
          search
        </AIcon>
      ),
      hint: error || hint,
      label,
      labelFor: `a-autocomplete_${autocompleteId}`,
      onClear: () => {
        const e = combinedRef.current.querySelector(".a-autocomplete__input");
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

    if (loading) {
      inputBaseProps.className += " a-autocomplete--loading";
    }

    if (propsClassName) {
      inputBaseProps.className += ` ${propsClassName}`;
    }

    const inputProps = {
      autoComplete: "off",
      className: "a-autocomplete__input",
      disabled,
      id: `a-autocomplete_${autocompleteId}`,
      onBlur: (e) => {
        setIsFocused(false);
        !dropdownMenuRef?.current?.contains(e.relatedTarget) && validate(value);
      },
      onChange: (e) => {
        setIsOpen(true);
        !validateOnBlur && validate(e.target.value);
        onChange && onChange(e);
      },
      onFocus: () => {
        setIsFocused(true);
      },
      onKeyDown: (e) => {
        if (e.keyCode === keyCodes.up) {
          e.preventDefault();
          setIsOpen(true);
          const menuItems = Array.from(
            dropdownMenuRef?.current?.querySelectorAll(
              useMenu ? ".a-list-item[tabindex]" : ".a-dropdown__item[tabindex]"
            )
          );
          if (menuItems.length) {
            menuItems[menuItems.length - 1].focus();
          }
        } else if (e.keyCode === keyCodes.down) {
          e.preventDefault();
          setIsOpen(true);
          const menuItems = Array.from(
            dropdownMenuRef?.current?.querySelectorAll(
              useMenu ? ".a-list-item[tabindex]" : ".a-dropdown__item[tabindex]"
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
      open: Boolean(
        items && (items.length || (!items.length && noDataContent)) && isOpen
      ),
      onClose: () => setIsOpen(false),
      role: "listbox",
      className: "a-autocomplete__menu-items",
      style: {width: inputBaseSurfaceRef?.current?.clientWidth + 2 || "auto"}
    };

    if (useMenu) {
      WrapperComponent = "div";
      MenuComponent = AMenu;
      ListItemComponent = AListItem;

      menuComponentProps.anchorRef = inputBaseSurfaceRef;
    }

    return (
      <AInputBase {...inputBaseProps}>
        <WrapperComponent style={{width: "100%"}}>
          <input {...inputProps} />
          <MenuComponent ref={dropdownMenuRef} {...menuComponentProps}>
            {items && !items.length && !!noDataContent && (
              <ListItemComponent>{noDataContent}</ListItemComponent>
            )}
            {items &&
              items.map((item, index) => {
                const itemProps = {
                  value: null,
                  children: null,
                  className: "a-autocomplete__menu-item",
                  role: "option",
                  "aria-selected": false,
                  onClick: () => {
                    validate(typeof item === "string" ? item : item[itemValue]);
                    onSelected && onSelected(item);
                    setTimeout(() => {
                      combinedRef.current
                        .querySelector(".a-autocomplete__input")
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
                    key={`a-autocomplete__menu-item_${index}`}
                    {...itemProps}
                  />
                );
              })}
          </MenuComponent>
        </WrapperComponent>
      </AInputBase>
    );
  }
);

AAutocomplete.propTypes = {
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
   * Toggles the `loading` state.
   */
  loading: PropTypes.bool,
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

AAutocomplete.displayName = "AAutocomplete";

export default AAutocomplete;
