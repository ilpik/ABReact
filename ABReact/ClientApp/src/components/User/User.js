import React from 'react';
import DatePicker from 'react-datepicker';

const user = ({ userId, created, lastActivity, onInputValuesChange }) => {
  const createdDate = new Date(created);
  const activityDate = new Date(lastActivity);
  return (
    <tr>
      <td>{userId}</td>
      <td>
        <DatePicker
          dateFormat={'dd.MM.yyyy'}
          selected={createdDate}
          onChange={(date) => onInputValuesChange('created', date, userId)}
        />
      </td>
      <td>
        <input
          type="datetime"
          value={props.lastActivity}
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
