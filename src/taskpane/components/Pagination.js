import React from "react";
import { flexRow, hidden, linkActiveStyle, linkStyle } from "./styles";

function Pagination({ activeIndex, nextHandler, prevHandler, directHandler }) {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div
      style={{
        margin: "10px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ul style={flexRow}>
        <li style={activeIndex !== 0 ? linkStyle : hidden} onClick={prevHandler}>
          prev
        </li>
        {arr.map((item, index) => (
          <li
            key={index}
            style={activeIndex === index ? linkActiveStyle : linkStyle}
            onClick={() => directHandler(index)}
          >
            {index + 1}
          </li>
        ))}
        <li style={activeIndex !== 9 ? linkStyle : hidden} onClick={nextHandler}>
          next
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
