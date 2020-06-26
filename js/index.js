//Se importan las librerias necesarias según documentación de OL
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { getWidth } from "ol/extent";
import TileLayer from "ol/layer/Tile";
import { get as getProjection } from "ol/proj";
import OSM from "ol/source/OSM";

//Projection: Definimos el código de la proyección con la que la que JS trabajará ->
var projection = getProjection("EPSG:4326");
//Se extrae la extensión de la proyección ->
var projectionExtent = projection.getExtent();
var size = getWidth(projectionExtent) / 256;
var resolutions = new Array(18);
var matrixIds = new Array(18);
for (var z = 0; z < 18; ++z) {
  // Generar los arrays de las resoluciones por cada matrix id y nivel de zoom (Openlayers Beginner's Guide)
  resolutions[z] = size / Math.pow(2, z);

  // Generar los arrays de los matrixID para el WMTS
  matrixIds[z] = z;
}

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
      opacity: 0.7
    })
    // new TileLayer({
    //   source: new WMTS({
    //     attributions: 'Tiles © <a href="geiper.udistrital.edu.co">GEIPER</a>',
    //     url: "http://localhost:80/cgi-bin/qgis_mapserv.fcgi.exe?SERVICE=WMTS",
    //     layer: "ERS1_Escena1",
    //     matrixSet: "EPSG:4326",
    //     format: "image/png",
    //     projection: projection,
    //     tileGrid: new WMTSTileGrid({
    //       origin: getTopLeft(projectionExtent),
    //       resolutions: resolutions,
    //       matrixIds: matrixIds
    //     }),
    //     style: "default",
    //     wrapX: true
    //   })
    // })
  ],
  target: "map",
  view: new View({
    center: [-8248582, 503697],
    zoom: 5.5
  })
});
