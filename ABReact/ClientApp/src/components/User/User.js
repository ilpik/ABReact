import React from "react";
import DatePicker from "react-datepicker";

const user = ({ userData, onInputValuesChange }) => {
  const { userId, created, lastActivity, isAddedUser, isChangedUser } =
    userData;
  const createdDate = new Date(created);
  const activityDate = new Date(lastActivity);
  return (
    <tr
      style={
        isAddedUser
          ? { backgroundColor: "lightgreen" }
          : isChangedUser
          ? { backgroundColor: "orange" }
          : {}
      }
    >
      <td>{userId}</td>
      <td>
        <DatePicker
          dateFormat={"dd.MM.yyyy"}
          selected={createdDate}
          onChange={(date) =>
            onInputValuesChange({
              type: "created",
              date: new Date(date),
              userData,
            })
          }
        />
      </td>
      <td>
        <DatePicker
          minDate={createdDate}
          dateFormat={"dd.MM.yyyy"}
          selected={activityDate}
          onChange={(date) =>
            onInputValuesChange({
              type: "lastActivity",
              date: new Date(date),
              userData,
            })
          }
        />
      </td>
    </tr>
  );
};

export default user;
