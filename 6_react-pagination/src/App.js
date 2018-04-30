import React from 'react'
import CardDisplay from './components/CardDisplay';
import Navbar from './components/Navbar';
import './globalStyle.css';

const App = (props) => {
    return (
        <div>
            <Navbar />
            <CardDisplay />
        </div>
    )
}

export default App;
