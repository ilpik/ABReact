import axios from 'axios';
import React, { useEffect, useState } from 'react';
import User from './User/User';
import Chart from 'react-google-charts';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [histogramData, setHistogramData] = useState([['userId', 'lifeSpan']]);
  const [rollingRetention, setRollingRetention] = useState(null);
  const [newUsers, setNewUsers] = useState([]);
  const [changedUsersData, setChangedUsersData] = useState([]);
  const loading = users.length === 0;

  useEffect(() => {
    getUsers();
    getCalculations();
  }, []);

  const getUsers = () => {
    axios.get('/user').then((res) => setUsers(res.data));
  };

  const getCalculations = () => {
    axios.get('/calculation').then((res) => setRollingRetention(res.data));
  };
  const changeDataInObj = (obj, arr, type, date) => {
    const selectedUserIndex = arr.findIndex((item) => item.userId === obj.userId);
    const editedUsersArr = arr.map((item, index) => {
      if (index === selectedUserIndex) {
        return ({...item, [type]: date, isChangedUser: true, });
      } 
      return item
    });
    return editedUsersArr;
  }
  const onInputValuesChange = ({ type, date, userData }) => {
    const newUsersArr = changeDataInObj(userData, users, type, date)
    const newNewUsersArr = changeDataInObj(userData, newUsers, type, date)
    setUsers(newUsersArr);
    setNewUsers(newNewUsersArr)
    const userIndexInChangedArr = changedUsersData.findIndex(item => item.userId === userData.userId);
    const newChangedUsersDataArr = userIndexInChangedArr === -1 ? [...changedUsersData, userData] 
    : changedUsersData.map((item, index) => {
      if (index === userIndexInChangedArr) {
        return ({...userData, [type]: date})
      }
      return item
    } )
    setChangedUsersData(newChangedUsersDataArr);
  };

  const handleAddUser = () => {
    const createdUserDate = new Date();
    setNewUsers([
      ...newUsers,
      {
        userId: users[users.length - 1].userId + 1,
        created: createdUserDate,
        lastActivity: createdUserDate,
        isAddedUser: true,
      },
    ]);
  };

  const handleSave = () => {
    axios.post('/user', [...changedUsersData, ...newUsers]).then((res) => {
      setUsers(res.data)
      setNewUsers([]);
    });
  };

  const handleCalculate = () => {
    if (users.length > 0) {
      setHistogramData([...histogramData, ...users.map((item) => [item.userId, item.lifeSpan])]);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 id='tabelLabel'>Users</h1>
        <p>This component demonstrates fetching data from the server.</p>
        <p>
          <em>Loading...</em>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={handleAddUser}>Add user</button>
        <button onClick={handleCalculate}>Calculate</button>
        <button onClick={handleSave}>Save</button>
        <div>Rolling Retention 7 day: {rollingRetention}</div>
        <div>
          <table className='table table-striped' aria-labelledby='tabelLabel'>
            <thead>
              <tr>
                <th>UserID</th>
                <th>Date Registration</th>
                <th>Date Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                [...users, ...newUsers].map((user) => (
                  <User key={user.userId} userData={user} onInputValuesChange={onInputValuesChange} />
                ))}
            </tbody>
          </table>
        </div>
        <Chart
          width={'100%'}
          height={'400px'}
          chartType='Histogram'
          loader={<div>Loading Chart</div>}
          data={histogramData}
          options={{
            title: 'Гистограмма распределения длительностей жизней пользователей ',
            legend: { position: 'none' },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    );
  }
};

export default UsersTable;
