import React from "react";

export default ({ wrapper, children }) => (
  <div className="megadraft-block">
    {wrapper ? React.cloneElement(wrapper, [], children) : children}
  </div>
);
