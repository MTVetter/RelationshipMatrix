define(["require", "exports", "tslib", "esri/smartMapping/renderers/relationship", "esri/smartMapping/symbology/relationship"], function (require, exports, tslib_1, relationshipRendererCreator, relationshipSchemes) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createRelationshipRenderer(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var layer, field1, field2, view, props;
            return tslib_1.__generator(this, function (_a) {
                layer = params.layer, field1 = params.field1, field2 = params.field2, view = params.view;
                props = {
                    layer: layer,
                    view: view,
                    field1: field1,
                    field2: field2,
                    focus: "HH",
                    defaultSymbolEnabled: false
                };
                relationshipRendererCreator.createRenderer({
                    layer: layer,
                    view: view,
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
                    .then(function (response) {
                    console.log(response);
                    layer.renderer = response.renderer;
                });
                return [2];
            });
        });
    }
    exports.createRelationshipRenderer = createRelationshipRenderer;
});
//# sourceMappingURL=rendererUtils.js.map