define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var field1Select;
    var field2Select;
    function createSelectElements(layer) {
        console.log(layer.fields);
        var panel = document.getElementById("panelDiv");
        field1Select = document.createElement("select");
        panel.appendChild(field1Select);
        layer.fields.filter(function (field) {
            var validTypes = ["integer", "double"];
            return validTypes.indexOf(field.type) > -1 && field.name !== "Tract";
        }).forEach(function (field, i) {
            var option = document.createElement("option");
            option.value = field.name;
            option.text = field.alias;
            field1Select.appendChild(option);
        });
        field2Select = field1Select.cloneNode(true);
        field1Select.options[11].selected = true;
        field2Select.options[16].selected = true;
        panel.appendChild(field2Select);
        field1Select.classList.add("esri-widget");
        field2Select.classList.add("esri-widget");
    }
    exports.createSelectElements = createSelectElements;
});
//# sourceMappingURL=selectUtils.js.map