import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>

    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/sign-up" element={<Signup />}/>
      <Route path="/sign-in" element={<Signin />}/>
      <Route path="/dashboard" element={<Dashboard />}/>

    </Routes>
    </BrowserRouter>
  );
};

export default App;
