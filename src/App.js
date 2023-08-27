import './App.css';
import SlotState from './context/slots/SlotState';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Hero';
import Slots from './components/Slots';


function App() {
  return (
    <div className="App">
      <SlotState>
      <BrowserRouter> 
      <Navbar/>
      <div className='container'>
        <Routes>
          <Route exact path="/" element={<Home/>}>
          </Route>
          <Route exact path="/login" element={<Login/>}>
          </Route>
          <Route exact path="/signup" element={<Signup/>}>
          </Route>
          <Route exact path="/sort" element={<Slots/>}>
          </Route>
        </Routes>
        </div>  
      </BrowserRouter>
    </SlotState>
    
    </div>
  );
}

export default App;
