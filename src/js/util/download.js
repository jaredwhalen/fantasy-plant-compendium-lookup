export default function download(row) {
console.log(row)
  let content = "data:text/plain;charset=utf-8,"
      + [row].map(e => e.join(",")).join("\n");

  var encodedUri = encodeURI(content);

  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "plant_d100_table.txt");
  document.body.appendChild(link); // Required for FF
  link.click(); // This will download the data file named "my_data.csv".
  document.body.removeChild(link);
}
