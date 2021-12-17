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
        <DatePicker
          minDate={createdDate}
          dateFormat={'dd.MM.yyyy'}
          selected={activityDate}
          onChange={(date) => onInputValuesChange('lastActivity', date, userId)}
        />
      </td>
    </tr>
  );
};

export default user;
