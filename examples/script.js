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

ReactDOM.render(<div>
    <ReactLookup options={ options } />
    <ReactLookup optionsLoader={ getAction() } />
</div>, document.getElementById('app'));