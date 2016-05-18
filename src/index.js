import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';
import Immutable from 'immutable';
import ClassNames from 'classnames';

import Input from './input';
import OptionList from './optionList';
import { filterValue, ensureHighlightedVisible } from './service';

class Lookup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            options: null,
            showOptionList: false,
            isSearching: false,
            highlightedIndex: -1,
            selected: null
        };
    }
    
    componentWillMount() {
        this.setState(this.state = {
            options: Immutable.List(),
            selected: this.props.defaultValue ? 
                Immutable.fromJS(this.props.defaultValue) : Immutable.Map({
                    label:'',
                    value: ''
                })
        });
    }
    
    componentDidMount() {
        const inputElement = ReactDOM.findDOMNode(this.refs.AutocompleteInput);
        
        let keyUpStream = Rx.Observable
            .fromEvent(inputElement, 'keyup')
            .debounce(500)
            .filter(event => this.shouldTriggerSearch(event))
            .distinctUntilChanged()
            .map(event => {
                this.setState({
                    isSearching: true,
                    showOptionList: true,
                    highlightedIndex: -1,
                    options: Immutable.List()
                });
                
                return event.target.value;
            });
            
        if(this.props.options) {
            keyUpStream = keyUpStream.map(value => {
                return {
                    showOptionList: true,
                    options: filterValue(this.props.options, value),
                    highlightedIndex: -1,
                    isSearching: false
                };
            });
        }
        
        if(this.props.optionsLoader) {
            keyUpStream = keyUpStream.flatMapLatest(value => {
                return Rx.Observable.fromPromise(this.props.optionsLoader(value));
            }).map(results => {
                return {
                    showOptionList: true,
                    options: Immutable.fromJS(results),
                    highlightedIndex: -1,
                    isSearching: false
                };
            });
        }
            
        const keyDownStream = Rx.Observable
            .fromEvent(inputElement, 'keydown');
            
        const commandKeyStream = keyDownStream
            .filter(event => this.isCommandKey(event))
            .map(event => {
                const value = event.target.value;
                let highlightedIndex = this.state.highlightedIndex;
                let newItem = this.getItemToSelect(highlightedIndex, value);
                
                return {
                    selected: newItem,
                    isSearching: false,
                    showOptionList: false,
                    highlightedIndex: -1,
                    options: Immutable.List()
                };
            });
        
        const directionKeyStream = keyDownStream
            .filter(event => this.isDirectionKey(event))
            .map(event => {
                const code = event.keyCode;
                let highlightedIndex = this.state.highlightedIndex;
                
                switch (code) {
                    case 40:
                        highlightedIndex < this.state.options.size - 1 && (highlightedIndex += 1);
                        break;
                    case 38:
                        highlightedIndex > -1 && (highlightedIndex -= 1);
                        break;
                }
                
                highlightedIndex > -1 && this.makeHighlightedIndexVisible();
                
                return { highlightedIndex };
        });
        
        const resetInput = () => {
            if(this.props.resetOnChange) {
                ReactDOM.findDOMNode(this.refs.AutocompleteInput).value = '';
            }
            
            if(!this.props.resetOnChange && ReactDOM.findDOMNode(this.refs.AutocompleteInput).value === '') {
                this.getItemToSelect(-1, '');
            } else if(!this.props.resetOnChange && ReactDOM.findDOMNode(this.refs.AutocompleteInput).value !== this.state.selected.get('label')) {
                ReactDOM.findDOMNode(this.refs.AutocompleteInput).value = this.state.selected.get('label');
            }
            
            return {
                options: Immutable.List(),
                showOptionList: false,
                isSearching: false,
                highlightedIndex: -1,
            };
        };
        
        const blurStream = Rx.Observable
            .fromEvent(inputElement, 'blur')
            .map(resetInput);
            
        const queryStream = keyUpStream
            .merge(commandKeyStream)
            .merge(directionKeyStream)
            .merge(blurStream);
        
        this.subscription =  queryStream.catch(e => {
            this.setState({
                results: Immutable.List(),
                showResultList: false,
                isSearching: false,
                highlightedIndex: -1,
            });
            
            return queryStream;
        }).subscribe(newState => {
            this.setState(newState);
        }, error=> {
            console.log('Error in Stream', error);
        });
    }
    
    componentWillUmount() {
        this.subscription.dispose();
    }
    
    getItemToSelect(highlightedIndex, value) {
        if(highlightedIndex >= 0) {
            return this.handleItemChange(this.state.options.get(highlightedIndex));
        } else if(value === '') {
            return this.handleItemChange(undefined);
        }
        
        return this.handleItemChange(this.state.selected);
    }
    
    handleItemChange(item) {
        let newItem = this.selectItem(item);
        this.handleOnChange(newItem);
        
        return this.setInputValue(newItem);
    }
   
    selectItem(item) {
        if(!item) {
            return Immutable.Map({
                label: '',
                value: ''
            });
        }
        
        return item;
    }
    
    handleOnChange(item) {
        if(this.props.onChange) {
            this.props.onChange(item.toJS());
        }
    }
    
    setInputValue(newValue) {
        if(this.props.resetOnChange){
            ReactDOM.findDOMNode(this.refs.AutocompleteInput).value = '';
            return Immutable.Map({});
        }
        
        ReactDOM.findDOMNode(this.refs.AutocompleteInput).value = newValue.get('label');
        
        return newValue;
    }
    
    updateHighlightedIndex(index) {
        this.setState({
            highlightedIndex: parseInt(index, 10)
        });
    }
    
    handleMouseDown() {
        let highlightedIndex = this.state.highlightedIndex;
        let newItem = this.getItemToSelect(highlightedIndex, null);
        
        this.setState({
            selected: newItem,
            isSearching: false,
            showOptionList: false,
            highlightedIndex: -1,
            options: Immutable.List()
        }); 
    }

    makeHighlightedIndexVisible() {
        let optionListReference = this.refs.OptionList;
        let highlightedIndex = this.state.highlightedIndex;
        
        ensureHighlightedVisible(optionListReference, highlightedIndex);
    }
    
    shouldTriggerSearch(event) {
        return !this.isSelectKey(event) && this.hasValue(event);
    }
    
    isSelectKey(event) {
        return this.isDirectionKey(event)
            || this.isCommandKey(event);
    }
    
    isDirectionKey(event) {
        return event.keyCode === 40
            || event.keyCode === 38;
    }
    
    isCommandKey(event) {
        return event.keyCode === 13
            || event.keyCode === 9;
    }
    
    hasValue(event) {
        const minimumCharacters = this.props.minimumCharacters || 2;
        
        return event.target.value.length >= minimumCharacters; 
    }
    
    getSelectedItem() {
        return this.state.selected.toJS();
    }
    
    render() {
        const lookupClassName = ClassNames('lookup', this.props.lookupClassName);
        const hasResults = this.state.options.count() !== 0 ;
        const displaySearchMessage = this.state.isSearching;
        const displayNoResultMessage = !this.state.isSearching && !hasResults;

        return (<div className={ lookupClassName }>
            <Input 
                ref="AutocompleteInput"
                required={ this.props.required }
                inputClassName={ this.props.inputClassName }
                placeholder={ this.props.placeholder }
                defaultValue={ this.state.selected }
            />
            { this.state.showOptionList && <OptionList
                ref="OptionList"
                hasResults={ hasResults }
                options={ this.state.options }
                displaySearchMessage={ displaySearchMessage }
                displayNoResultMessage={ displayNoResultMessage }
                highlightedIndex={ this.state.highlightedIndex }
                optionListClassName={ this.props.optionListClassName }
                optionClassName={ this.props.optionClassName }
                mouseOver={ this.updateHighlightedIndex.bind(this) }
                mouseClick={ this.handleMouseDown.bind(this) }
                searchMessageClassName={ this.props.searchMessageClassName }
                noResultMessageClassName={ this.props.noResultMessageClassName }
                searchMessage={ this.props.searchMessage }
                noResultMessage={ this.props.noResultMessage }
            /> }
        </div>);
    }
}

Lookup.propTypes = {
    defaultValue: React.PropTypes.object,
    inputClassName: React.PropTypes.string,
    lookupClassName: React.PropTypes.string,
    minimumCharacters: React.PropTypes.number,
    noResultMessage: React.PropTypes.string,
    noResultMessageClassName: React.PropTypes.string,
    onChange: React.PropTypes.func,
    optionClassName: React.PropTypes.string,
    optionListClassName: React.PropTypes.string,
    options: React.PropTypes.array,
    optionsLoader: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    resetOnChange: React.PropTypes.bool,
    required: React.PropTypes.bool,
    searchMessageClassName: React.PropTypes.string,
    searchMessage: React.PropTypes.string
};
 
export default Lookup;
