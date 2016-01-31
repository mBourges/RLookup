import React from 'react';
import ReactDOM from 'react-dom';
import ReactLookup from '../dist/bundle'

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

const getAction = () => {
  	return new Promise(function(resolve, reject) {
  		return setTimeout(() => {
  			resolve(options);
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
                <ReactLookup placeholder="検索" ref="AsyncExample" inputClassName="form-control" options={ options } />
                <button onClick={ this.getValues.bind(this) }>Get Values!</button>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Async</label>
                <ReactLookup optionsLoader={ getAction() } />
              </div>
            </form>
        </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


