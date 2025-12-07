import React from 'react';
import MainLayout from './components/Layout/MainLayout';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
