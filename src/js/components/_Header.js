import React from 'react'

export default function Header(props) {


  function getFile(event) {
  	const input = event.target
    readFileContent(input.files[0])
  }

  function readFileContent(file) {
    console.log(file)
  	const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result)
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    }).then(text => props.tableCallback(text.split(',')) )
  }

  return(<header>
      <h2>Broderick’s Compendium: Plants and Fungi Across the Realm</h2>
      <div id='g-menu'>
        <input id='g-file' style={{'display':'none'}} type="file" name="file" onInput={e => getFile(e)}/>
        <div onClick={() => document.getElementById('g-file').click()}>Load table</div>
        <div>About</div>
      </div>
    </header>)

}
