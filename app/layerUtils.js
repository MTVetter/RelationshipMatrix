define(["require", "exports", "esri/layers/FeatureLayer", "esri/renderers/SimpleRenderer", "esri/symbols"], function (require, exports, FeatureLayer, SimpleRenderer, symbols_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tract = new FeatureLayer({
        url: "https://services1.arcgis.com/Z6SBWLWGRRejblAA/arcgis/rest/services/VulnerablePopulationDensity/FeatureServer/0",
        renderer: new SimpleRenderer({
            symbol: new symbols_1.SimpleFillSymbol({
                color: "rgba(8, 27, 71, 0)",
                outline: new symbols_1.SimpleLineSymbol({
                    color: "rgba(8, 27, 71, 0.45)",
                    width: 1
                })
            })
        }),
        outFields: ["*"],
        title: "Vulnerable Population (3-sq mile grid)",
        blendMode: "multiply"
    });
});
//# sourceMappingURL=layerUtils.js.map