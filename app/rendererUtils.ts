import relationshipRendererCreator = require("esri/smartMapping/renderers/relationship");
import FeatureLayer = require("esri/layers/FeatureLayer");
import MapView = require("esri/views/MapView");
import relationshipSchemes = require("esri/smartMapping/symbology/relationship");

interface RelationshipRendererParmas{
    layer: FeatureLayer,
    field1: string,
    field2: string,
    view: MapView
}

export async function createRelationshipRenderer(params: RelationshipRendererParmas){
    const { layer, field1, field2, view } = params;

    const props = {
        layer,
        view,
        field1,
        field2,
        focus: "HH",
        defaultSymbolEnabled: false
    };

    relationshipRendererCreator.createRenderer({
        layer,
        view,
        field1: {
            field: field1,
            label: "Earning Greater than $3,333 per month"
        },
        field2: {
            field: field2,
            label: "Less than High School Education"
        },
        focus: "HH",
        defaultSymbolEnabled: false,
        outlineOptimizationEnabled: true,
        relationshipScheme: relationshipSchemes.getSchemeByName({
            name: "Mountain Trails",
            geometryType: "polygon"
        })
    })
        .then((response) => {
            console.log(response);
            layer.renderer = response.renderer
        });
}

// secondarySchemes: Array(26)
// 0:
// id: "default/gray-vector/relationship-brewer-yellow-blue-black"
// name: "Sunflower Skies"
// tags: (3) ["colorblind-friendly", "relationship", "light"]
// colorsForClassBreaks: (3) [{…}, {…}, {…}]
// noDataColor: r {r: 170, g: 170, b: 170, a: 1}
// outline: {color: r, width: "1px"}
// opacity: 0.8
// __proto__: Object
// 1: {id: "default/gray-vector/relationship-brewer-pink-blue-purple", name: "Blueberry Parfait", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 2: {id: "default/gray-vector/relationship-purple-green-blue", name: "Grapes on Vines", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 3: {id: "default/gray-vector/relationship-blue-green-purple", name: "Forest Canopy", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 4: {id: "default/gray-vector/relationship-blue-orange-green", name: "Backyard Garden", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 5: {id: "default/gray-vector/relationship-mustard-blue-wine", name: "Campfire Flames", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 6: {id: "default/gray-vector/relationship-pink-blue-purple", name: "Cottoncandy Wisps", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 7: {id: "default/gray-vector/relationship-olive-blue-green", name: "Jungle Adventure", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 8: {id: "default/gray-vector/relationship-yellow-cyan-blue", name: "Mountain Trails", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 9: {id: "default/gray-vector/relationship-blue-pink-purple", name: "Dawn Rising", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 10: {id: "default/gray-vector/relationship-purple-green-wine", name: "Wine Tasting", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 11: {id: "default/gray-vector/relationship-blue-peach-purple", name: "Cosmic Symphony", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 12: {id: "default/gray-vector/relationship-mint-mustard-green", name: "Mustard Grove", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 13: {id: "default/gray-vector/relationship-purple-mustard-darkpurple", name: "Morning Amethyst", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 14: {id: "default/gray-vector/relationship-blue-orange-purple", name: "Marine Heliotrope", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 15: {id: "default/gray-vector/relationship-pink-periwinkle-violet", name: "Strawberry Tulips", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 16: {id: "default/gray-vector/relationship-blue-tan-green", name: "Coconut Palms", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 17: {id: "default/gray-vector/relationship-blue-red-pink", name: "Sunset Smudge", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 18: {id: "default/gray-vector/relationship-blue-green-brightgreen", name: "Aurora Borealis", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 19: {id: "default/gray-vector/relationship-blue-orange-lavender", name: "Soft Leather", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 20: {id: "default/gray-vector/relationship-pink-purple-peach", name: "Rose Petals", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 21: {id: "default/gray-vector/relationship-purple-mustard-eggshell", name: "Seasonal Eggplant", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 22: {id: "default/gray-vector/relationship-blue-brick-green", name: "Seventies Poncho", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 23: {id: "default/gray-vector/relationship-orange-purple-lavender", name: "Violet Delights", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 24: {id: "default/gray-vector/relationship-brown-purple-lilac", name: "Winter Canyon", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// 25: {id: "default/gray-vector/relationship-teal-yellow-lightteal", name: "Persian Lime", tags: Array(3), colorsForClassBreaks: Array(3), noDataColor: r, …}
// length: 26