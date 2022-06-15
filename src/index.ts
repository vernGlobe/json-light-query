/* eslint-disable @typescript-eslint/no-explicit-any */


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

const getTotalValueByObjAttr = (count: number, reqAttr: any, accumulate: any, row: any): number => {

	if (row[reqAttr.reqAttrVal] && row[reqAttr.reqAttrId]) {
		if (accumulate[reqAttr.reqAttrId] === row[reqAttr.reqAttrId]) {
			accumulate[reqAttr.reqAttrVal] = Number(accumulate[reqAttr.reqAttrVal]) + Number(row[reqAttr.reqAttrVal]);
			count++;
		} 
	} 

	return count;
};

const formatTotalByObj = (jsonObjResult: any, reqAttr: any) => {
	const totalVal = jsonObjResult[reqAttr.reqAttrVal];
	const avgVal = jsonObjResult[reqAttr.reqAttrVal]/ (reqAttr.count + 1);
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

export function getTotalByObjAttr(jsonObjArr: any, reqAttrOperation: string, reqAttrId: string, reqAttrVal: string, defaultFormat = true): any {
	const { errMsg,  jsonObjArrClone } = validateReqParams(jsonObjArr);

	let resp: any = null;
	if (errMsg) {
		return errMsg;
	}
	let count = 0;
	const occurences = jsonObjArrClone.reduce((accumulate: any, row: any): any => {
		count = getTotalValueByObjAttr(count, { reqAttrOperation, reqAttrId, reqAttrVal }, accumulate, row);
		return accumulate;
	});

	if (count !== 0) {
		resp = formatTotalByObj(occurences, {defaultFormat, reqAttrId, reqAttrVal, reqAttrOperation, count});
	}

	return resp;
}
