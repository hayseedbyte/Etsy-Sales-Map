const mymap = L.map('mapid').setView([39.922072, -97.685021], 1);

//**  https://api.tomtom.com/search/2/geocode/query%url%encoded.js?key=dwnHP6iVdrF1BBg428u08xVJ4t3gGRln */
//??  results.position.lat :: results.position.lon

// const markerArray = [];
// let tomTomResult = fetch();
// // 'https://api.tomtom.com/search/2/geocode/1705%20Holiness%20Campground%20Rd%20Cleveland%20GA%2030528-5026%20United%20States.js?limit=1&language=en-US&key=dwnHP6iVdrF1BBg428u08xVJ4t3gGRln'
// // ('https://api.tomtom.com/search/2/geocode/1111%20Street%20Name%20City%20State%20Country.js?limit=1&language=en-US&key=dwnHP6iVdrF1BBg428u08xVJ4t3gGRln');
// markerArray.push(tomTomResult);
// console.log(markerArray);

// const api_url = el;
// async function getapi(url) {
//   const response = await fetch(url);
//   let data = await response();
//   console.log(data);
//   console.log(response);
//   show(data);
// }

const form = document.getElementById('fileForm');
const csvFile = document.getElementById('csvFile');
const geoData = [];
const addresses = [];
const links = [];
const linksFor = [];
const coords = [];
// form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   console.log('Form Submitted');
function markMap(file) {
  const input = file.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const text = event.target.result;
    let data = csvToArray(text);
    console.log(data);

    getGeoData(data, geoData);
    if (geoData.length >= data.length) {
      cleanData(geoData, addresses);
      console.log(addresses);
    }
    if (addresses.length >= geoData.length) {
      getLinksFor(addresses, linksFor);
    }
    if (linksFor.length > 0) {
      coords.push(api(linksFor));
    }
  };
  // console.log(data);
  reader.readAsText(input);
}
// let completed = addresses.length >= geoData.length;
// if (addresses.length > 0) {
//   function makePromise(completed) {
//     return new Promise(function (resolve) {
//       if (completed) {
//         resolve(getLinksFor(addresses, linksFor));
//       }
//     });
//   }
// }

function csvToArray(str, delimiter = ',') {
  const headers = str.slice(0, str.indexOf('\n')).split(delimiter);
  // console.log('h', headers);
  const rows = str.slice(str.indexOf('\n') + 1).split('\n');
  // console.log('r', rows);
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });
  return arr;
}
function cleanData(arr, arr2) {
  arr.forEach(function (str) {
    arr2.push(encodeURIComponent(str));
  });
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('Form Submitted');
  markMap(csvFile);
});

function getGeoData(arr, arr2) {
  arr.forEach(function (el) {
    const shipCity = el['Ship City'];
    const shipCountry = el['Ship Country'];
    const shipState = el['Ship State'];
    const shipZipcode = el['Ship Zipcode'];
    const street1 = el['Street 1'];
    arr2.push(
      `${street1} ${shipCity}, ${shipState}, ${shipZipcode}, ${shipCountry}`
    );
    return arr2;
  });
}
function getLinksFor(arr, arr2) {
  for (let i = 0; i < arr.length; i++) {
    let str = arr[i];
    arr2.push(
      `https://api.tomtom.com/search/2/geocode/${str}.js?limit=1&language=en-US&key=dwnHP6iVdrF1BBg428u08xVJ4t3gGRln`
    );
  }
  console.log(arr2);
}
// function api(arr, arr2) {
//   arr.forEach(async function (el) {
//     const url = el;
//     const response = await fetch(url)
//       .then(response => {
//         return response.json();
//       })
//       .then(
//         arr2.push(
//           response.results.position.lat + ', ' + repsonse.results.position.lon
//         )
//       )
//       .then(console.log(response.results));
//   });
// }
function api(arr) {
  arr.forEach(async function (el) {
    try {
      const response = await fetch(el);
      const lat = JSON.stringify(await response.cb.results[0].position.lat);
      const lon = JSON.stringify(await response.cb.results[0].position.lon);
      const data = lat + ', ' + lon;
      console.log(data);
      console.log(response.json);
      // const coordinates =
      //   data.cb.results.position.lat + ', ' + data.cb.results.position.lon;
      return [lat, lon];
    } catch (error) {
      console.log('error');
    }
  });
}
// {
//     "lat": 39.23616,
//     "lon": -94.90855
// // }
// cb({
//   summary: {
//     query: '451 ash ln lansing ks 66043 united states',
//     queryType: 'NON_NEAR',
//     queryTime: 4,
//     numResults: 1,
//     offset: 0,
//     totalResults: 1,
//     fuzzyLevel: 1,
//   },
//   results: [
//     {
//       type: 'Point Address',
//       id: 'US/PAD/p0/38007996',
//       score: 15.6196298599,
//       address: {
//         streetNumber: '451',
//         streetName: 'Ash Lane',
//         municipality: 'Lansing',
//         countrySecondarySubdivision: 'Leavenworth',
//         countrySubdivision: 'KS',
//         countrySubdivisionName: 'Kansas',
//         postalCode: '66043',
//         extendedPostalCode: '66043-6286',
//         countryCode: 'US',
//         country: 'United States',
//         countryCodeISO3: 'USA',
//         freeformAddress: '451 Ash Lane, Lansing, KS 66043',
//         localName: 'Lansing',
//       },
//       position: {
//         lat: 39.23616,
//         lon: -94.90855,
//       },
//       viewport: {
//         topLeftPoint: {
//           lat: 39.23706,
//           lon: -94.90971,
//         },
//         btmRightPoint: {
//           lat: 39.23526,
//           lon: -94.90739,
//         },
//       },
//       entryPoints: [
//         {
//           type: 'main',
//           position: {
//             lat: 39.23642,
//             lon: -94.90854,
//           },
//         },
//       ],
//     },
//   ],
// });
