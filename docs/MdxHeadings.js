import React from "react";

const heading = (Tag) => (props) => {
  if (!props.id) return <Tag {...props} />;
  return (
    <Tag {...props}>
      <a href={`#${props.id}`}>{props.children}</a>
    </Tag>
  );
};

const components = {
  h2: heading("h2")
};

export default components;
