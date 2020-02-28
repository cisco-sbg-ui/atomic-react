import React from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);

    const {value} = props;

    this.state = {value};
  }

  componentDidUpdate(prevProps) {
    const {value} = this.props;

    if (prevProps.value !== value) {
      this.setState({value});
    }
  }

  render() {
    const {
        id,
        name,
        field,
        items,
        onChange,
        disabled,
        defaultValue,
        iconsOnly
      } = this.props,
      dataField = name || field,
      {value} = this.state,
      buttons = items.map(
        ({
          id: _id,
          label,
          value: _value,
          disabled: _disabled,
          htmlFor,
          onClick
        }) => {
          const buttonId = _id || `${id}-${_value}`;
          let buttonClassName = "btn btn--primary";

          if (disabled || _disabled) {
            buttonClassName += " disabled";
          }

          if (
            value === _value ||
            (value === undefined && _value === defaultValue)
          ) {
            buttonClassName += " btn--state-selected";
          }

          return (
            <button
              key={buttonId}
              id={buttonId}
              type="button"
              className={buttonClassName}
              htmlFor={htmlFor}
              onClick={e => {
                e.stopPropagation();

                if (onClick) {
                  onClick();
                }

                this.setState({value: _value}, () => {
                  if (onChange) {
                    onChange(dataField, _value);
                  }
                });
              }}>
              {label}
            </button>
          );
        }
      );

    let groupClassName = "btn-group btn-group-toggle";
    if (iconsOnly) {
      groupClassName += " btn-group--type-iconic";
    }

    return (
      <span>
        <div id={id} className={groupClassName}>
          {buttons}
        </div>
      </span>
    );
  }
}
