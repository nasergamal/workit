import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Verify from './components/Verify';
import Profile from './components/Profile';
import PrivateRoute from './utils/PrivateRoute';
import Experience from './components/profileComponents/Experience';
import Education from './components/profileComponents/Education';
import UserProfile from './components/profileComponents/UserProfile';

function App() {

  return (
    <div> 
        <Router>
        <Header/>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/verify/:id' element={<Verify/>}/>
                <Route path='/profile' element={<PrivateRoute><Profile/> </PrivateRoute>}/>
                <Route path='/experience' element={<PrivateRoute><Experience/> </PrivateRoute>}/>
                <Route path='/education' element={<PrivateRoute><Education/> </PrivateRoute>}/>
                <Route path='/userProfile' element={<PrivateRoute><UserProfile/> </PrivateRoute>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
