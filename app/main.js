define(["require", "exports", "tslib", "esri/Map", "esri/views/MapView", "esri/widgets/Legend", "esri/widgets/Home", "esri/smartMapping/symbology/relationship", "esri/smartMapping/renderers/relationship", "./layerUtils", "esri/symbols"], function (require, exports, tslib_1, EsriMap, MapView, Legend, Home, relationshipSchemes, relationshipRendererCreator, layerUtils_1, symbols_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    (function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        function createRelationshipRenderer() {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var params;
                return tslib_1.__generator(this, function (_a) {
                    params = {
                        layer: layerUtils_1.tract,
                        view: view,
                        field1: {
                            field: field1Select.value,
                            label: createLabels(field1Select.value)
                        },
                        field2: {
                            field: field2Select.value,
                            label: createLabels(field2Select.value)
                        },
                        relationshipScheme: relationshipSchemes.getSchemeByName({
                            name: colorSelect.value,
                            geometryType: "polygon"
                        })
                    };
                    return [2, relationshipRendererCreator.createRenderer(params)];
                });
            });
        }
        function applyRenderer(response) {
            var renderer = response.renderer;
            var uniqueValueInfos = response.renderer.uniqueValueInfos.map(function (info) {
                var oldSymbol = info.symbol;
                var newSymbol = oldSymbol;
                switch (info.value) {
                    case "HH":
                        info.label = "High " + createLabels(field1Select.value) + ", High " + createLabels(field2Select.value);
                        break;
                    case "HL":
                        info.label = "High " + createLabels(field1Select.value) + ", Low " + createLabels(field2Select.value);
                        break;
                    case "LH":
                        info.label = "Low " + createLabels(field1Select.value) + ", High " + createLabels(field2Select.value);
                        break;
                    case "LL":
                        info.label = "Low " + createLabels(field1Select.value) + ", Low " + createLabels(field2Select.value);
                        break;
                }
                return info;
            });
            renderer.defaultSymbol = new symbols_1.SimpleFillSymbol({
                color: "rgba(128, 128, 128, 0)",
                outline: new symbols_1.SimpleLineSymbol({
                    color: "rgba(128,128,128, 0.5)",
                    width: 0.5
                })
            });
            renderer.uniqueValueInfos = uniqueValueInfos;
            layerUtils_1.tract.renderer = renderer;
        }
        function createSelectElements(layer) {
            var panel = document.getElementById("panelDiv");
            field1Select = document.createElement("select");
            panel.appendChild(field1Select);
            layer.fields.filter(function (field) {
                var validTypes = ["integer", "double"];
                return validTypes.indexOf(field.type) > -1 && field.name !== "Input_FID";
            }).forEach(function (field, i) {
                var option = document.createElement("option");
                option.value = field.name;
                option.text = field.alias;
                field1Select.appendChild(option);
            });
            field2Select = field1Select.cloneNode(true);
            field1Select.options[0].selected = true;
            field2Select.options[2].selected = true;
            panel.appendChild(field2Select);
            var words = document.createElement("p");
            words.innerText = "Choose a color to display:";
            panel.appendChild(words);
            var colorOptions = [
                "Sunflower Skies",
                "Blueberry Parfait",
                "Grapes on Vines",
                "Forest Canopy",
                "Backyard Garden",
                "Campfire Flames",
                "Cottoncandy Wisps",
                "Jungle Adventure",
                "Mountain Trails",
                "Dawn Rising",
                "Wine Tasting",
                "Cosmic Symphony",
                "Mustard Grove",
                "Morning Amethyst",
                "Marine Heliotrope",
                "Strawberry Tulips",
                "Coconut Palms",
                "Sunset Smudge",
                "Aurora Borealis",
                "Soft Leather",
                "Rose Petals",
                "Seasonal Eggplant",
                "Seventies Poncho",
                "Violet Delights",
                "Winter Canyon",
                "Persian Lime"
            ];
            colorSelect = document.createElement("select");
            panel.appendChild(colorSelect);
            colorOptions.forEach(function (x, i) {
                var optionColor = document.createElement("option");
                optionColor.value = x;
                optionColor.text = x;
                colorSelect.appendChild(optionColor);
            });
            colorSelect.options[8].selected = true;
            field1Select.classList.add("esri-widget");
            field2Select.classList.add("esri-widget");
            colorSelect.classList.add("esri-widget");
            field1Select.addEventListener("change", selectListener);
            field2Select.addEventListener("change", selectListener);
            colorSelect.addEventListener("change", selectListener);
        }
        function changeRendererLabels(renderer, showDescriptiveLabels) {
            var numClasses = renderer.authoringInfo.numClasses;
            var field1max = renderer.authoringInfo.field1.classBreakInfos[numClasses - 1].maxValue;
            var field2max = renderer.authoringInfo.field2.classBreakInfos[numClasses - 1].maxValue;
            renderer.uniqueValueInfos.forEach(function (info) {
                switch (info.value) {
                    case "HH":
                        info.label = showDescriptiveLabels ? "Test, Test" : "";
                        break;
                    case "HL":
                        info.label = showDescriptiveLabels ? " Test, Test" : field1max.toLocaleString();
                        break;
                    case "LH":
                        info.label = showDescriptiveLabels ? "Test, Test" : field2max.toLocaleString();
                        break;
                    case "LL":
                        info.label = showDescriptiveLabels ? " Test, Test" : "0";
                        break;
                }
            });
            return renderer;
        }
        function selectListener() {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var relationshipResponse;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, createRelationshipRenderer()];
                        case 1:
                            relationshipResponse = _a.sent();
                            applyRenderer(relationshipResponse);
                            return [2];
                    }
                });
            });
        }
        function createLabels(value) {
            var label = null;
            switch (value) {
                case "Pop_Total":
                    label = "Total Population";
                    break;
                case "HH_Total":
                    label = "Total Number of Households";
                    break;
                case "HU_Total":
                    label = "Total Number of Housing Units";
                    break;
                case "Pop_White":
                    label = "White Population";
                    break;
                case "Pop_Black":
                    label = "Black Population";
                    break;
                case "Pop_Asian":
                    label = "Asian Population";
                    break;
                case "Pop_Other":
                    label = "Other Population";
                    break;
                case "Low":
                    label = "Number of Low-Income Persons";
                    break;
                case "Lowmod":
                    label = "Number of Low & Moderate Income Persons";
                    break;
                case "Lmmi":
                    label = "Number of Low, Moderate, & Median Income Persons";
                    break;
                case "Lowmod_pct":
                    label = "Percent of Low & Moderate Income Persons";
                    break;
            }
            return label;
        }
        var map, view, legend, showDescriptiveLabelsElement, relationshipResponse, field1Select, field2Select, colorSelect;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    map = new EsriMap({
                        basemap: "gray-vector"
                    });
                    view = new MapView({
                        map: map,
                        container: "viewDiv",
                        center: [-95.97722230077761, 29.747631384641796],
                        scale: 1300000,
                        constraints: {
                            snapToZoom: false
                        }
                    });
                    map.add(layerUtils_1.tract);
                    legend = new Legend({
                        view: view,
                        container: "legendDiv"
                    });
                    view.ui.add("infoDiv", "bottom-left");
                    view.ui.add(new Home({ view: view }), "top-left");
                    view.ui.add("panelDiv", "top-right");
                    return [4, view.when()];
                case 1:
                    _a.sent();
                    return [4, layerUtils_1.tract.when()];
                case 2:
                    _a.sent();
                    createSelectElements(layerUtils_1.tract);
                    showDescriptiveLabelsElement = document.getElementById("descriptive-labels");
                    showDescriptiveLabelsElement.addEventListener("change", function () {
                        var oldRenderer = layerUtils_1.tract.renderer;
                        var newRenderer = oldRenderer.clone();
                        layerUtils_1.tract.renderer = changeRendererLabels(newRenderer, showDescriptiveLabelsElement.checked);
                    });
                    return [4, createRelationshipRenderer()];
                case 3:
                    relationshipResponse = _a.sent();
                    applyRenderer(relationshipResponse);
                    return [2];
            }
        });
    }); })();
});
//# sourceMappingURL=main.js.map