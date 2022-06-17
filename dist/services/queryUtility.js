"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalByGroup = exports.getTotalById = exports.getTotal = void 0;
const validateReqParams = (jsonObjArr) => {
    let errMsg = "";
    let jsonObjArrClone = jsonObjArr;
    try {
        if (typeof jsonObjArrClone === "string") {
            jsonObjArrClone = JSON.parse(jsonObjArr);
        }
        if (typeof jsonObjArrClone.length === "undefined" || jsonObjArrClone.length <= 0) {
            errMsg = "The input format not a valid json array(empty array)!";
        }
    }
    catch (err) {
        errMsg = "The input format not a valid json array!";
    }
    return { errMsg, jsonObjArrClone };
};
const getTotalValueById = (count, reqAttr, accumulate, row) => {
    const { idAttrNm, numericAttrNm, idAttrVal } = reqAttr;
    if (row[numericAttrNm] && row[idAttrNm]) {
        if (idAttrVal === accumulate[idAttrNm] && accumulate[idAttrNm] === row[idAttrNm]) {
            accumulate[numericAttrNm] = Number(accumulate[numericAttrNm]) + Number(row[numericAttrNm]);
            count++;
        }
    }
    return count;
};
const getTotalValue = (count, reqAttr, accumulate, row) => {
    const { idAttrNm, numericAttrNm, idAttrVal } = reqAttr;
    if (row[numericAttrNm] && row[idAttrNm]) {
        accumulate[numericAttrNm] = Number(accumulate[numericAttrNm]) + Number(row[numericAttrNm]);
        count++;
    }
    return count;
};
const getTotalValueByGroup = (items, reqAttr, accumulate, row) => {
    const { idAttrNm, numericAttrNm, grpAttrNm } = reqAttr;
    let filterGrpAttrNm = grpAttrNm;
    if (!grpAttrNm) {
        filterGrpAttrNm = idAttrNm;
    }
    if (row[numericAttrNm] && row[filterGrpAttrNm]) {
        if (items.length <= 0) {
            items.push(accumulate);
        }
        const item = items.filter(item => item[filterGrpAttrNm] === row[filterGrpAttrNm]);
        if (item && item.length > 0) {
            item[0][numericAttrNm] = Number(item[0][numericAttrNm]) + Number(row[numericAttrNm]);
        }
        else {
            items.push(row);
        }
    }
    return items;
};
const formatTotalByObj = (jsonObjResult, reqAttr) => {
    const { idAttrNm, numericAttrNm, idAttrVal } = reqAttr;
    const resp = { id: "all", total: jsonObjResult[numericAttrNm] };
    if (idAttrVal) {
        resp.id = jsonObjResult[idAttrNm];
    }
    return resp;
};
function getTotal(reqParams) {
    const { idAttrNm, jsonObjArray, numericAttrNm } = reqParams;
    const { errMsg, jsonObjArrClone } = validateReqParams(jsonObjArray);
    let resp = null;
    if (errMsg) {
        return errMsg;
    }
    let count = 1;
    const occurences = jsonObjArrClone.reduce((accumulate, row) => {
        count = getTotalValue(count, { idAttrNm, numericAttrNm }, accumulate, row);
        return accumulate;
    });
    if (count !== 1) {
        resp = formatTotalByObj(occurences, { idAttrNm, numericAttrNm, count });
    }
    return resp;
}
exports.getTotal = getTotal;
function getTotalById(reqParams, idAttrVal) {
    const { idAttrNm, jsonObjArray, numericAttrNm } = reqParams;
    const { errMsg, jsonObjArrClone } = validateReqParams(jsonObjArray);
    let resp = null;
    if (errMsg) {
        return errMsg;
    }
    let count = 1;
    const occurences = jsonObjArrClone.reduce((accumulate, row) => {
        count = getTotalValueById(count, { idAttrNm, numericAttrNm, idAttrVal }, accumulate, row);
        return accumulate;
    });
    if (count !== 1) {
        resp = formatTotalByObj(occurences, { idAttrNm, numericAttrNm, count, idAttrVal });
    }
    return resp;
}
exports.getTotalById = getTotalById;
function getTotalByGroup(reqParams, grpAttrNm) {
    const { idAttrNm, jsonObjArray, numericAttrNm } = reqParams;
    const { errMsg, jsonObjArrClone } = validateReqParams(jsonObjArray);
    if (errMsg) {
        return errMsg;
    }
    const items = [];
    const occurences = jsonObjArrClone.reduce((accumulate, row) => {
        getTotalValueByGroup(items, { idAttrNm, numericAttrNm, grpAttrNm }, accumulate, row);
        return accumulate;
    });
    return items;
}
exports.getTotalByGroup = getTotalByGroup;
//# sourceMappingURL=queryUtility.js.map