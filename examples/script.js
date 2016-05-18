import React from 'react';
import ReactDOM from 'react-dom';
import ReactLookup from '../dist/bundle'
import Immutable from 'immutable';

const options = [
  { 
    label: 'Dave Barber',
    value: 'Dave Barber'
  }, {
    label: 'Lance Ortiz',
    value: 'Lance Ortiz'
  }, {
    label: 'Ray Saunders',
    value: 'Ray Saunders'
  }, {
    label: 'Denise Duncan',
    value: 'Denise Duncan'
  }, {
    label: 'Johnnie Carter',
    value: 'Johnnie Carter'
  }, {
    label: 'Ella Benson',
    value: 'Ella Benson'
  }, {
    label: 'Mandy Perkins',
    value: 'Mandy Perkins'
  }, {
    label: 'Darla Cunningham',
    value: 'Darla Cunningham'
  }, {
    label: 'Ben Nash',
    value: 'Ben Nash'
  }, {
    label: 'Leslie Kim',
    value: 'Leslie Kim'
  }, {
    label: 'Clay Greene',
    value: 'Clay Greene'
  }, {
    label: 'Hilda Henry',
    value: 'Hilda Henry'
  }, {
    label: 'Lindsey Robertson',
    value: 'Lindsey Robertson'
  }, {
    label: 'Adrienne Bryan',
    value: 'Adrienne Bryan'
  }, {
    label: 'Rachael Graham',
    value: 'Rachael Graham'
  }, {
    label: 'Rochelle Olson',
    value: 'Rochelle Olson'
  }, {
    label: 'Homer Maldonado',
    value: 'Homer Maldonado'
  }, {
    label: 'Tiffany Carr',
    value: 'Tiffany Carr'
  }, {
    label: 'Susie Rhodes',
    value: 'Susie Rhodes'
  }, {
    label: 'Jermaine Lee',
    value: 'Jermaine Lee'
  }, {
    label: 'Kristi Yates',
    value: 'Kristi Yates'
  }, {
    label: 'Kathy Hunter',
    value: 'Kathy Hunter'
  }, {
    label: 'Diana Cook',
    value: 'Diana Cook'
  }, {
    label: 'Walter Castro',
    value: 'Walter Castro'
  }, {
    label: 'Arlene Joseph',
    value: 'Arlene Joseph'
  }, {
    label: 'Guadalupe Blair',
    value: 'Guadalupe Blair'
  }, {
    label: 'Guy Sims',
    value: 'Guy Sims'
  }, {
    label: 'Preston Beck',
    value: 'Preston Beck'
  }, {
    label: 'Chris Maxwell',
    value: 'Chris Maxwell'
  }, {
    label: 'Brendan Bridges',
    value: 'Brendan Bridges'
  }, {
    label: 'Earnest Pearson',
    value: 'Earnest Pearson'
  }, {
    label: 'Maria Dean',
    value: 'Maria Dean'
  }, {
    label: 'Becky Leonard',
    value: 'Becky Leonard'
  }, {
    label: 'Austin Munoz',
    value: 'Austin Munoz'
  }, {
    label: 'Alfredo Mccormick',
    value: 'Alfredo Mccormick'
  }, {
    label: 'Charlie Mason',
    value: 'Charlie Mason'
  }, {
    label: 'Sidney Pierce',
    value: 'Sidney Pierce'
  }, {
    label: 'Mitchell Sherman',
    value: 'Mitchell Sherman'
  }, {
    label: 'Josh James',
    value: 'Josh James'
  }, {
    label: 'Henrietta Norris',
    value: 'Henrietta Norris'
  }, {
    label: 'Meredith Roberson',
    value: 'Meredith Roberson'
  }, {
    label: 'Veronica Potter',
    value: 'Veronica Potter'
  }, {
    label: 'Gilberto Ellis',
    value: 'Gilberto Ellis'
  }, {
    label: 'Dwight Jacobs',
    value: 'Dwight Jacobs'
  }, {
    label: 'Ramona Palmer',
    value: 'Ramona Palmer'
  }, {
    label: 'Madeline Copeland',
    value: 'Madeline Copeland'
  }, {
    label: 'Woodrow Coleman',
    value: 'Woodrow Coleman'
  }, {
    label: 'Richard Little',
    value: 'Richard Little'
  }, {
    label: 'Maggie Bass',
    value: 'Maggie Bass'
  }, {
    label: 'Malcolm Norton',
    value: 'Malcolm Norton'
  }, {
    label: 'Lynette Becker',
    value: 'Lynette Becker'
  }, {
    label: 'Sherry Frazier',
    value: 'Sherry Frazier'
  }, {
    label: 'Kevin Kelly',
    value: 'Kevin Kelly'
  }, {
    label: 'Jack Reed',
    value: 'Jack Reed'
  }, {
    label: 'Della Harrison',
    value: 'Della Harrison'
  }, {
    label: 'Jessie Lowe',
    value: 'Jessie Lowe'
  }, {
    label: 'Vicki Mckenzie',
    value: 'Vicki Mckenzie'
  }, {
    label: 'Stanley Fisher',
    value: 'Stanley Fisher'
  }, {
    label: 'Bryan Perry',
    value: 'Bryan Perry'
  }, {
    label: 'Debra Wong',
    value: 'Debra Wong'
  }, {
    label: 'Kendra Diaz',
    value: 'Kendra Diaz'
  }, {
    label: 'Elisa Todd',
    value: 'Elisa Todd'
  }, {
    label: 'Dominick Hardy',
    value: 'Dominick Hardy'
  }, {
    label: 'Tasha Mcdonald',
    value: 'Tasha Mcdonald'
  }, {
    label: 'Tamara Doyle',
    value: 'Tamara Doyle'
  }, {
    label: 'Laverne Meyer',
    value: 'Laverne Meyer'
  }, {
    label: 'Darrin Thompson',
    value: 'Darrin Thompson'
  }, {
    label: 'Cora Greer',
    value: 'Cora Greer'
  }, {
    label: 'Darlene Lawson',
    value: 'Darlene Lawson'
  }, {
    label: 'Silvia Simpson',
    value: 'Silvia Simpson'
  }, {
    label: 'Joel Rice',
    value: 'Joel Rice'
  }, {
    label: 'Jon Padilla',
    value: 'Jon Padilla'
  },  { 
    label: 'Elena Howell',
    value: 'Elena Howell'
  },  { 
    label: 'Robin Chambers',
    value: 'Robin Chambers'
  },  { 
    label: 'Jeannette Moore',
    value: 'Jeannette Moore'
  },  { 
    label: 'Drew Edwards',
    value: 'Drew Edwards'
  },  { 
    label: 'May Rowe',
    value: 'May Rowe'
  },  { 
    label: 'Spencer Alvarez',
    value: 'Spencer Alvarez'
  },  { 
    label: 'Phyllis Sparks',
    value: 'Phyllis Sparks'
  },  { 
    label: 'Cody Holt',
    value: 'Cody Holt'
  },  { 
    label: 'Gustavo Francis',
    value: 'Gustavo Francis'
  },  { 
    label: 'Fernando Stone',
    value: 'Fernando Stone'
  },  { 
    label: 'Cecilia Reynolds',
    value: 'Cecilia Reynolds'
  },  { 
    label: 'Alexis Black',
    value: 'Alexis Black'
  },  { 
    label: 'Andres Murray',
    value: 'Andres Murray'
  },  { 
    label: 'Jennie Rogers',
    value: 'Jennie Rogers'
  },  { 
    label: 'Blanche Ray',
    value: 'Blanche Ray'
  },  { 
    label: 'Rogelio Walters',
    value: 'Rogelio Walters'
  },  { 
    label: 'Delores Robinson',
    value: 'Delores Robinson'
  },  { 
    label: 'Lena Weber',
    value: 'Lena Weber'
  },  { 
    label: 'Beulah Lloyd',
    value: 'Beulah Lloyd'
  },  { 
    label: 'Edward Snyder',
    value: 'Edward Snyder'
  },  { 
    label: 'Angie Burke',
    value: 'Angie Burke'
  },  { 
    label: 'Angelina Bishop',
    value: 'Angelina Bishop'
  },  { 
    label: 'Beatrice Cobb',
    value: 'Beatrice Cobb'
  },  { 
    label: 'Lewis Mack',
    value: 'Lewis Mack'
  },  { 
    label: 'Lorena Richardson',
    value: 'Lorena Richardson'
  },  { 
    label: 'Velma Kennedy',
    value: 'Velma Kennedy'
  },  { 
    label: 'Gerald Ingram',
    value: 'Gerald Ingram'
  }, {
    label: 'Noah Chapman',
    value: 'Noah Chapman'
  }]
  			
