import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';
import ClassNames from 'classnames';

import Option from './option';
            
class OptionList extends React.Component {
    componentDidMount() {
        this.mouseOverStream = Rx.Observable.fromEvent(
            ReactDOM.findDOMNode(this),
            'mouseover',
            event => event.target
        ).subscribe(newState => {
            this.props.mouseOver(newState.dataset.index);
        }, error=> {
            console.log('Error in mouseOverStream', error);
        });
        
        this.clickStream = Rx.Observable.fromEvent(
            ReactDOM.findDOMNode(this),
            'mousedown',
            event => {
                event.preventDefault();
                return event.target
            }
        ).filter(
            target => target.dataset.index !== undefined
        ).subscribe(newState => {
            this.props.mouseClick();
        }, error=> {
            console.log('Error in clickStream', error);
        });
    }
    
    componentWillUmount() {
        this.mouseOverStream.dispose();
        this.clickStream.dispose();
    }
    
    render() {
        const styleClassName = ClassNames(
            'option-list',
            this.props.optionListClassName
        );
        
        return (<div className={ styleClassName }>
            { this.props.hasResults && this.props.options.map((option, index) => (
                <Option
                    optionClassName={ this.props.optionClassName }
                    key={ index }
                    option={ option }
                    highlightedIndex={ this.props.highlightedIndex }
                    index={ index } 
                />
            )) }
            { this.props.displaySearchMessage && (<div className={ this.props.searchMessageClassName }>{ this.props.searchMessage || 'Searching' }</div>) }
            { this.props.displayNoResultMessage && (<div className={ this.props.noResultMessageClassName }>{ this.props.noResultMessage || 'No Results found' }</div>) }
        </div>);
    }
}
    
    
OptionList.propTypes = {
    displayNoResultMessage: React.PropTypes.bool,
    displaySearchMessage: React.PropTypes.bool,
    hasResults: React.PropTypes.bool,
    highlightedIndex: React.PropTypes.number,
    mouseClick: React.PropTypes.func,
    mouseOver: React.PropTypes.func,
    noResultMessage: React.PropTypes.string,
    noResultMessageClassName: React.PropTypes.string,
    onMouseDown: React.PropTypes.func,
    optionClassName: React.PropTypes.string,
    optionListClassName: React.PropTypes.string,
    options: React.PropTypes.object.isRequired,
    searchMessage: React.PropTypes.string,
    searchMessageClassName: React.PropTypes.string
};

export default OptionList;
