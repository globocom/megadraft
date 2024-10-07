/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import DropdownItem from "./DropdownItem";
import icons from "../icons";

const Dropdown = ({ items = [], selected, onChange }) => {
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const isEmpty = items.length === 0;
  const selectedItem = items.filter(item => item.key === selected)[0];

  console.log("wip");

  const toggleDropdown = () => setIsOpen(isOpen => !isOpen);

  const handleDocumentClick = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const preventSelection = event => {
    window.getSelection().empty();
    event.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick, false);

    return () =>
      document.removeEventListener("click", handleDocumentClick, false);
  }, []);

  if (isEmpty) {
    return null;
  }

  const wrapperClassName = classNames("dropdown__wrapper", {
    "dropdown__wrapper--open": isOpen
  });

  const dropdownClassName = classNames("dropdown", {
    "dropdown--open": isOpen
  });

  const arrowClassName = classNames("dropdown__arrow", {
    "dropdown__arrow--open": isOpen
  });

  return (
    <div ref={wrapperRef} className={wrapperClassName} onClick={toggleDropdown}>
      <DropdownItem
        item={selectedItem}
        className="dropdown__item--selected"
        onMouseDown={preventSelection}
      >
        <icons.DropdownArrow className={arrowClassName} />
      </DropdownItem>

      <ul className={dropdownClassName}>
        {items.map(item => (
          <li key={item.key}>
            <DropdownItem
              item={item}
              className="dropdown__option"
              onClick={() => onChange(item.key)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.func.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Dropdown;
