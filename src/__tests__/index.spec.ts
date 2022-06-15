import { getTotalByObjAttr } from "../index";
import { jsonObListPatern1, jsonObListPatern2 } from "./mock-payload/json-obj-req";

describe("test json light query", () => {
    test("when getting the overall total by attrId and value, then return the total value.", () =>{
        let reqAttrId: string = "attrId";
        let reqAttrVal: string = "value";
        let reqAttrOperation: string = "sum";

        const expectedResult: any = {
            id: '111111111',
            total: 60
            };
        const resp = getTotalByObjAttr(jsonObListPatern1, reqAttrOperation, reqAttrId, reqAttrVal, false);
        expect(resp).toEqual(expectedResult);
    });

    test("when getting the overall total by uniqueId and price, then return the total value.", () =>{
        let reqAttrId: string = "uniqueId";
        let reqAttrVal: string = "price";
        let reqAttrOperation: string = "sum";

        const expectedResult: any = {
            id: '111111113',
            total: 18.19
            };
        const resp = getTotalByObjAttr(jsonObListPatern2, reqAttrOperation, reqAttrId, reqAttrVal, false);
        expect(resp).toEqual(expectedResult);
    });
});