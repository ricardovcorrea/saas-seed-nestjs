import React from 'react';
import { Admin, Resource } from 'react-admin';

import AuthProvider from './Providers/AuthProvider';
import Provider from './Providers/DataProvider';
import { SocketProvider } from './Providers/SocketProvider';

import StatisticsReducer from './Reducers/Statistics';

import Layout from './General/Layout';
import Theme from './General/Theme';

import Dashboard from './Pages/Dashboard';
import { CustomerList } from './Resources/Customer';

const App = () => (

  <Admin layout={Layout} dataProvider={Provider()} authProvider={AuthProvider()} theme={Theme} customReducers={{ statistics: StatisticsReducer }}>
    {/* <SocketProvider /> */}
    <Resource name="customer" options={{ label: 'Customers' }} list={CustomerList} />
    {/* <Resource name="customer" options={{ label: 'Customers' }} list={QuestionList} create={QuestionCreate} edit={QuestionEdit} /> */}
  </Admin>

);

export default App;