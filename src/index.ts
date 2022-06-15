

const validateReqParams = (jsonObjArr: any): string => {
    let errMsg: string = "";
    try {
        if (typeof jsonObjArr === "string") {
            jsonObjArr = JSON.parse(jsonObjArr);
        }
        if (typeof jsonObjArr.length === "undefined" || jsonObjArr.length <= 0) {
            errMsg = "The input format not a valid json array(empty array)!"
        }
        
    } catch (err) {
        errMsg = "The input format not a valid json array!";
    }

    return errMsg;
};

const getValueByObjAttrOperation = (count: number, reqAttr: any, accumulate: any, row: any): number => {

    switch(reqAttr.reqAttrOperation) {
        case "sum":
            if (row[reqAttr.reqAttrVal] && row[reqAttr.reqAttrId]) {
                if (accumulate[reqAttr.reqAttrId] === row[reqAttr.reqAttrId]) {
                    accumulate[reqAttr.reqAttrVal] = Number(accumulate[reqAttr.reqAttrVal]) + Number(row[reqAttr.reqAttrVal]);
                    count++;
                } 
            } 
            break;
        default:
            // do nothing
    }
    
    return count;
};

const formatTotalByObjResp = (jsonObjResult: any, reqAttr: any) => {
    return {
        "id": jsonObjResult[reqAttr.reqAttrId],
        "total": jsonObjResult[reqAttr.reqAttrVal]
    }
};

export function getTotalByObjAttr(jsonObjArr: any, reqAttrOperation: string, reqAttrId: string, reqAttrVal: string, defaultFormat: boolean = true) {
    const errMsg = validateReqParams(jsonObjArr);
    let resp: any = null;
    if (errMsg) {
        return errMsg;
    }
    let count: number = 0;
    let occurences = jsonObjArr.reduce((accumulate: any, row: any): any => {
        count = getValueByObjAttrOperation(count, { reqAttrOperation, reqAttrId, reqAttrVal }, accumulate, row);
        return accumulate;
    });

    if (count !== 0) {
        resp = occurences;
        if (!defaultFormat) {
            resp = formatTotalByObjResp(occurences, {reqAttrId, reqAttrVal});
        }
    }

    return resp;
};
   