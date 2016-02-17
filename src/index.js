import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';
import ClassNames from 'classnames';
import Immutable from 'immutable';

import ResultList from './resultList';

export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            results: Immutable.List(),
            showResultList: false,
            isSearching: false,
            highlightedIndex: -1,
            selected: this.props.defaultValue ? Immutable.fromJS(this.props.defaultValue) : Immutable.Map({})
        };
    }
    
    getSelectedItem() {
        return this.state.selected.toJS();
    }
    
    ensureHighlightedVisible() {
        if (!this.refs.list || this.state.highlightedIndex < 0) {
            return ;
        }
        
        if (this.refs.list && this.state.highlightedIndex < 0) {
            ReactDOM.findDOMNode(this.refs.list).scrollTop = 0;
        }
        
        const $list = ReactDOM.findDOMNode(this.refs.list);
        const $highlighted = $list.children[this.state.highlightedIndex];
     
        $list.scrollTop = $highlighted.offsetTop - $list.offsetHeight / 2 + $highlighted.offsetHeight / 2;
        
        return $list.scrollTop;
    }
    
    isSelectKey(event) {
        return event.keyCode === 13 || event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 9;
    }
    
    selectItem(item) {
        if(!item) {
            item = Immutable.Map({
                label: '',
                value: ''
            })
        }
        
        this.setState({
          isSearching: false,
          showResultList: false,
          results: Immutable.List()
      });
      
       if (item) {
           ReactDOM.findDOMNode(this.refs.AutocompleteInput).value = item.get('label');
       } else {
           ReactDOM.findDOMNode(this.refs.AutocompleteInput).value = '';
       }
      
      if(this.props.onChange) {
          this.props.onChange(item.toJS());
      }
      
        this.setState({
            selected: item,
            results: Immutable.List()
        });
    }

  componentDidMount() {
      console.log('componentDidMount', this.props.defaultValue, this.state.selected)
    const inputElement = ReactDOM.findDOMNode(this.refs.AutocompleteInput);
    
    const keyDownStream = Rx.Observable
  .fromEvent(inputElement, 'keydown')
  .filter(event => this.isSelectKey(event))
  .map(event => {
      const code = event.keyCode;
    let highlightedIndex = this.state.highlightedIndex;
            
        switch (code) {
            case 9:
                if(highlightedIndex >= 0) {
                    this.selectItem(this.state.results.get(this.state.highlightedIndex));
                } else {
                	this.selectItem(undefined);
                }
                break;
            case 13:
                if(highlightedIndex >= 0) {
                    this.selectItem(this.state.results.get(this.state.highlightedIndex));
                } else {
                	this.selectItem(undefined);
                }
                break;
            case 40:
                highlightedIndex < this.state.results.size - 1 && (highlightedIndex += 1);
                break;
            case 38:
                highlightedIndex > -1 && (highlightedIndex -= 1);
                break;
        }
        
        // this.setState({ highlightedIndex: highlightedIndex });
        highlightedIndex > -1 && this.ensureHighlightedVisible();
        
        if (code === 13 || code === 40 || code === 38) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        return { highlightedIndex: highlightedIndex }
  });
    
    
    
       
    
    const resetInput = () => {
        if(ReactDOM.findDOMNode(this.refs.AutocompleteInput).value === '') {
            this.selectItem(undefined);
        }
        return {
      results: Immutable.List(),
            showResultList: false,
            isSearching: false,
            highlightedIndex: -1,
     }
    }
    
    
const blurStream = Rx.Observable
  .fromEvent(inputElement, 'blur')
  .map(resetInput);
  
  
  let keyUpStream = null;
  
if(this.props.options) {
	keyUpStream = Rx.Observable
  .fromEvent(inputElement, 'keyup')
  .filter(event => !this.isSelectKey(event))
  .filter(event => { return event.target.value.length > 1; })
  .debounce(500)
  .distinctUntilChanged()
  .map(event => {
  		
  		const results = Immutable.fromJS(this.props.options).filter(item => {
  			const regexp = new RegExp("^" + event.target.value + ".*", "i");
  			return regexp.test(item.get('value'));
  		})
      return {
          showResultList: true,
          results: results,
          highlightedIndex: -1,
      };
  })
}

if(this.props.optionsLoader) {
	keyUpStream = Rx.Observable
  .fromEvent(inputElement, 'keyup')
  .filter(event => !this.isSelectKey(event))
  .filter(event => { return event.target.value.length > 1; })
  .debounce(500)
  .distinctUntilChanged()
  .map(event => {
      this.setState({
          isSearching: true,
          showResultList: true,
          highlightedIndex: -1,
          results: Immutable.List()
      });
      
      return event.target.value;
  })
  .flatMapLatest(value => {
  		return Rx.Observable.fromPromise(this.props.optionsLoader(value))
    })
    .map(results => {
    	console.log('Promise Results', results);
        return {
          results: Immutable.fromJS(results),
          isSearching: false
        }
    });
}
    

    
    keyUpStream
        .merge(blurStream)
        .merge(keyDownStream)
        .subscribe(
  data => {
    this.setState(data);
    console.log(data)
  },
  error=> {
    console.log('Error:' + error);
  });
  }
  
  render() {
      const displaySearchMessage = this.state.isSearching;
      const displayNoResultMessage = !this.state.isSearching && this.state.results.size === 0;
      const hasResults = this.state.results.size !== 0 ;
      
      return (<div className="autocomplete">
        <input ref="AutocompleteInput" required={ this.props.required } className={ this.props.inputClassName } placeholder={ this.props.placeholder } defaultValue={　this.state.selected ? this.state.selected.get('label') : ''} />
        
        { this.state.showResultList && <ResultList ref="list" 
            listClassName={ this.props.listClassName }
            listItemClassName={ this.props.listItemClassName }
            options={ this.state.results }
            hasResults={ hasResults } 
            displaySearchMessage={ displaySearchMessage }
            displayNoResultMessage={ displayNoResultMessage }
            onMouseDown={ this.selectItem.bind(this) }
            highlightedIndex={ this.state.highlightedIndex  }
            searchMessage={ this.props.searchMessage }
            noResultMessage={ this.props.noResultMessage }
        /> }
    </div>);
  }
}

Autocomplete.propTypes = {
	options: React.PropTypes.array,
	optionsLoader: React.PropTypes.func,
	onChange: React.PropTypes.func
};

Autocomplete.defaultProps ={
  placeholder: '',
};

export default Autocomplete;