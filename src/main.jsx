// Importing necessary modules from React library
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing the main component of the application
import App from './App.jsx';

// Using ReactDOM.createRoot() to create a root element in the HTML document
// and setting it to render the main component of the application
ReactDOM.createRoot(document.getElementById('root')).render(

  // Wrapping the main component with <React.StrictMode> for additional checks and warnings
  <React.StrictMode>

    <App /> {/* Rendering the main component */}
    
  </React.StrictMode>,

);
