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
        {...{ onPointerDown }}
      >
        <icons.DropdownArrow />
      </button>
      <button
        data-testid={`swap-down-${id}`}
        className="options__button"
        onClick={onClickDown}
        disabled={disableDown}
        {...{ onPointerDown }}
      >
        <icons.DropdownArrow />
      </button>
    </div>
  );
};

const Control = ({ children, id, onClickUp, onClickDown, isFirst, isLast }) => (
  <div className="move-control" id={`move-control-${id}`}>
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

export default ({
  wrapper,
  swapUp,
  swapDown,
  children,
  isFirstBlock,
  isLastBlock
}) => {
  const arrayChildren = React.Children.toArray(children),
    firstChildKey = arrayChildren[0].props.children.key,
    lastChildKey = arrayChildren[arrayChildren.length - 1].props.children.key,
    Controlled = ({ keySwapUp, keySwapDown, children }) => {
      const onClickUp = () => swapUp(keySwapUp),
        onClickDown = () => swapDown(keySwapDown),
        isFirst = isFirstBlock(keySwapUp),
        isLast = isLastBlock(keySwapDown);

      return (
        <MegadraftBlock>
          <Control
            id={
              keySwapUp !== keySwapDown
                ? `${keySwapUp}-${keySwapDown}`
                : keySwapUp
            }
            {...{ onClickUp, onClickDown, isFirst, isLast }}
          >
            {children}
          </Control>
        </MegadraftBlock>
      );
    };

  const controlledChildren = React.Children.map(children, child => {
    const currentKey = child.props.children.key;
    return (
      <Controlled keySwapUp={currentKey} keySwapDown={currentKey}>
        {child}
      </Controlled>
    );
  });

  return wrapper ? (
    <Controlled keySwapUp={firstChildKey} keySwapDown={lastChildKey}>
      {React.cloneElement(wrapper, [], children)}
    </Controlled>
  ) : (
    controlledChildren
  );
};
