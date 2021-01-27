import FeatureLayer = require("esri/layers/FeatureLayer");
import SimpleRenderer = require("esri/renderers/SimpleRenderer");
import { SimpleFillSymbol, SimpleLineSymbol } from "esri/symbols";

export const tract = new FeatureLayer({
    url: "https://services1.arcgis.com/Z6SBWLWGRRejblAA/arcgis/rest/services/VulnerablePopulationDensity/FeatureServer/0",
    renderer: new SimpleRenderer({
        symbol: new SimpleFillSymbol({
            color: "rgba(8, 27, 71, 0)",
            outline: new SimpleLineSymbol({
                color: "rgba(8, 27, 71, 0.45)",
                width: 1
            })
        })
    }),
    outFields: ["*"],
    title: "Vulnerable Population (3-sq mile grid)",
    blendMode: "multiply"
});