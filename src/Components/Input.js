import React from "react";

export default function Input(props) {
  return (
    <input
      onChange={props.handleChange}
      placeholder={props.placeholder}
      type={props.type}
    />
  );
}
