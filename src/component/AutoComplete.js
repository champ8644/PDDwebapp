import React, {useState} from 'react';
import './AutoComplete.css';

export default function AutoComplete (props) {
    const [items, setitem] = useState([
        "Apple",
        "Banana",
        "Camel",
        "Dog",
        "Elephant",
    ]);

    const [state, setstate] = useState({
        suggestions: [],
        text: "",
    });

    const onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`,'i');
            suggestions = items.sort().filter(v => regex.test(v));
        }
        setstate(() => ({suggestions, text: value}));
    }

    const suggestionSelected = (value) => {
        setstate(() => ({
            text: value,
            suggestions: [],
        }))
    }

    const renderSuggestions = () => {
        const { suggestions } = state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => suggestionSelected(item)}>{item}</li>)}
            </ul>
        )
    }

    return (
        <div className="AutoComplete">
            <input value={state.text} onChange={onTextChanged} type="text"/>
            {renderSuggestions()}
        </div> 
    );
}