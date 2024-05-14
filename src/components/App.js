import React, { useState } from 'react';
import './App.css';
import AppContent from './AppContent';

function App() {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <div className={`relative px-6 lg:px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-white'}`} style={{ overflowY: 'auto', minHeight: '100vh' }}>
            <button onClick={toggleDarkMode} className={`absolute top-0 right-0 m-4 px-2 py-1 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <AppContent />
        </div>
    );
}

export default App;
