import React from 'react';
import ResultListItem from './resultListItem';
import ClassNames from 'classnames';
            
class ResultList extends React.Component {
    render() {
        const listClassName = ClassNames(
            this.props.listClassName,
            "result-list"
        );
    
        return (<ul className={ listClassName }>
                { this.props.hasResults && this.props.options.map((option, index) => (
                    <ResultListItem
                        listItemClassName={ this.props.listItemClassName }
                        key={ index }
                        onMouseDown={ this.props.onMouseDown }
                        option={ option }
                        highlightedIndex={ this.props.highlightedIndex }
                        index={ index } 
                    />
                )) }
                { this.props.displaySearchMessage && (<li>{ this.props.searchMessage }</li>) }
                { this.props.displayNoResultMessage && (<li>{ this.props.noResultMessage }</li>) }
          </ul>);
    }
}

ResultList.propTypes = {
    options: React.PropTypes.object.isRequired,
    hasResults: React.PropTypes.bool.isRequired,
    displaySearchMessage: React.PropTypes.bool.isRequired,
    displayNoResultMessage: React.PropTypes.bool.isRequired,
    onMouseDown: React.PropTypes.func.isRequired,
    highlightedIndex: React.PropTypes.number.isRequired,
    searchMessage: React.PropTypes.string,
    noResultMessage: React.PropTypes.string
};

ResultList.defaultProps = {
    searchMessage: 'Searching...',
    noResultMessage: 'No Results found.'
};

export default ResultList;