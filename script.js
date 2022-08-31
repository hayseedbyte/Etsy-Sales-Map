'use strict';
//* Map

const mymap = L.map(
  'mapid',
  {
    minZoom: 2,
    maxZoom: 5,
    maxBounds: [
      [90, -180],
      [-90, 180],
    ],
  },
  { doubleClickZoom: false }
).locate({
  setView: true,
});

const myIcon = L.icon({
  iconUrl:
    'data:img/png;base64,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',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
  popupAnchor: [0, -39],
});
mymap.addControl(new L.Control.Fullscreen());
L.control.BigImage({ position: 'topright' }).addTo(mymap);
L.control.textbox = L.Control.extend({
  onAdd: function (mymap) {
    const text = L.DomUtil.create('div');
    text.id = 'order-text';
    text.innerHTML = '<strong></strong>';
  },
});

//* Variables/Constants
const items = [];
const contents = [];
const data = [];
const form = document.getElementById('fileForm');
const csvFile = document.getElementById('csvFile');
const submit = document.getElementById('submit');
const instructions = document.getElementById('instructions');
const insModal = document.getElementById('insModal');
const modal = document.getElementById('modal');
const list = document.getElementById('list');
const total = document.getElementById('total');
const coords = [];
const places = [];
const info = [];
const shipCountries = [];
let flattened = [];
let markers = 0;
const unique = [];
let coordsObj;
const legend = [];
const listData = [];
const locations = [];
let startDate, endDate, year, month, start, end;
const regionsShipped = [];
const monthFull = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
csvFile.addEventListener('input', function (e) {
  e.preventDefault();
  const files = csvFile.files;
  return new Promise(resolve => {
    resolve(parseFiles(files, data));
    return data;
  })
    .then(data => flatten(data))
    .then(flattened => getLocations(flattened))
    .then(locations => getPlaces(locations))
    .then(places => mapOrders(places))
    .then(regions => getShipped(regions))
    .then(regionsShipped => addMarker(regionsShipped))
    .then(regionsShipped => getListData(regionsShipped))
    .then(listData => sumOrders(listData))
    .then(totals => sumTotal(totals))
    .then(sum => addSum(sum))
    .catch(error => console.error(error));
});
instructions.addEventListener('click', function (e) {
  e.preventDefault;
  if (modal.className === 'hidden') {
    modal.className = 'shown';
  } else {
    modal.className = 'hidden';
  }
});
modal.addEventListener('click', function (e) {
  e.preventDefault;
  if (modal.className === 'shown') {
    modal.className = 'hidden';
  }
});
submit.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Form Submitted');
  const merged = new Promise(function (resolve, reject) {
    resolve((flattened = data.flat()));
    return flattened;
  })
    .then(flattened => getLocations(flattened))
    .then(locations => getPlaces(locations))
    .then(places => mapOrders(places))
    .then(regions => getShipped(regions))
    .then(regionsShipped => addMarker(regionsShipped))
    .then(regionsShipped => getListData(regionsShipped))
    .then(listData => sumOrders(listData))
    .then(totals => sumTotal(totals))
    .then(sum => addSum(sum))
    .catch(error => console.error(error));
});
function readFile(file, arr) {
  const reader = new FileReader();
  reader.onload = function (event) {
    event.preventDefault();
    return new Promise(resolve => {
      Papa.parse(file, {
        header: true,
        complete: results => {
          resolve(results.data);
          let _ = results.data.pop();
          return arr.push(results.data);
        },
      });
    });
  };
  reader.readAsText(file);
}

function parseFiles(arr, arr2) {
  return new Promise(resolve => {
    for (let i = 0; i < arr.length; i++) {
      readFile(arr[i], arr2);
    }
    resolve(arr2);
    return arr2;
  });
}

function flatten(arr) {
  flattened = arr.flat();
  return flattened;
}

function sumTotal(arr) {
  const sum = arr.reduce((partial_sum, a) => partial_sum + a, 0);
  return sum;
}
function sumOrders(arr) {
  const totals = [];
  for (let i = 0; i < arr.length; i++) {
    totals.push(arr[i][1]);
  }
  return totals;
}

function addSum(int) {
  total.innerHTML += `Total Orders: ${int}`;
}

function getLocations(orders) {
  console.log('orders', orders);
  let data = orders;
  console.log('data', data);
  let int = data.length - 2;
  let item = data[int][''];
  startDate = data[int]['Sale Date'];
  endDate = data[0]['Sale Date'];
  start = getDates(startDate);
  end = getDates(endDate);
  for (let i = 0; i < data.length; i++) {
    const ship = data[i]['Ship Country'];
    const country = countryCode(ship);
    const state = acronymToFullName(data[i]['Ship State']);
    let ste;
    shipCountries.push(ship);
    if (ship === 'United States') {
      ste = 'US' + data[i]['Ship State'];
      locations.push([`${country}`, `${ste}`]);
      info.push([`${state}, ${country}`]);
    } else if (ship === 'Canada') {
      ste = 'CA' + data[i]['Ship State'];
      locations.push([`${country}`, `${ste}`]);
      info.push([`${state}, ${country}`]);
    } else {
      locations.push([`${country}`, `${country}`]);
      info.push([`${country}`]);
    }
  }
  return locations;
}
const getDates = function (str) {
  let arr = str.split('/');
  year = +arr[2];
  month = monthFull[+arr[0] - 1];
  return `${year}`;
};
const getPlaces = function (locations) {
  for (let i = 0; i < locations.length; i++) {
    const el = locations[i];
    const loc = el[1];
    if (loc !== undefined) {
      places.push(loc);
    }
  }
  return places;
};

const mapOrders = function (places) {
  for (let i = 0; i < places.length; i++) {
    const el = places[i];
    const region = regions.find(region => region.code === el);
    if (region.orders != undefined) {
      region.orders++;
    }
  }
  return regions;
};

function getShipped(arr) {
  regionsShipped.push(
    regions.filter(obj => {
      return obj.orders >= 1;
    })
  );
  return regionsShipped;
}

function addMarker(arr) {
  const item = arr[0];
  for (let i = 0; i < item.length; i++) {
    const lat = item[i].lat;
    const lng = item[i].lng;
    markers++;
    L.marker([lat, lng], { icon: myIcon })
      .addTo(mymap)
      .bindPopup(`${item[i].name}, ${item[i].orders}`);
  }
  return arr;
}

function getListData(arr) {
  let item = arr[0];
  for (let i = 0; i < item.length; i++) {
    listData.push([item[i].name, item[i].orders]);
  }
  return listData;
}
