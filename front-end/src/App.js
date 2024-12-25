import './App.css';
import Chat from './component/chat';
import Register from './component/signup';
import Login from './component/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Chat" element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
