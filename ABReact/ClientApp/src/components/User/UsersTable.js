import axios from 'axios';
import React, { useEffect, useState } from 'react';
import User from './User';
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

  const onDateChange = ({ type, date, userData }) => {
    if (userData.isNewUser) {
      const newNewUsersArr = newUsers.map((item) => {
        if (item.userId === userData.userId) {
          return { ...userData, [type]: date };
        }
        return item;
      });
      setNewUsers(newNewUsersArr);
    } else if (userData.isChangedUser) {
      const newChangedUsersDataArr = changedUsersData.map((item) => {
        if (item.userId === userData.userId) {
          return { ...userData, [type]: date };
        }
        return item;
      });
      setChangedUsersData(newChangedUsersDataArr);
      setUsers(
        users.map((item) => {
          if (item.userId === userData.userId) {
            return { ...userData, [type]: date };
          }
          return item;
        })
      );
    } else {
      const newArr = [...changedUsersData, { ...userData, [type]: date, isChangedUser: true }];
      setChangedUsersData(newArr);
      setUsers(
        users.map((item) => {
          if (item.userId === userData.userId) {
            return { ...userData, isChangedUser: true, [type]: date };
          }
          return item;
        })
      );
    }
  };

  const handleAddUser = () => {
    setNewUsers([
      ...newUsers,
      {
        userId: [...users, ...newUsers].length + 1,
        created: new Date(),
        lastActivity: new Date(),
        isNewUser: true,
      },
    ]);
  };

  const handleSave = () => {
    const payload = [...changedUsersData.map(({isChangedUser, ...rest}) => rest), ...newUsers.map(({isNewUser, ...rest}) => ({...rest, userId: 0}))];
    console.log(payload);
    axios.post('/user', payload).then((res) => {
      setUsers(res.data);
      setNewUsers([]);
      setChangedUsersData([])
    });
  };

  const handleCalculate = () => {
    if (users.length > 0) {
      setHistogramData([...histogramData, ...users.map((item) => [item.userId, item.lifeSpan])]);
    }
  };

  const renderArr = [...users, ...newUsers];
  
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
        <button type='button' className='btn btn-primary col-3' onClick={handleAddUser}>
          Add user
        </button>
        <button type='button' className='btn btn-primary col-3' onClick={handleCalculate}>
          Calculate
        </button>
        <button type='button' className='btn btn-primary col-3' onClick={handleSave}>
          Save
        </button>
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
              {renderArr.length > 0 &&
                renderArr.map((user, index) => <User key={user.userId} userData={user} onDateChange={onDateChange} />)}
            </tbody>
          </table>
        </div>
        <div>
          <b>Rolling Retention 7 day:</b> {rollingRetention}
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
