import React from 'react';
import ResultListItem from './resultListItem';

class ResultList extends React.Component {
   
    
    render() {
        
        return (<ul className="result-list">
                { this.props.hasResults && this.props.options.map((option, index) => (<ResultListItem key={ index } onMouseDown={ this.props.onMouseDown } option={ option } highlightedIndex={ this.props.highlightedIndex } index={ index } />)) }
                { this.props.displaySearchMessage && (<li>Searching...</li>) }
                { this.props.displayNoResultMessage && (<li>No results found</li>) }
          </ul>);
    }
}

ResultList.propTypes = {
    options: React.PropTypes.object.isRequired,
    hasResults: React.PropTypes.bool.isRequired,
    displaySearchMessage: React.PropTypes.bool.isRequired,
    displayNoResultMessage: React.PropTypes.bool.isRequired,
    onMouseDown: React.PropTypes.func.isRequired,
    highlightedIndex: React.PropTypes.number.isRequired
};

export default ResultList;