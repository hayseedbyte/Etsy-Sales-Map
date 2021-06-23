const mymap = L.map('mapid').setView([39.922072, -97.685021], 1);
let wash = L.marker([34.9732829, -85.2921987]).addTo(mymap);
let allgood = L.marker([34.9334, -85.35164]).addTo(mymap);
let brok = L.marker([36.00199, -95.80714]).addTo(mymap);

//**  https://api.tomtom.com/search/2/geocode/query%url%encoded.js?key=dwnHP6iVdrF1BBg428u08xVJ4t3gGRln */
//??  results.position.lat :: results.position.lon

// const markerArray = [];
// let tomTomResult = fetch(
//   'https://api.tomtom.com/search/2/geocode/1705%20Holiness%20Campground%20Rd%20Cleveland%20GA%2030528-5026%20United%20States.js?limit=1&language=en-US&key=dwnHP6iVdrF1BBg428u08xVJ4t3gGRln'
// );
// // ('https://api.tomtom.com/search/2/geocode/1111%20Street%20Name%20City%20State%20Country.js?limit=1&language=en-US&key=dwnHP6iVdrF1BBg428u08xVJ4t3gGRln');
// markerArray.push(tomTomResult);
// console.log(markerArray);

// const api_url =
//   'https://api.tomtom.com/search/2/geocode/1705%20Holiness%20Campground%20Rd%20Cleveland%20GA%2030528-5026%20United%20States.js?limit=1&language=en-US&key=dwnHP6iVdrF1BBg428u08xVJ4t3gGRln';
// async function getapi(url) {
//   const response = await fetch(url);
//   let data = await response();
//   console.log(data);
//   console.log(response);
//   show(data);
// }

// getapi(api_url);
// const file = document.getElementById('#csv').value;
// let csv = {};
// console.log(file);
// let data = JSON.parse(file);
// console.log(file);
// document.querySelector('.btn-submit').addEventListener('click', orders);
// JSON.stringify(csv);
// function orders() {
//   const file = [];
//   file.push(document.getElementById('#csv')).value;
//   console.log(file);
//   let result = [];
//   let headers = lines[0].split(',');
//   for (let i = 1; i < lines.length; i++) {
//     let obj = {};
//     let currentline = lines[i].split(',');
//     for (let j = 0; j < headers.length; j++) {
//       obj[headers[j]] = currentline[j];
//     }

//     result.push(obj);
//   }
//   console.log(headers);
//   console.log(lines);
//   console.log(result);
//   console.log(JSON.stringify(result));
//   //return result; //JavaScript object
//   return JSON.stringify(result); //JSON
// }

// const address = function(arr) {
//   orders.forEach(function (order, i, arr) {
//     arr.from(orders)
//     arr.push(
//       `${Street1} + ' ' + ${Street2} + ' ' +  ${shipCity} + ' ' +  ${shipState} + ' ' +  ${shipZipcode} + ' ' +  ${shipCountry}`
//     );
//   });
// };
// const coords = address.forEach(e => {});
// function getCSV() {
//   let data = document.getElementById('csv').files[0];
//   let entry = document.getElementById('csv').files[0];
//   console.log('getCSV', entry, data);
//   fetch('uploads/' + encodeURIComponent(entry.name), {
//     method: 'PUT',
//     body: data,
//   });
//   // alert('You file has been uploaded');
//   // location.reload();
// }

const csv = document.getElementById('input#csv.csv');
const upload = function () {
  console.log(csv.file);
  console.log(csv);
  console.log(file);
  const jsonFile = JSON.parse(csv.file);
  console.log(jsonFile);
};
const submit = document.getElementById('#btn-submit');

// //!! geoJSON  !!
// // submit.addEventListener('click', upload(csv.file));
// // const locations = Array.from(csv.file);
// const inputElement = document.getElementById('#csv');
// function getCSV(file) {
//   let fileList = inputElement[0];
//   console.log(fileList);
//   console.log(file);
//   //TODO do something with fileList.
// }

//let csv is the CSV file with headers
function csvJSON(csv) {
  let lines = csv[0];

  let result = [];

  let headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }
  console.log(lines);
  console.log(result);
  console.log(lines);

  //return result; //JavaScript object
  return JSON.stringify(result);
} //JSON
