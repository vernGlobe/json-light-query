/* eslint-disable @typescript-eslint/no-explicit-any */

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
 * Get total value for requested attribute name.
 * 
 * @param count - number of json object with the same attribute id.
 * @param reqAttr  - the list of input params attributes.
 * @param accumulate - json object that accumulate the total value.
 * @param row - json object of the json object array from the input parameter.
 * @returns - total number of json object with the same attribute id
 */
const getTotalValueByObjAttr = (count: number, reqAttr: any, accumulate: any, row: any): number => {

	if (row[reqAttr.reqAttrVal] && row[reqAttr.reqAttrId]) {
		if (accumulate[reqAttr.reqAttrId] === row[reqAttr.reqAttrId]) {
			accumulate[reqAttr.reqAttrVal] = Number(accumulate[reqAttr.reqAttrVal]) + Number(row[reqAttr.reqAttrVal]);
			count++;
		} 
	} 

	return count;
};

/**
 * Simplified the format of json object.
 * 
 * @param jsonObjResult - the json object after completed process the requested total/average.
 * @param reqAttr  - the list of input params attributes.
 * @returns - the simplified format/ original format of json object.
 */
const formatTotalByObj = (jsonObjResult: any, reqAttr: any) => {
	const totalVal = jsonObjResult[reqAttr.reqAttrVal];
	const avgVal = jsonObjResult[reqAttr.reqAttrVal]/ (reqAttr.count);
	let resp = jsonObjResult;
	if (!reqAttr.defaultFormat) {
		if (reqAttr.reqAttrOperation === "avg") {
			resp = {
				"id": jsonObjResult[reqAttr.reqAttrId],
				"average": avgVal
			};
		} else {
			resp = {
				"id": jsonObjResult[reqAttr.reqAttrId],
				"total": totalVal
			};
		}
	} else {
		if (reqAttr.reqAttrOperation === "avg") {
			jsonObjResult[reqAttr.reqAttrVal] = avgVal;
		}
	}

	return resp;
};

/**
 * Retrieve the total or average value from json array.
 * 
 * @param jsonObjArr - the json array to extract the total/average amount. Accept the format in JSON object or JSON string.
 * @param reqAttrOperation  - the requested operation either total or average amount.
 * @param reqAttrId - specify the attribute name for the id of the object in each json array.
 * @param reqAttrVal - specify the attribute name to get the total or average value.
 * @param defaultFormat - specify the json object format to have the same attributes name as object in jsonObjArr.
 * @returns - json object
 */
export function getTotalOrAverageByObjAttr(jsonObjArr: any, reqAttrOperation: "sum"|"avg", reqAttrId: string, reqAttrVal: string, defaultFormat: boolean): any {
	const { errMsg,  jsonObjArrClone } = validateReqParams(jsonObjArr);

	let resp: any = null;
	if (errMsg) {
		return errMsg;
	}
	let count = 1;
	const occurences = jsonObjArrClone.reduce((accumulate: any, row: any): any => {
		count = getTotalValueByObjAttr(count, { reqAttrOperation, reqAttrId, reqAttrVal }, accumulate, row);
		return accumulate;
	});

	if (count !== 1) {
		resp = formatTotalByObj(occurences, {defaultFormat, reqAttrId, reqAttrVal, reqAttrOperation, count});
	}

	return resp;
}
