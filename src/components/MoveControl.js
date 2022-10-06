/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import classNames from "classnames";
import icons from "icons";
import MegadraftBlock from "./MegadraftBlock";

import { BLOCK_SWAP_UP, BLOCK_SWAP_DOWN } from "constants";

const Options = ({
  onClickUp,
  onClickDown,
  id,
  disableUp,
  disableDown,
  onAction
}) => {
  const onPointerDown = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className="options">
      <div
        data-testid={`swap-up-${id}`}
        className={
          disableUp
            ? "options__button options__button--up options__button--disabled"
            : "options__button options__button--up"
        }
        onClick={() => {
          onAction({ type: BLOCK_SWAP_UP, blockId: id });
          onClickUp();
        }}
        onPointerDown={onPointerDown}
      >
        <icons.DropdownArrow />
      </div>
      <div
        data-testid={`swap-down-${id}`}
        className={
          disableDown
            ? "options__button options__button--disabled"
            : "options__button"
        }
        onClick={() => {
          onAction({ type: BLOCK_SWAP_DOWN, blockId: id });
          onClickDown();
        }}
        onPointerDown={onPointerDown}
      >
        <icons.DropdownArrow />
      </div>
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
  onAction,
  isAtomic
}) => (
  <div
    className={classNames("move-control", isAtomic && "move-control--atomic")}
    id={`move-control-${id}`}
  >
    <div className="move-control__target" data-testid={`block-${id}`}>
      {children}
    </div>
    <Options
      {...{ id, onClickUp, onClickDown, onAction }}
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
  onAction,
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
        {...{ onClickUp, onClickDown, isFirst, isLast, onAction, isAtomic }}
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
  onAction,
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
        {...{ swapUp, swapDown, isFirstBlock, isLastBlock, onAction, isAtomic }}
      >
        {child}
      </Controlled>
    );
  });

  return wrapper ? (
    <Controlled
      keySwapUp={firstChildKey}
      keySwapDown={lastChildKey}
      {...{ swapUp, swapDown, isFirstBlock, isLastBlock, onAction }}
    >
      {React.cloneElement(wrapper, [], children)}
    </Controlled>
  ) : (
    controlledChildren
  );
};
