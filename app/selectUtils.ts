import FeatureLayer = require("esri/layers/FeatureLayer");

let field1Select: HTMLSelectElement;
let field2Select: HTMLSelectElement;

export function createSelectElements(layer: FeatureLayer){
    console.log(layer.fields);
    const panel = document.getElementById("panelDiv");
    field1Select = document.createElement("select");
    panel.appendChild(field1Select);

    layer.fields.filter((field) => {
        const validTypes = [ "integer", "double" ];
        return validTypes.indexOf(field.type) > -1 && field.name !== "Tract";
    }).forEach((field, i) => {
        const option = document.createElement("option");
        option.value = field.name;
        option.text = field.alias;
        field1Select.appendChild(option);
    });

    field2Select = field1Select.cloneNode(true) as HTMLSelectElement;
    field1Select.options[11].selected = true;
    field2Select.options[16].selected = true;
    panel.appendChild(field2Select);

    field1Select.classList.add("esri-widget");
    field2Select.classList.add("esri-widget");

    // field1Select.addEventListener("change", selectListener);
    // field2Select.addEventListener("change", selectListener);
}