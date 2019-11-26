import React from "react";

import "components/Button.scss";
const classNames = require('classnames');

export default function Button(props) {
  let buttonClass = classNames({
   'button': true,
   'button--danger': props.danger,
   'button--confirm': props.confirm
 });
   return <button disabled={props.disabled} onClick={props.onClick} className={buttonClass}>{props.children}</button>;
}
