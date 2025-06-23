import { BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Adjust the path if needed


function App() {
  return (
    <>
    <Router>
    
    <Routes>

   
    <Route path='/' element={<LandingPage/>} />

    </Routes>

    </Router>
    </>
  );
}

export default App;
