import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Route , Routes} from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <ToastContainer></ToastContainer>
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
     </Router>
    </div>
    </>
  );
}

export default App;
