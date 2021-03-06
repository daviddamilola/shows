import React from 'react';
import './App.css';
import './css/spinner.css';
import './css/main.css';
import './css/colors.css';
import { BrowserRouter as Router } from "react-router-dom";
import Index from './pages/index';
import { SearchProvider } from './context/search';

function App() {
  return (
      <Router>
        <SearchProvider>
          <Index />
        </SearchProvider>
      </Router>
  );
};

export default App;
