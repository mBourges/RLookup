import React from 'react';
import ReactDOM from 'react-dom';
import ReactLookup from '../dist/bundle'
import Immutable from 'immutable';

const options = [{
  				label: "Matt",
  				value: "matt"
  			}, {
  				label: "Matthieu",
  				value: "matthieu"
  			}, {
  				label: "Matthew",
  				value: "matthew"
  			},{
  				label: "Matt",
  				value: "matt"
  			}, {
  				label: "Matthieu",
  				value: "matthieu"
  			}, {
  				label: "Matthew",
  				value: "matthew"
  			},{
  				label: "Matt",
  				value: "matt"
  			}, {
  				label: "Matthieu",
  				value: "matthieu"
  			}, {
  				label: "Matthew",
  				value: "matthew"
  			},{
  				label: "Matt",
  				value: "matt"
  			}, {
  				label: "Matthieu",
  				value: "matthieu"
  			}, {
  				label: "Matthew",
  				value: "matthew"
  			},{
  				label: "Matt",
  				value: "matt"
  			}, {
  				label: "Matthieu",
  				value: "matthieu"
  			}, {
  				label: "Matthew",
  				value: "matthew"
  			},{
  				label: "Matt",
  				value: "matt"
  			}, {
  				label: "Matthieu",
  				value: "matthieu"
  			}, {
  				label: "Matthew",
  				value: "matthew"
  			},{
  				label: "Matt",
  				value: "matt"
  			}, {
  				label: "Matthieu",
  				value: "matthieu"
  			}, {
  				label: "Matthew",
  				value: "matthew"
  			}]

const getAction = (name) => {
  	return new Promise(function(resolve, reject) {
  	    const results = Immutable.fromJS(options).filter(item => {
  			const regexp = new RegExp("^" + name + ".*", "i");
  			return regexp.test(item.get('value'));
  		})
  		
  		return setTimeout(() => {
  			resolve(results.toJS());
  		}, 2000);
  	});
};

class App extends React.Component {
    getValues(event){
        event.preventDefault();
        event.stopPropagation();
        
        console.log('this.refs.AsyncExample', this.refs.AsyncExample.getSelectedItem())
    }
    
    render() {
        
        return (<div className="col-md-4 col-md-offset-3">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Sync</label>
                <ReactLookup placeholder="検索" ref="AsyncExample" inputClassName="form-control" options={ options } searchMessage="Searching..." noResultMessage="No Result Found"/>
                <button onClick={ this.getValues.bind(this) }>Get Values!</button>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Async</label>
                <ReactLookup optionsLoader={ getAction } />
              </div>
            </form>
        </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


