import React, {Component} from 'react';
import ReactToPrint from 'react-to-print';
import './scss/App.scss';
import Header from "./js/components/_Header"
import Filter from "./js/components/_Filter"
import Results from "./js/components/_Results"
import Table from "./js/components/_Table"
import download from './js/util/download'

const {
  GoogleSpreadsheet
} = require('google-spreadsheet');


class App extends Component {
  constructor() {
    super();
    this.state = {
      data: undefined,
      search: '',
      biome: 'Any Biome',
      level: ["Very Common",  "Common", "Uncommon", "Rare", "Very Rare", "Legendary", "Unknown"],
      table: []
    };
  }

  async componentDidMount() {
    // const arr = [];
    //
    // const doc = new GoogleSpreadsheet('1iIVcK-e-0vKtbrfmlR9ViJhc7sxifqmYhcEHcG5RcWI');
    // await doc.useServiceAccountAuth(require('./.config.json'));
    // await doc.loadInfo(); // loads document properties and worksheets
    // const sheet = doc.sheetsById[0];
    // const rows = await sheet.getRows();
    //
    // rows.map((d) => arr.push({
    //   name: d.name,
    //   biome: d.biome,
    //   detail: d.detail,
    //   level: d.level,
    //   code: d.gid
    // }))

    const arr = require('./assets/data.json')

    this.setState({ data: arr });
  }

  biomeFunction = (childData) => {
    this.setState({biome: childData})
  }

  levelFunction = (childData) => {
    this.setState({level: childData})
  }

  searchFunction = (childData) => {
    this.setState({search: childData})
  }

  tableFunction = (childData) => {
    console.log(childData)
    this.setState({table: childData})
  }


  render() {
    return (
      <div className="App">
        <Header tableCallback = {this.tableFunction}/>
        {this.state.data
        ? (
          <main id='main'>
            <Filter data={this.state.data} biome={this.state.biome} level={this.state.level} biomeCallback = {this.biomeFunction} levelCallback = {this.levelFunction} searchCallback = {this.searchFunction}/>
            <Results search={this.state.search} data={this.state.data} biome={this.state.biome} level={this.state.level} tableCallback = {this.tableFunction} table={this.state.table}/>
            <div id='g-table-wrapper'>
            <Table data={this.state.data} table={this.state.table} tableCallback = {this.tableFunction} ref={el => (this.componentRef = el)}/>
            {this.state.table.some(d => d !== undefined)
              ? (
                <div id='g-buttons'>
                <ReactToPrint
                  trigger={() => <button>Print d100 table</button>}
                  content={() => this.componentRef}
                />
                  <button onClick={() => download(this.state.table) }>Download data file</button>
                </div>
              )
              : ('')
            }
            </div>
          </main>
        )
        : (
          <></>
        )
        }
      </div>
    )
  }
}

export default App;
