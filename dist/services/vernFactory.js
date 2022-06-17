"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VernFactory = void 0;
const queryUtility_1 = require("./queryUtility");
class VernFactory {
    static getTotal(reqParams) {
        return (0, queryUtility_1.getTotal)(reqParams);
    }
    static getTotalById(reqParams, idAttrVal) {
        return (0, queryUtility_1.getTotalById)(reqParams, idAttrVal);
    }
    static getTotalByGroup(reqParams, grpAttrNm) {
        return (0, queryUtility_1.getTotalByGroup)(reqParams, grpAttrNm);
    }
}
exports.VernFactory = VernFactory;
//# sourceMappingURL=vernFactory.js.map