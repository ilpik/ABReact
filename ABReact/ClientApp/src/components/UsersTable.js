import axios from 'axios';
import React, { useEffect, useState } from 'react';
import User from './User/User';
import Chart from 'react-google-charts';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [histogramData, setHistogramData] = useState(['users amount', 'lifespan'])
  const loading = users.length === 0;

  useEffect(() => {
    getUsers();
    getCalculations();
  }, []);

  const getCalculations = () => {
    axios.get('/calculation').then((res) => console.log(res));
  };
  useEffect(() => {
    
  }, [])
  const onInputValuesChange = (type, date, userId) => {
    const selectedUserIndex = users.findIndex((item) => item.userId === userId);
    const newUserObj = { ...users[selectedUserIndex], [type]: date };
    const newUsers = [...users.slice().splice(selectedUserIndex, 1, newUserObj)];
    setUsers(newUsers);
    // setState({ users: event.target.value });
  };
  const getUsers = () => {
    axios.get('/user').then((res) => setUsers(res.data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправлена форма.');
  };
  const handleAddUser = () => {
    setUsers([...users, { id: users[users.length - 1].userId + 1, created: new Date(), lastActivity: new Date() }]);
  };
  const handleSave = () => {
    axios.post('/user', users).then((res) => console.log(res));
  };
  const getHistogramData = () => 
 
  console.log(histogramData);
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
        <form onSubmit={handleSubmit}>
          <div onClick={handleSave}>Save</div>
          <table className='table table-striped' aria-labelledby='tabelLabel'>
            <thead>
              <tr>
                <th>UserID</th>
                <th>Date Registration</th>
                <th>Date Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <User
                  key={user.userId}
                  onInputValuesChange={onInputValuesChange}
                  userId={user.userId}
                  created={user.created}
                  lastActivity={user.lastActivity}
                />
              ))}
            </tbody>
          </table>
        </form>
        <Chart
          width={'500px'}
          height={'300px'}
          chartType='Histogram'
          loader={<div>Loading Chart</div>}
          data={histogramData}
          options={{
            title: 'Lengths of dinosaurs, in meters',
            legend: { position: 'none' },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    );
  }
};

export default UsersTable;
