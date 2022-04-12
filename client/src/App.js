import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import UploadVid from './components/UploadVid';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/upload" element={<UploadVid/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
