import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Verify from './components/Verify';
import Profile from './components/Profile';
import User from './components/User';
import SearchResults from './components/SearchResults';
import PrivateRoute from './utils/PrivateRoute';
import Company from './components/Company';
import CompanyForm from './components/CompanyForm';
import Job from './components/Job';

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
                <Route path='/search/results' element={<PrivateRoute><SearchResults/> </PrivateRoute>}/>
                <Route path='/user/:username' element={<PrivateRoute><User /></PrivateRoute>} />
                <Route path='/new/company' element={<PrivateRoute><CompanyForm edit={false} /></PrivateRoute>} />
                <Route path='/company/:companyName' element={<PrivateRoute><Company /></PrivateRoute>} />
                <Route path='/company/:companyName/job/:id' element={<PrivateRoute><Job /></PrivateRoute>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
