/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';  

import icons from "../../src/icons";
import Dropdown from "../../src/components/Dropdown";
import DropdownItem from "../../src/components/DropdownItem";

describe("Dropdown Component", () => {
  let testContext;

  beforeEach(() => {
    const dropdownItems = [
      { key: "pagode", icon: icons.MediaMediumIcon, label: "Pagode" },
      { key: "metal", icon: icons.MediaBigIcon, label: "Metal" },
      { key: "samba", icon: icons.MediaSmallIcon, label: "Samba" }
    ];

    testContext = {};
    testContext.selected = "metal";
    testContext.onChange = jest.fn();
    render(
      <Dropdown
        items={dropdownItems}
        selected={testContext.selected}
        onChange={testContext.onChange}
      />
    );
  });

  it("renders without problems", () => {
    expect(screen.getByText("Metal")).toBeInTheDocument();
  });

  it("renders dropdown items", () => {
    const items = screen.getAllByRole('menuitem');  
    expect(items).toHaveLength(3);  
  });

  it("renders default selected dropdown item", () => {
    const selected = screen.getByText("Metal");
    expect(selected).toBeInTheDocument();
  });

  it("is possible to click on the dropdown item", () => {
    const item = screen.getByText("Metal");
    fireEvent.click(item);
    expect(testContext.onChange).toHaveBeenCalled();
  });

  it("toggles dropdown on click", () => {
    const wrapper = screen.getByText("Metal"); 
    fireEvent.click(wrapper);
    expect(wrapper.closest("div")).toHaveClass("dropdown__wrapper--open");

    fireEvent.click(wrapper);
    expect(wrapper.closest("div")).not.toHaveClass("dropdown__wrapper--open");
  });
});

