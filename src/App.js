import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Game from './components/Game';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/' element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
