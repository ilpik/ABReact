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
      <td>
        <div style={{ position: "relative" }}>
          <DatePicker
            style={{ zIndex: 1000000 }}
            dateFormat={"dd.MM.yyyy"}
            selected={createdDate}
            popperPlacement="top-end"
            onChange={(date) =>
              onDateChange({ type: "created", date: new Date(date), userData })
            }
          />
        </div>
      </td>
      <td style={{ position: "relative" }}>
        <DatePicker
          minDate={createdDate}
          dateFormat={"dd.MM.yyyy"}
          selected={activityDate}
          popperPlacement="top-end"
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
        {!userData.isNewUser && (
          <i
            uk-icon="icon: trash"
            style={{ fontSize: "16px" }}
            onClick={() => onRemoveUser(userId)}
          ></i>
        )}
      </td>
    </tr>
  );
};

export default User;
