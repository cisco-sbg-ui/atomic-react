import PropTypes from 'prop-types';
import React from "react";
import { handleMultipleRefs } from '../../utils/helpers';
import { useIntersectionObserver } from '../../utils/hooks';

const defaultProps = {
    onChange: () => {},
    triggerOnce: false,
    children: <></>,
}

/**
 * Keeps track of a child component's visibility
 * in the screen. The child component _must_ accept
 * a forward ref.
 */
const AInView = (props = defaultProps) => {
    const {onChange,triggerOnce,children} = props;
    const ref = useIntersectionObserver(onChange, {
        triggerOnce,
    });
    return React.cloneElement(children, {
      ref: handleMultipleRefs(ref, children.ref),
    });
};

AInView.propTypes = {
    /**
     * Function to be called when the component
     * switches from entering and exiting the
     * view
     */
    onChange: PropTypes.func,
    /**
     * Determines if the `onChange` handler should
     * only be called on the first initial instance
     * of the component being in the view
     */
    triggerOnce: PropTypes.bool,
};

export default AInView;
