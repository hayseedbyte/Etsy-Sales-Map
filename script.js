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
  iconUrl: 'pin-24x34-wb3d.png',
  iconSize: [24, 34],
  iconAnchor: [12, 34],
  popupAnchor: [0, -34],
});

L.control.BigImage({ position: 'topright' }).addTo(mymap);

//* Variables/Constants
const contents = [];
const data = [];
const merge = document.getElementById('merge');
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
csvFile.addEventListener('change', function (e) {
  e.preventDefault();
  const files = csvFile.files;
  return new Promise(resolve => {
    parseFiles(files, data);
    return data;
  });
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
    resolve((flattened = data.flat(3)));
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
    // .then(listData => addContent(listData))
    .catch(error => console.error(error));
});
function getUnique(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr);
    console.log(arr[i]);
    unique.push(...new Set(arr));
  }
  return unique;
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
// function addSum(int) {
//   +start === +end
//     ? (total.innerHTML += `20${start}: ${int} orders.`)
//     : (total.innerHTML += `20${start} to 20${end}: ${int} orders.`);
// }
function addSum(int) {
  total.innerHTML += `🤑Total Orders: ${int} 🎉`;
}
// function addContent(arr) {
//   arr.forEach(function (el) {
//     list.innerHTML += `${el[0]}----${el[1]}<br>`;
//   });
// }
function getLocations(orders) {
  console.log('orders', orders);
  let data = orders;
  console.log('data', data);
  // const locations = [];
  let int = data.length - 2;
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
  // let _pop = places.pop();
  for (let i = 0; i < places.length; i++) {
    // console.log(places[i]);
    const el = places[i];
    // console.log(el);
    const region = regions.find(region => region.code === el);
    if (region.orders != undefined) {
      region.orders++;
    }
  }
  return regions;
  // return coords.shift();
};
function getCoords(arr) {
  const latlng = [arr.lat, arr.lng];
  coords.push([arr.name, arr.orders, latlng]);
  legend.push([arr.name, arr.orders]);
}
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

function getInfo(arr) {
  const item = arr[0];
  for (let i = 0; i < arr.length; i++) {
    const place = item[i];
    const name = place.name;
    const orders = place.orders;
    info.push([`${place}`, `${name}`, `${orders}`]);
  }
  return info;
}

function flatten(arr, int) {
  return arr.flat(int);
}

function readFile(file, arr) {
  const reader = new FileReader();
  reader.onload = function (event) {
    event.preventDefault();
    return new Promise(resolve => {
      Papa.parse(file, {
        header: true,
        complete: results => {
          resolve(results.data);
          let _pop = results.data.pop();
          // console.log(_pop);
          return arr.push(results.data);
        },
      });
    });
  };
  reader.readAsText(file);
}
// function removeDuplicates(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     const key = arr[i][0];
//     // console.log('key', key);
//     const orders = arr[i][1];
//     for (let j = 0; j < unique.length; j++) {
//       // console.log('j', unique[j]);
//       if (!unique[j][0].includes(key)) {
//         unique.push(arr[i]);
//         // console.log('pushed', arr[i]);
//       } else if (unique[j][1] < orders) {
//         unique[j][1] = orders;
//       }
//     }
//   }
//   return unique;
// }
// function objectify(arr) {
//   arr.map(function (item) {
//     return {
//       place: item[0],
//       orders: item[1],
//       latlng: item[2],
//     };
//   });
// }
// function uniqueArray(arr) {
//   return [...new Set(arr)];
// }

function getListData(arr) {
  let item = arr[0];
  for (let i = 0; i < item.length; i++) {
    listData.push([item[i].name, item[i].orders]);
  }
  return listData;
}
