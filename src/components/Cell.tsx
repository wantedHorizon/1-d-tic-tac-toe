import React from "react";
import "./Cell.css";
interface Props {
  sine?: string;
  click: any;
}
export default function Cell({ sine, click }: Props) {
  return (
    <div
      onClick={click}
      className="cell"
      style={{ color: sine === "X" ? "blue" : "red" }}
    >
      {sine}
    </div>
  );
}
