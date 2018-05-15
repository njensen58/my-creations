import React from 'react';

const Themes = ({ handleThemeChange, options, type }) => {
    const mappedOptions = options.map(option => {
        return (
            <option value={ option }>{ option[0].toUpperCase() + option.slice(1) }</option>
        )
    })
    return (
        <div>
            <select name="themes" onChange={ (e)=>handleThemeChange(e, type) }>
                { mappedOptions }
            </select>
        </div>
    )
}

export default Themes;
