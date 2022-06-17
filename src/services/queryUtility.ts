import { ParamRequestAttr } from "../dataobject/requestType";
import { TotalRespAttr } from "../dataobject/responseType";
/**
 * Validate the input parameter.
 * 
 * @param jsonObjArr - the json array to extract the total/average data.
 * @returns - json object contains error message or requested json array object.
 */
 const validateReqParams = (jsonObjArr: any): any => {
	let errMsg = "";
	let jsonObjArrClone: any = jsonObjArr;
	try {
		if (typeof jsonObjArrClone === "string") {
			jsonObjArrClone = JSON.parse(jsonObjArr);
		}
		if (typeof jsonObjArrClone.length === "undefined" || jsonObjArrClone.length <= 0) {
			errMsg = "The input format not a valid json array(empty array)!";
		}
        
	} catch (err) {
		errMsg = "The input format not a valid json array!";
	}

	return { errMsg,  jsonObjArrClone };
};

/**
 * Get total value by specified Id
 * 
 * @param count - number of json object with the same attribute id.
 * @param reqAttr  - the list of parameters request.
 * @param accumulate - json object that accumulate the total value.
 * @param row - json object of the json object array from the input parameter.
 * @returns - total number of json object with the same attribute id
 */
const getTotalValueById = (count: number, reqAttr: any, accumulate: any, row: any): number => {
	const { idAttrNm, numericAttrNm, idAttrVal } = reqAttr;

	if (row[numericAttrNm] && row[idAttrNm]) {
		if (idAttrVal === accumulate[idAttrNm] && accumulate[idAttrNm] === row[idAttrNm]) {
			accumulate[numericAttrNm] = Number(accumulate[numericAttrNm]) + Number(row[numericAttrNm]);
			count++;
		} 
	} 

	return count;
};

/**
 * Get total value by specified Id
 * 
 * @param count - number of json object.
 * @param reqAttr  - the list of parameters request
 * @param accumulate - json object that accumulate the total value.
 * @param row - json object of the json object array from the input parameter.
 * @returns - total number of json object with the same attribute id
 */
const getTotalValue = (count: number, reqAttr: any, accumulate: any, row: any): number => {
	const { idAttrNm, numericAttrNm, idAttrVal } = reqAttr;

	if (row[numericAttrNm] && row[idAttrNm]) {
		accumulate[numericAttrNm] = Number(accumulate[numericAttrNm]) + Number(row[numericAttrNm]);
		count++;
	} 

	return count;
};

/**
 * Get total value by specified Id
 * 
 * @param count - number of json object with the same attribute id.
 * @param reqAttr  - the list of parameters request.
 * @param accumulate - json object that accumulate the total value.
 * @param row - json object of the json object array from the input parameter.
 * @returns - total number of json object with the same attribute id
 */
const getTotalValueByGroup = (items: any[], reqAttr: any, accumulate: any, row: any): any => {
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
		} else {
			items.push(row);
		}
	} 

	return items;
};

/**
 * Simplified the json object format.
 * 
 * @param jsonObjResult - the json object after completed process the requested total/average.
 * @param reqAttr  - the list of parameters request.
 * @returns - the simplified format/ original format of json object.
 */
const formatTotalByObj = (jsonObjResult: any, reqAttr: any) => {
	const { idAttrNm, numericAttrNm , idAttrVal} = reqAttr;
	const resp: TotalRespAttr = {id: "all", total: jsonObjResult[numericAttrNm]};
	if (idAttrVal) {
		resp.id = jsonObjResult[idAttrNm];
	}
	return resp;
};


export function getTotal(reqParams: ParamRequestAttr): any {
	const { idAttrNm, jsonObjArray, numericAttrNm} = reqParams;
	const { errMsg,  jsonObjArrClone } = validateReqParams(jsonObjArray);

	let resp: any = null;
	if (errMsg) {
		return errMsg;
	}
	let count = 1;
	const occurences = jsonObjArrClone.reduce((accumulate: any, row: any): any => {
		count = getTotalValue(count, { idAttrNm, numericAttrNm }, accumulate, row);
		return accumulate;
	});

	if (count !== 1) {
		resp = formatTotalByObj(occurences, {idAttrNm, numericAttrNm, count});
	}

	return resp;
}

export function getTotalById(reqParams: ParamRequestAttr, idAttrVal: string): any {
	const { idAttrNm, jsonObjArray, numericAttrNm} = reqParams;
	const { errMsg,  jsonObjArrClone } = validateReqParams(jsonObjArray);

	let resp: any = null;
	if (errMsg) {
		return errMsg;
	}
	let count = 1;
	const occurences = jsonObjArrClone.reduce((accumulate: any, row: any): any => {
		count = getTotalValueById(count, { idAttrNm, numericAttrNm, idAttrVal }, accumulate, row);
		return accumulate;
	});

	if (count !== 1) {
		resp = formatTotalByObj(occurences, {idAttrNm, numericAttrNm, count, idAttrVal});
	}

	return resp;
}

export function getTotalByGroup(reqParams: ParamRequestAttr, grpAttrNm: string): any {
	const { idAttrNm, jsonObjArray, numericAttrNm} = reqParams;
	const { errMsg,  jsonObjArrClone } = validateReqParams(jsonObjArray);

	if (errMsg) {
		return errMsg;
	}
	
	const items = [];
	const occurences = jsonObjArrClone.reduce((accumulate: any, row: any): any => {
		getTotalValueByGroup(items, { idAttrNm, numericAttrNm, grpAttrNm }, accumulate, row);
		return accumulate;
	});

	return items;
}

	