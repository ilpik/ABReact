import React from "react";
import DatePicker from "react-datepicker";

const User = ({ userData, onDateChange, onRemoveUser }) => {
  const { userId, created, lastActivity, isNewUser, isChangedUser } = userData;
  const createdDate = new Date(created);
  const activityDate = new Date(lastActivity);
  return (
    <tr
      style={
        isNewUser
          ? { backgroundColor: "lightgreen" }
          : isChangedUser
          ? { backgroundColor: "orange" }
          : {}
      }
    >
      <td>{userId}</td>
      <td style={{ position: "relative" }}>
        <DatePicker
          dateFormat={"dd.MM.yyyy"}
          selected={createdDate}
          onChange={(date) =>
            onDateChange({ type: "created", date: new Date(date), userData })
          }
        />
      </td>
      <td style={{ position: "relative" }}>
        <DatePicker
          minDate={createdDate}
          dateFormat={"dd.MM.yyyy"}
          selected={activityDate}
          onChange={(date) =>
            onDateChange({
              type: "lastActivity",
              date: new Date(date),
              userData,
            })
          }
        />
      </td>
      <td>
        <i
          uk-icon="icon: trash"
          style={{ fontSize: "16px" }}
          onClick={() => onRemoveUser(userId)}
        ></i>
      </td>
    </tr>
  );
};

export default User;
