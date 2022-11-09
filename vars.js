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
const places = [];
const info = [];
const shipCountries = [];
let flattened = [];
let markers = 0;
const unique = [];
let coordsObj;
const control = L.control();
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
const smallCountries = [
  'Vatican City',
  'Monaco',
  'Gibraltar',
  'Tokelau',
  'Nauru',
  'Saint Barthelemy',
  'Tuvalu',
  'Macau',
  'Sint Maarten',
  'Saint Martin',
  'Bermuda',
  'San Marino',
  'Guernsey',
  'Anguilla',
  'Montserrat',
  'Jersey',
  'Wallis and Futuna',
  'British Virgin Islands',
  'Liechtenstein',
  'Aruba',
  'Marshall Islands',
  'American Samoa',
  'Cook Islands',
  'Saint Pierre and Miquelon',
  'Niue',
  'Saint Kitts and Nevis',
  'Cayman Islands',
  'Maldives',
  'Malta',
  'Grenada',
  'United States Virgin Islands',
  'Mayotte',
  'Saint Vincent and the Grenadines',
  'Barbados',
  'Antigua and Barbuda',
  'Curacao',
  'Seychelles',
  'Palau',
  'Northern Mariana Islands',
  'Andorra',
  'Guam',
  'Isle of Man',
  'Saint Lucia',
  'Micronesia',
  'Singapore',
  'Tonga',
  'Dominica',
  'Bahrain',
  'Kiribati',
  'Turks and Caicos Islands',
  'Sao Tome and Principe',
  'Hong Kong',
  'Martinique',
  'Faroe Islands',
  'Guadeloupe',
  'Comoros',
  'Mauritius',
  'Reunion',
  'Luxembourg',
  'Samoa',
  'Cape Verde',
  'French Polynesia',
  'Trinidad and Tobago',
  'Brunei',
  'Palestine',
  'Puerto Rico',
  'Cyprus',
  'Lebanon',
  'Gambia',
  'Jamaica',
  'Qatar',
  'Falkland Islands',
  'Vanuatu',
  'Montenegro',
  'Bahamas',
  'Timor Leste',
  'Eswatini',
  'Kuwait',
  'Fiji',
  'New Caledonia',
];