const defaultValue = {
  				label: "Matt",
  				value: "matt"
  			}

const getAction = (name) => {
  	return new Promise(function(resolve, reject) {
  	    if(name === undefined || name === null || name == '') {
  	      return reject('Big Error');
  	    }
  	    
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
  constructor(props){
    super(props);
    this.state = {
      selectedValue: {}
    }
  }
    getValues(event){
        event.preventDefault();
        event.stopPropagation();
        
        console.log('this.refs.AsyncExample', this.refs.AsyncExample.getSelectedItem())
    }
    
    onChange(item) {
      console.log('OnChange(item)', item);
      
      this.setState({
        selectedValue: item
      });
    }
    
    
    render() {
        
        return (<div className="col-md-4 col-md-offset-3">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Sync</label>
                <ReactLookup
                  placeholder="検索"
                  ref="AsyncExample"
                  inputClassName="form-control"
                  options={ options }
                  searchMessage="Searching..."
                  noResultMessage="No Result Found"
                  optionClassName="list-group-item"
                  optionListClassName="list-group"
                  searchMessageClassName="list-group-item"
                  noResultMessageClassName="list-group-item"
                  searchMessage="検索中"
                  noResultMessage="結果ありません"
                />
                <button type="button" onClick={ this.getValues.bind(this) }>Get Values!</button>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Async</label>
                <ReactLookup optionsLoader={ getAction } />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Async Default Value Reset on Change</label>
                <ReactLookup optionsLoader={ getAction } defaultValue={ defaultValue } onChange={this.onChange.bind(this)} resetOnChange={ true } />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Async Default Value</label>
                <ReactLookup optionsLoader={ getAction } defaultValue={ defaultValue } onChange={this.onChange.bind(this)} resetOnChange={ false } />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Async Minimum Character 3</label>
                <ReactLookup optionsLoader={ getAction } onChange={this.onChange.bind(this)} resetOnChange={ false } minimumCharacters={ 3 } />
              </div>
            </form>
                <h3>{ this.state.selectedValue.value }</h3>
        </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


