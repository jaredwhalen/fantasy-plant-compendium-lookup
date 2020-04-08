import React from "react"

export default function Results(props) {


  const filtered = props.data
  .filter(d => d.name.toLowerCase().includes(props.search.toLowerCase()))
  .filter(d => {
    if (props.biome === "Any Biome") {
      return d
    } else {
      return d.biome === props.biome
    }
  })
  .filter(d => props.level.includes(d.level))

  const handleClick = (e) => {
    let clicked_code = e.target.getAttribute('data-code')
    let table = props.table;

    if (!table.includes(clicked_code)) {
      table.push(clicked_code)
    } else {
      table = table.filter(d => d != clicked_code)
    }
    props.tableCallback(table)
  }

  const ResultsComponents = filtered.map(d => {
    let x;
    if (d.level === 'Very Common') {
      x = 0
    } else if (d.level === 'Common') {
      x = 1
    } else if (d.level === 'Uncommon') {
      x = 2
    } else if (d.level === 'Rare') {
      x = 3
    } else if (d.level === 'Very Rare') {
      x = 4
    } else if (d.level === 'Legendary') {
      x = 5
    }
    let arr = [...Array(x)]
    let stars;
    if (d.level !== "Unknown") {
     stars = arr.map(d => <i className="fas fa-star"></i>)
    }

    return(
      <div className='g-card'>
        <div className="g-add">
          {props.table.includes(d.code.toString())
          ? (<i onClick={handleClick} className="fas fa-minus-circle" data-code={d.code}></i>)
          : (<i onClick={handleClick} className="fas fa-plus-circle" data-code={d.code}></i>)
          }
        </div>
        <div className="g-inner">
          <div className='name'>{d.name}</div>
          <div className='info'>
            {d.biome.split(';').map(s => <div className='biome'>{s}</div>)}
            <div className='level'><span>{stars}</span> {d.level}</div>
          </div>
          <div className='detail'>{d.detail}</div>
        </div>
      </div>
        )
  })

  return(
    <div id='g-results'>
      {ResultsComponents.length
      ? ResultsComponents
      : (<div>Whoops.</div>)}
    </div>
    )
}
