/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import icons from "../icons";
import MegadraftBlock from "./MegadraftBlock";

const Options = ({ onClickUp, onClickDown, id, disableUp, disableDown }) => {
  const onPointerDown = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className="options">
      <button
        data-testid={`swap-up-${id}`}
        className="options__button options__button--up"
        onClick={onClickUp}
        disabled={disableUp}
        onPointerDown={onPointerDown}
      >
        <icons.DropdownArrow />
      </button>
      <button
        data-testid={`swap-down-${id}`}
        className="options__button"
        onClick={onClickDown}
        disabled={disableDown}
        onPointerDown={onPointerDown}
      >
        <icons.DropdownArrow />
      </button>
    </div>
  );
};

const Control = ({
  children,
  id,
  onClickUp,
  onClickDown,
  isFirst,
  isLast,
  isAtomic
}) => (
  <div
    className={`move-control ${isAtomic && "move-control--atomic"}`}
    id={`move-control-${id}`}
  >
    <div className="move-control__target" data-testid={`block-${id}`}>
      {children}
    </div>
    <Options
      {...{ id, onClickUp, onClickDown }}
      disableUp={isFirst}
      disableDown={isLast}
    />
  </div>
);

const Controlled = ({
  keySwapUp,
  keySwapDown,
  isFirstBlock,
  isLastBlock,
  isAtomic,
  swapUp,
  swapDown,
  children
}) => {
  const onClickUp = () => swapUp(keySwapUp);
  const onClickDown = () => swapDown(keySwapDown);
  const isFirst = isFirstBlock(keySwapUp);
  const isLast = isLastBlock(keySwapDown);

  return (
    <MegadraftBlock>
      <Control
        id={
          keySwapUp !== keySwapDown ? `${keySwapUp}-${keySwapDown}` : keySwapUp
        }
        {...{ onClickUp, onClickDown, isFirst, isLast, isAtomic }}
      >
        {children}
      </Control>
    </MegadraftBlock>
  );
};

export default ({
  wrapper,
  swapUp,
  swapDown,
  children,
  isFirstBlock,
  isLastBlock,
  isAtomic
}) => {
  const arrayChildren = React.Children.toArray(children);
  const firstChildKey = arrayChildren[0].props.children.key;
  const lastChildKey =
    arrayChildren[arrayChildren.length - 1].props.children.key;

  const controlledChildren = React.Children.map(children, child => {
    const currentKey = child.props.children.key;
    return (
      <Controlled
        keySwapUp={currentKey}
        keySwapDown={currentKey}
        {...{ swapUp, swapDown, isFirstBlock, isLastBlock, isAtomic }}
      >
        {child}
      </Controlled>
    );
  });

  return wrapper ? (
    <Controlled
      keySwapUp={firstChildKey}
      keySwapDown={lastChildKey}
      {...{ swapUp, swapDown, isFirstBlock, isLastBlock, isAtomic }}
    >
      {React.cloneElement(wrapper, [], children)}
    </Controlled>
  ) : (
    controlledChildren
  );
};
