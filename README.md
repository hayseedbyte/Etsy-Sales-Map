# Wildbot Etsy Sales Map

The Wildbot Sales Map allows you to upload CSV files of your orders from Etsy. A marker is placed everywhere you've shipped an order.

## Usage

- Log in to Etsy Shop Manager.
- Go to Settings > Options > Download Data.
- Under "CSV TYPE" choose "ORDERS".
- Pick the Year you want to map
- To get all the orders for that year, leave the month blank

If you want to map all your orders, and you've been selling on Etsy for multiple years, you'll have to download a separate CSV for each year.

To show your orders on the map, click **_Upload CSV Files_** and hold down CTRL to select multiple files. Once you've selected all your csv files from Etsy, click **_open_**.

Finally, click **_Submit_** and your markers will show up on the map.

You can click the printer icon in the top right corner of the map to download an image of your map.

Regions will be shaded based on the number of orders you've shipped to customers there. For the really small regions, a marker will show on the map. The US and Canada are divided into states/provinces. Hovering the cursor over the region will show it's name and the number of orders in a box on the right. Total orders are displayed at the top.

## Acknowledgements

- [Leaflet by Volodymyr Agafonkin](https://leaflet.com) :ukraine:
- [Leaflet BigImage by pasichnykvasyl](https://github.com/pasichnykvasyl/Leaflet.BigImage)
- [PapaParse](https://www.papaparse.com/)

### GeoJson Data By

- <https://cplx.vm.uni-freiburg.de/storage/enroute-GeoJSONv002/Europe/>
- <https://covid.tou.it/assets/geojson/>
- [TopoJson](https://github.com/topojson/world-atlas)

### Other Data By

- [Map Tiles by Carto.com](https://carto.com/attributions)
- [OpenStreetMap](http://openstreetmap.org)
