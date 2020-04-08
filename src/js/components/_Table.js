import React, {Component} from "react"
import groupBy from '../util/groupBy'

export default class Table extends Component {
  constructor() {
    super();
  }

render() {
  const table_data = this.props.data.filter(d => this.props.table.includes(d.code.toString()))

  const table_data_grouped = groupBy(table_data, 'level')

  const very_common = table_data_grouped['Very Common']
  const common = table_data_grouped['Common']
  const uncommon = table_data_grouped['Uncommon']
  const rare = table_data_grouped['Rare']
  const very_rare = table_data_grouped['Very Rare']
  const legnedary = table_data_grouped['Legendary']
  const unknown = table_data_grouped['Unknown']

  const array = [very_common,common,uncommon,rare,very_rare,legnedary,unknown]

  const levels = ["Very Common",  "Common", "Uncommon", "Rare", "Very Rare", "Legendary", "Unknown"];
  const rolls = ['1 - 29', '30 - 56', '57 - 79', '80 - 91', '92 - 99', '100', '']


  const handleClick = (e) => {
    let clicked_code = e.target.getAttribute('data-code')
    let table = this.props.table;

    // if (!table.includes(clicked_code)) {
    //   table.push(clicked_code)
    // } else {
      table = table.filter(d => d != clicked_code)
    // }
    this.props.tableCallback(table)
  }

  const TableComponents = levels.map((d,i) => {
    let section = table_data_grouped[d]
    let rows;
    if (section) {


      function split(arr, parts) {
          let arr_split = arr.split(' - ').map(d => Number(d))
          let left = arr_split[0];
          let right = arr_split[1]
          var result = [],
              delta = (right - left) / (parts - 1);
          while (left < right) {
              result.push(left);
              left += delta;
          }
          result.push(right);
          return result;
      }


      const dc = split(rolls[i], section.length + 1);
      rows = section.map((r,i) => {
        let start_dc;
        let close_dc;

        if (r.level == 'Legendary') {
          start_dc = '100'
        } else if (r.level != 'Unknown') {
          start_dc = dc[i].toFixed(0)
          if (i < section.length) {
            close_dc = dc[i + 1].toFixed(0)
          }

          if (i > 0) {
            start_dc = Number(start_dc) + 1
          }
        }
          return (
            <div className="g-table-row">
              <div className='dc'>
              {start_dc
                ? (<>{start_dc}</>)
                : ('')
              }
              {close_dc
                ? (<> - {close_dc}</>)
                : ('')
              }
              </div>
              <div className='name'>{r.name}</div>
              <div className='info'>{r.biome.split(';').map((s, i) => <div className='biome'>{ ((i + 1 == r.biome.split(';').length) || (r.biome.split(';').length == 1)) ? (<>{s}</>) : (<>{s},&nbsp;</>)}</div>)}</div>
              <i onClick={handleClick} className="row-remove fas fa-minus-circle" data-code={r.code}></i>
            </div>
          )
      })
      return(
        <div className='g-table-section'>
        <div className='g-table-section-label'>{d} {rolls[i] ? <span>(DC {rolls[i]})</span> : ('')}</div>
        <div className='g-table-section-header'>
          <div className='dc'>d100</div>
          <div className='name'>Plant Name</div>
          <div className='info'>Biome</div>
          <div></div>
        </div>
        {rows}
        </div>
      )
    }
  })
  return(
    <div id='g-table'>
      {TableComponents}
    </div>
    )
}


}
