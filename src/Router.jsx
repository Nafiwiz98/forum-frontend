import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login.jsx";
import Registerr from "./Components/Registerr/Registerr.jsx";
import Landing from "./Components/Landing/Landing.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import SingleQuestion from "./Pages/SingleQuestion.jsx";
import AskQuestion from "./Pages/AskQuestion/AskQuestion.jsx";


function Router() {

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Landing>
            <Login />
          </Landing>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <Landing>
            <Registerr />
          </Landing>
        } />
        <Route path="/question/:id" element={
          <ProtectedRoute>
            <SingleQuestion />
          </ProtectedRoute>
        } />
        <Route path="/question/askQuestion" element={
          <ProtectedRoute>
            <AskQuestion />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}









export default Router;
