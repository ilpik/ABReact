﻿import axios from 'axios';
import React, { useEffect, useState } from 'react';
import User from './User';
import Chart from 'react-google-charts';
const histogramHeadings = ['userId', 'lifeSpan']
const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [histogramData, setHistogramData] = useState([histogramHeadings]);
  const [rollingRetention, setRollingRetention] = useState(null);
  const [newUsers, setNewUsers] = useState([]);
  const [changedUsersData, setChangedUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers();
    getCalculations();
  }, []);
  const getUsers = () => {
    axios.get('/user').then((res) => {
      setIsLoading(false);
      setUsers(res.data);
    });
  };

  const getCalculations = () => {
    axios.get('/calculation').then((res) => {
      setRollingRetention(res.data);
    });
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
        userId:
          newUsers.length === 0
            ? 1
            : Math.max.apply(
                Math,
                [...users, ...newUsers].map(function (o) {
                  return o.userId;
                })
              ) + 1,
        created: new Date(),
        lastActivity: new Date(),
        isNewUser: true,
      },
    ]);
  };

  const handleSave = () => {
    const payload = [
      ...changedUsersData.map(({ isChangedUser, ...rest }) => rest),
      ...newUsers.map(({ isNewUser, ...rest }) => ({ ...rest, userId: 0 })),
    ];
    axios.post('/user', payload).then((res) => {
      setNewUsers([]);
      setUsers(res.data);
      setChangedUsersData([]);
    });
  };

  const onRemoveUser = (id) => {
    axios.delete('/user?id=' + id).then((res) => {
      const changedUserIds = changedUsersData?.reduce((acc, i) => {
        acc[i.userId] = i;
        return acc;
      }, {});
      const newArr =
        res.data.length > 0
          ? res.data?.map((item) => (changedUserIds[item.userId] ? changedUserIds[item.userId] : item))
          : [];
      setUsers(newArr);
    });
  };

  const handleCalculate = () => {
      setHistogramData([histogramHeadings, ...users.map((item) => [item.userId, item.lifeSpan])]);
  };

  const renderArr = [...users, ...newUsers];
  return (
    <div>
      <button type='button' className='uk-button uk-button-primary button' onClick={handleAddUser}>
        Add user
      </button>
      <button type='button' className='uk-button uk-button-primary button' onClick={handleCalculate}>
        Calculate
      </button>
      <button type='button' className='uk-button uk-button-primary button' onClick={handleSave}>
        Save
      </button>
      <div>
        <table
          className='uk-table uk-table-divider uk-table-hover table-custom uk-table-middle'
          aria-labelledby='tabelLabel'
        >
          <thead>
            <tr>
              <th>UserID</th>
              <th>Date Registration</th>
              <th>Date Last Activity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4}>Loading table data...</td>
              </tr>
            ) : (
              <>
                {renderArr?.length > 0 ? (
                  renderArr.map((user, index) => (
                    <User
                      key={'user-' + user.userId}
                      userData={user}
                      onDateChange={onDateChange}
                      onRemoveUser={onRemoveUser}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>Users data is empty...</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className='uk-margin-medium-bottom'>
        <b>Rolling Retention 7 day:</b> {rollingRetention ? `${rollingRetention}%` : 'Press calculate to get data'}
      </div>
      <div>
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
    </div>
  );
};

export default UsersTable;
