
import Login from './View/Login/Login';
import Signup from "./View/Signup/Signup";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'

function App() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path='/'  element={<Login />}/>
          <Route path='/Signup'  element={<Signup />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
