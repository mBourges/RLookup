import React from 'react';
import ClassNames from 'classnames';

const Option = ({ optionClassName, option, highlightedIndex, index }) => {
    const isActive = () => {
        return highlightedIndex === index;
    };
    
    const styleClass = ClassNames(optionClassName, { active: isActive() });
    
    return (<div className={ styleClass } data-index={ index }>
        { option.get('label') }
    </div>);
};

export default Option;
