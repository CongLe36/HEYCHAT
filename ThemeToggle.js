import React, { useState } from 'react';
import './ThemeToggle.css';

function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
        document.body.className = darkMode ? 'light-mode' : 'dark-mode';
    };

    return (
        <button onClick={toggleTheme} className="theme-toggle">
            {darkMode ? 'Light Mode 🌞' : 'Dark Mode 🌙'}
        </button>
    );
}

export default ThemeToggle;