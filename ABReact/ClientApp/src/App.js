import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import UsersTable from "./components/UsersTable";

import 'react-datepicker/dist/react-datepicker.css';

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={UsersTable} />
      </Layout>
    );
  }
}
