import React from "react";

const user = (props) => {
  return (
    <tr key={props.id}>
      <td>{props.userId}</td>
      <td>
        <input type="datetime" value={props.created} />
      </td>
      <td>
        <input type="datetime" value={props.lastActivity} />
      </td>
    </tr>
  );
};

export default user;
