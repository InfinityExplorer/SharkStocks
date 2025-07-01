import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import './App.css';
import Navbar from './Components/NavBar/Navbar';
import { Outlet } from 'react-router';
const App: React.FC = () => {
  return (
   <>
      <Navbar/>
      <Outlet/>
   </>
  );
};
export default App;

