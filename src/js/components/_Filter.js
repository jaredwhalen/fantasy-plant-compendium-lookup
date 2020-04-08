import React from "react"

export default function Filter(props) {

  const biomes = []
  const levels = ["Very Common",  "Common", "Uncommon", "Rare", "Very Rare", "Legendary", "Unknown"]

  props.data.map(d => {
      d.biome.split(';').map(s => {
        if (!biomes.includes(s)) {
          biomes.push(s)
        }
      })

    // if (!levels.includes(d.level)) {
    //   levels.push(d.level)
    // }
  })
  const BiomeComponents = biomes.map(d => <option key={d} value={d}>{d}</option>)
  const LevelComponents = levels.map((d, i) => {
    let arr = [...Array(i)]
    let stars;
    if (d !== "Unknown") {
     stars = arr.map(d => <i className="fas fa-star"></i>)
    }

    if (props.level.includes(d)) {
      return <div key={d} className='levels-wrapper'><input className='levels' type='checkbox' name={d} checked/><label htmlFor={d}><span>{stars}</span> {d}</label></div>
    } else {
      return <div key={d} className='levels-wrapper'><input className='levels' type='checkbox' name={d}/><label htmlFor={d}><span>{stars}</span> {d}</label></div>
    }
  })



  const handleBiomeChange = (e) => {
    props.biomeCallback(e.target.value)
  }


  const handleLevelChange = (e) => {
    const selected_levels = []
    var checkedBoxes = document.querySelectorAll('input.levels:checked');
    checkedBoxes.forEach(d => {
      selected_levels.push(d.name)
    })

    props.levelCallback(selected_levels)
  }

  const handleSearch = (e) => {
    props.searchCallback(e.target.value)
  }


  return(
    <div id='g-filter'>
      <input id='g-search' className='g-widget' type="text" placeholder="Search.." value={props.value} onChange={handleSearch}/>
      <div id='g-biomes' className='g-widget'>
        <div className='g-label'>Biome</div>
        <select className='g-widget' onChange={handleBiomeChange}>
          <option value='Any Biome'>Any Biome</option>
          {BiomeComponents}
        </select>
      </div>
      <div id='g-levels' className='g-widget'>
        <div className='g-label'>Rarity</div>
        <form onChange={handleLevelChange}>
          {LevelComponents}
        </form>
      </div>
    </div>
    )
}
