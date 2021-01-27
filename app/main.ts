import esri = __esri;

import EsriMap = require("esri/Map");
import MapView = require("esri/views/MapView");
import Legend = require("esri/widgets/Legend");
import Home = require("esri/widgets/Home");
import FeatureLayer = require("esri/layers/FeatureLayer");

import relationshipSchemes = require("esri/smartMapping/symbology/relationship");
import relationshipRendererCreator = require("esri/smartMapping/renderers/relationship");

import { tract } from "./layerUtils";
import { SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol } from "esri/symbols";
import { UniqueValueRenderer } from "esri/rasterRenderers";


( async () => {
    const map = new EsriMap({
        basemap: "gray-vector"
    });

    const view = new MapView({
        map,
        container: "viewDiv",
        center: [-95.97722230077761, 29.747631384641796],
        scale: 1300000,
        constraints: {
            snapToZoom: false
        }
    });

    map.add(tract);

    const legend = new Legend({
        view,
        container: "legendDiv"
    });
    view.ui.add("infoDiv", "bottom-left");

    view.ui.add( new Home({ view }), "top-left");
    view.ui.add("panelDiv", "top-right");

    await view.when();
    await tract.when();

    createSelectElements(tract);

    const showDescriptiveLabelsElement = document.getElementById("descriptive-labels") as HTMLInputElement;
    showDescriptiveLabelsElement.addEventListener("change", () => {
        const oldRenderer = tract.renderer as UniqueValueRenderer;
        const newRenderer = oldRenderer.clone();
        tract.renderer = changeRendererLabels(newRenderer, showDescriptiveLabelsElement.checked);
    });

    const relationshipResponse = await createRelationshipRenderer();
    applyRenderer(relationshipResponse);

    let field1Select: HTMLSelectElement;
    let field2Select: HTMLSelectElement;
    let colorSelect: HTMLSelectElement;


    //Create the relationship renderer
    async function createRelationshipRenderer(){

        const params = {
            layer: tract,
            view,
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

        return relationshipRendererCreator.createRenderer(params);
    }

    function applyRenderer(response: esri.relationshipRendererResult){
        var renderer = response.renderer;

        var uniqueValueInfos = response.renderer.uniqueValueInfos.map((info) => {
            const oldSymbol = info.symbol;
            const newSymbol = oldSymbol as SimpleMarkerSymbol;

            switch (info.value){
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

        renderer.defaultSymbol = new SimpleFillSymbol({
            color: "rgba(128, 128, 128, 0)",
            outline: new SimpleLineSymbol({
                color: "rgba(128,128,128, 0.5)",
                width: 0.5
            })
        });

        renderer.uniqueValueInfos = uniqueValueInfos;

        tract.renderer = renderer;
    }

    function createSelectElements(layer: FeatureLayer){
        const panel = document.getElementById("panelDiv");
        field1Select = document.createElement("select");
        panel.appendChild(field1Select);

        layer.fields.filter((field) => {
            const validTypes = [ "integer", "double" ];
            return validTypes.indexOf(field.type) > -1 && field.name !== "Input_FID";
        }).forEach((field, i) => {
            const option = document.createElement("option");
            option.value = field.name;
            option.text = field.alias;
            field1Select.appendChild(option);
        });

        field2Select = field1Select.cloneNode(true) as HTMLSelectElement;
        field1Select.options[0].selected = true;
        field2Select.options[2].selected = true;
        panel.appendChild(field2Select);

        const words = document.createElement("p");
        words.innerText = "Choose a color to display:";
        panel.appendChild(words);

        let colorOptions = [
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

        colorOptions.forEach((x, i) => {
            const optionColor = document.createElement("option");
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

    function changeRendererLabels(renderer: UniqueValueRenderer, showDescriptiveLabels: boolean): UniqueValueRenderer {
        const numClasses = renderer.authoringInfo.numClasses;
        const field1max = renderer.authoringInfo.field1.classBreakInfos[ numClasses-1 ].maxValue;
        const field2max = renderer.authoringInfo.field2.classBreakInfos[ numClasses-1 ].maxValue;

        renderer.uniqueValueInfos.forEach((info: esri.UniqueValueInfo) => {
            switch (info.value){
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

    async function selectListener(){
        const relationshipResponse = await createRelationshipRenderer();
        applyRenderer(relationshipResponse);
    }

    function createLabels(value: string){
        let label: string = null;

        switch(value){
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

})();


// const map = new EsriMap({
//     basemap: "gray-vector"
// });

// const view = new MapView({
//     map,
//     container: "viewDiv",
//     center: [-95.97722230077761, 29.747631384641796],
//     scale: 1300000,
//     constraints: {
//         snapToZoom: false
//     }
// });

// map.add(tract);

// createRelationshipRenderer({
//     layer: tract,
//     field1: "earn3",
//     field2: "edu1",
//     view
// });