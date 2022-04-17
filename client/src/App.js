import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import UploadVid from './components/UploadVid';
import Tags from './components/Tags';
import SearchResults from './components/SearchResults';
import VideoPlayer from './components/VideoPlayer';
import EditVideo from './components/EditVideo';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/upload" element={<UploadVid/>}/>
        <Route path="/tags/:id" element={<Tags/>}/>
        <Route path="/results/:item" element={<SearchResults/>}/>
        <Route path="video/:id" element={<VideoPlayer/>}/>
        <Route path="/edit/:id" element={<EditVideo/>}/>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
