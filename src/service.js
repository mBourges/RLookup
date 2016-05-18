import Immutable from 'immutable';
import ReactDOM from 'react-dom';

export function filterValue(options, valueToSearch) {
    return Immutable.fromJS(options).filter(item => {
        const regexp = new RegExp("^" + valueToSearch + ".*", "i");
        
        return regexp.test(item.get('value'));
    });
}

export function ensureHighlightedVisible(listReferences, highlightedIndex) {
    if (!listReferences || highlightedIndex < 0) {
        return ;
    }
    
    if (listReferences && highlightedIndex < 0) {
        ReactDOM.findDOMNode(listReferences).scrollTop = 0;
    }
    
    const $list = ReactDOM.findDOMNode(listReferences);
    const $highlighted = $list.children[highlightedIndex];
 
    $list.scrollTop = $highlighted.offsetTop - $list.offsetHeight / 2 + $highlighted.offsetHeight / 2;
    
    return $list.scrollTop;
}