import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Group as LayerGroup, Tile as TileLayer } from "ol/layer";
import { getWidth, getTopLeft } from "ol/extent";
import { get as getProjection } from "ol/proj";
import { OSM } from "ol/source";
import Stamen from "ol/source/Stamen";
import WMTS from "ol/source/WMTS";
import LayerSwitcher from "ol-layerswitcher";
import WMTSTileGrid from "ol/tilegrid/WMTS";

var projection = getProjection("EPSG:4326");
var projectionExtent = projection.getExtent();
var size = getWidth(projectionExtent) / 256;
var resolutions = new Array(18);
var matrixIds = new Array(18);
for (var z = 0; z < 18; ++z) {
  // generate resolutions and matrixIds arrays for this WMTS
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z;
}

var map = new Map({
  layers: [
    new LayerGroup({
      // A layer must have a title to appear in the layerswitcher
      title: "Base maps",
      layers: [
        new LayerGroup({
          // A layer must have a title to appear in the layerswitcher
          title: "Water color with labels",
          // Setting the layers type to 'base' results
          // in it having a radio button and only one
          // base layer being visibile at a time
          type: "base",
          // Setting combine to true causes sub-layers to be hidden
          // in the layerswitcher, only the parent is shown
          combine: true,
          visible: false,
          layers: [
            new TileLayer({
              source: new Stamen({
                layer: "watercolor"
              })
            }),
            new TileLayer({
              source: new Stamen({
                layer: "terrain-labels"
              })
            })
          ]
        }),
        new TileLayer({
          // A layer must have a title to appear in the layerswitcher
          title: "OSM",
          // Again set this layer as a base layer
          type: "base",
          visible: true,
          source: new OSM(),
          opacity: 0.7
        })
      ]
    }),
    new LayerGroup({
      // A layer must have a title to appear in the layerswitcher
      title: "Mapas de Suelos",
      fold: "open",
      layers: [
        new TileLayer({
          title: "Plancha 208",
          visible: false,
          source: new WMTS({
            attributions:
              'Tiles © <a href="geiper.udistrital.edu.co">GEIPER</a>',
            url: "http://localhost:80/cgi-bin/qgis_mapserv.fcgi.exe?",
            layer: "208cor",
            matrixSet: "EPSG:4326",
            format: "image/png",
            projection: projection,
            tileGrid: new WMTSTileGrid({
              origin: getTopLeft(projectionExtent),
              resolutions: resolutions,
              matrixIds: matrixIds
            }),
            style: "default"
          })
        }),
        new TileLayer({
          title: "Plancha 209",
          visible: false,
          source: new WMTS({
            attributions:
              'Tiles © <a href="geiper.udistrital.edu.co">GEIPER</a>',
            url: "http://localhost:80/cgi-bin/qgis_mapserv.fcgi.exe?",
            layer: "209cor",
            matrixSet: "EPSG:4326",
            format: "image/png",
            projection: projection,
            tileGrid: new WMTSTileGrid({
              origin: getTopLeft(projectionExtent),
              resolutions: resolutions,
              matrixIds: matrixIds
            }),
            style: "default"
          })
        }),
        new TileLayer({
          title: "Plancha 229",
          visible: false,
          source: new WMTS({
            attributions:
              'Tiles © <a href="geiper.udistrital.edu.co">GEIPER</a>',
            url: "http://localhost:80/cgi-bin/qgis_mapserv.fcgi.exe?",
            layer: "229cor",
            matrixSet: "EPSG:4326",
            format: "image/png",
            projection: projection,
            tileGrid: new WMTSTileGrid({
              origin: getTopLeft(projectionExtent),
              resolutions: resolutions,
              matrixIds: matrixIds
            }),
            style: "default"
          })
        })
      ]
    })
  ],
  target: "map",
  view: new View({
    center: [-8248582, 503697],
    zoom: 8.5
  })
});

var layerSwitcher = new LayerSwitcher({
  tipLabel: "Légende" // Optional label for button
});
map.addControl(layerSwitcher);
