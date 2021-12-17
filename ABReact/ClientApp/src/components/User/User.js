import React from "react";

const user = (props) => {
  return (
    <tr>
      <td>{props.userId}</td>
      <td>
        <input
          type="datetime"
          value={new Date(props.created)}
          onChange={() => console.log("Добавить 1")}
        />
      </td>
      <td>
        <input
          type="datetime"
          value={new Date(props.lastActivity)}
          onChange={() => console.log("Добавить 2")}
        />
      </td>
      <td>
        <input type="text" value={props.lifeSpan} />
      </td>
    </tr>
  );
};

export default user;
