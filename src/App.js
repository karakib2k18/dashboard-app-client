import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./AllPages/Shared/Navbar/Navbar";
import SignUp from "./AllPages/Shared/LoginSignUp/SignUp/SignUp";
import Login from "./AllPages/Shared/LoginSignUp/Login/Login";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import PrivateRoute from "./AllPages/Shared/PrivateRoute/PrivateRoute";
import Dashboard from "./AllPages/Dashboard/Dashboard/Dashboard";
import HomePage from "./AllPages/HomePage/HomePage";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
            <Navbar />
            <Switch>
              <PrivateRoute exact path="/">
                <HomePage />
              </PrivateRoute>
              <PrivateRoute path="/dashboard">
                <HomePage />
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
            </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;


//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