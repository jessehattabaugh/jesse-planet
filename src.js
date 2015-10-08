const YOUR_API_KEY = '8994b8108f2a4e4eba0b512942670f2c';

var L = require('leaflet');

var auth = require('planet-client/api/auth');
auth.setKey(YOUR_API_KEY);

var mosaics = require('planet-client/api/mosaics');
mosaics.get('color_balance_mosaic').then(function (data) {

  // First, we identify the range of subdomains
  var subdomainInfo = /{(\d)-(\d)}/.exec(data.links.tiles);
  var subdomains = "";

  // Now we can construct a list of subdomains
  for (var i = parseInt(subdomainInfo[1]); i <= parseInt(subdomainInfo[2]); i++) {
    subdomains += i;
  }

  // And finally, we can add your API key to the urls
  var tileUrl = data.links.tiles.replace(subdomainInfo[0], '{s}')  + '?api_key=' + YOUR_API_KEY;

  // Instantiate Leaflet and add the mosaics to the map
  var map = L.map('map').setView([0, 0], 2);
  L.tileLayer(tileUrl, {
    subdomains: subdomains,
    attribution: 'Imagery &copy; <a href="https://planet.com">Planet Labs</a>',
    maxZoom: 18
  }).addTo(map);
});
