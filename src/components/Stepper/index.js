import React from "react";
import classNames from "classnames";
import "./styles.css";
import { BsCheckLg } from 'react-icons/bs'

const Steps = ({ current, children }) => {
  return (
    <div className="__auth-stepper-wrapper">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, { step: index, current })
      )}
    </div>
  );
};

const Item = ({ title, step, current, onClick }) => {
  return (
    <div
      className={classNames("__auth-stepper-item", {
        completed: current > step,
        active: current === step,
      })}
      onClick={onClick}
    >
      <div className={classNames("__auth-step-counter", {
        completed: current > step,
        active: current === step,
      })}>{current > step ? <BsCheckLg className="icon_counter" size={15} /> : step + 1}</div>
      <div className="__auth-step-name">{title}</div>
    </div>
  );
};

Item.displayName = "Item";
Steps.Item = Item;

export default Steps;
