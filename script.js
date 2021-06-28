const mymap = L.map('mapid', { doubleClickZoom: false }).locate({
  setView: true,
  maxZoom: 16,
});

//**  https://api.tomtom.com/search/2/geocode/query%url%encoded.js?key=dwnHP6iVdrF1BBg428u08xVJ4t3gGRln */
//??  results.position.lat :: results.position.lon
const display = document.getElementById('counter');
const mark = document.getElementById('mark');
const form = document.getElementById('fileForm');
const csvFile = document.getElementById('csvFile');
let geoData = [];
let addresses = [];
let links = [];
let linksFor = [];
let coords = [];
let addrCount = addresses.length;
let coordsCount = coords.length;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('Form Submitted');
  markMap(csvFile);
});
form.addEventListener('mark', function (e) {
  e.preventDefault();
  addMarker(coords);
});

function markMap(file) {
  const input = file.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    // const text = event.target.result;
    // let data = csvToArray(text);
    Papa.parse(csvFile.files[0], {
      header: true,
      complete: function (result) {
        console.log(result.data);
        data = result.data;
        getGeoData(data, geoData);
      },
    });

    if (geoData.length === data.length) {
      cleanData(geoData, addresses);
      console.log('add', addresses);
    }
    if (addresses.length === geoData.length) {
      getLinks(addresses, links);
    }
    if (links.length === addresses.length) {
      getJSONArr(links);
    }
    if (coords.length > 0) {
      addMarker(coords);
    }
  };
  reader.readAsText(input);
}
function getJSONArr(arr) {
  arr.forEach(delayLoop(getJSON, 250));
  // arr.forEach(function (el) {
  //   getJSON(el);
  // });
}
function getFile() {
  document.getElementById('csvFile').click();
}

function sub(obj) {
  let file = obj.value;
  let fileName = file.split('\\');
  document.getElementById('upload').innerHTML = fileName[fileName.length - 1];
  e.preventDefault();
}
// arr.forEach(delayLoop(getJSON(el), 250));
// function csvToArray(str, delimiter = ',') {
//   const headers = str.slice(0, str.indexOf('\n')).split(delimiter);
//   const rows = str.slice(str.indexOf('\n') + 1).split('\n');
//   const arr = rows.map(function (row) {
//     const values = row.split(delimiter);
//     const el = headers.reduce(function (object, header, index) {
//       object[header] = values[index];
//       return object;
//     }, {});
//     return el;
//   });
//   return arr;
// }
function cleanData(arr, arr2) {
  arr.forEach(function (str) {
    arr2.push(encodeURIComponent(str));
  });
}

function getGeoData(arr, arr2) {
  for (i = 0; i < arr.length; i++) {
    const shipCity = arr[i]['Ship City'];
    const shipCountry = arr[i]['Ship Country'];
    const shipState = arr[i]['Ship State'];
    const shipZipcode = arr[i]['Ship Zipcode'];
    const street1 = arr[i]['Street 1'];
    arr2.push(
      `${street1} ${shipCity}, ${shipState}, ${shipZipcode}, ${shipCountry}`
    );
  }
}

function getLinks(arr, arr2) {
  arr.forEach(function (el) {
    const str = el;
    arr2.push(
      `https://api.tomtom.com/search/2/geocode/${str}.json?limit=1&language=en-US&key=dwnHP6iVdrF1BBg428u08xVJ4t3gGRln`
    );
  });
}

function getJSON(url) {
  fetch(url)
    .then(response => response.json())
    .then(function (data) {
      console.log(data.results);
      let lat = +data.results[0].position.lat;
      let lon = +data.results[0].position.lon;
      coords.push([lat, lon]);
    });
}
function addMarker(arr) {
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    console.log(item);
    new L.marker(item).addTo(mymap);
  }
}
const delayLoop = (fn, delay) => {
  return (x, i) => {
    setTimeout(() => {
      fn(x);
    }, i * delay);
  };
};
