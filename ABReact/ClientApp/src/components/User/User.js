import React from "react";

const user = (props) => {
  return (
    <tr>
      <td>{props.userId}</td>
      <td>
        <input
          type="datetime"
          value={props.created}
          onChange={() => console.log("Добавить 1")}
        />
      </td>
      <td>
        <input
          type="datetime"
          value={props.lastActivity}
          onChange={() => console.log("Добавить 2")}
        />
      </td>
    </tr>
  );
};

export default user;
