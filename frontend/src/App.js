import { BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Adjust the path if needed
import Authentication from './pages/authentication';


function App() {
  return (
    <>
    <Router>
    
    <Routes>

   
    <Route path='/' element={<LandingPage/>} />
    <Route path='/auth' element={<Authentication/>}/>

    </Routes>

    </Router>
    </>
  );
}

export default App;
