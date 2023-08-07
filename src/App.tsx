import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/Login';
import HomePage from '@/pages/home/home';
import GenPage from '@/pages/gen-page';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/genPage" element={<GenPage />} />
    </Routes>
  );
}

export default App;
