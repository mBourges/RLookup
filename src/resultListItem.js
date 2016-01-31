import React from 'react';
import ClassNames from 'classnames';

const ResultListItem = ({onMouseDown, option, highlightedIndex, index }) => {
    const handleClick = () => {
        onMouseDown(option);
    };
    
    const isActive = () => {
        return highlightedIndex === index;
    };
    
    const styleClass = ClassNames({
        active: isActive()
    });
    
    return (<li onMouseDown={ handleClick } className={ styleClass }>
        { option.get('label') }
    </li>);
};

export default ResultListItem;