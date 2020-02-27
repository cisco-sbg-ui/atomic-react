import PropTypes from "prop-types";
import React from "react";

class AccordionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: props.collapsed === undefined ? true : props.collapsed
    };
  }

  handleClick() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleKeyPress(e) {
    if (event.key === "Enter") {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }
  }

  render() {
    const {id, children, className: propsClassName, style} = this.props;

    let className = "accordion__card";

    if (this.state.collapsed) {
      className += " accordion__card--state-collapsed";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let stateToProps = {collapsed: this.state.collapsed};
    let elements = React.Children.toArray(children).map(x =>
      React.cloneElement(x, stateToProps)
    );

    return (
      <div
        key={id}
        className={className}
        id={id}
        style={style}
        aria-expanded={this.state.collapsed ? "false" : "true"}
        onClick={() => this.handleClick()}
        onKeyPress={e => this.handleKeyPress(e)}>
        {elements}
      </div>
    );
  }
}

AccordionCard.propTypes = {
  collapsed: PropTypes.bool
};

export default AccordionCard;
