import React from 'react';

const Form = ({handleChange, handleSubmit, value}) => {
    return (
        <form className="form">
            <input
                type="text"
                onChange={handleChange}
                value={value}
                name="userInput"
                placeholder="Enter new Text"/>
            <button
                onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default Form;
