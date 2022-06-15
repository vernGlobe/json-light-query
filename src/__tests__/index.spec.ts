import { getTotalByObjAttr } from "../index";
import { jsonObListPatern1, jsonObListPatern2, jsonObListPatern3 } from "./mock-payload/json-obj-req";

describe("Positive result: test json light query!", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });
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

    test("when getting the overall total by uniqueId and price(json string), then return the total value.", () =>{
        let reqAttrId: string = "uniqueId";
        let reqAttrVal: string = "price";
        let reqAttrOperation: string = "sum";

        const expectedResult: any = {
            id: '111111113',
            total: 18.19
            };

        const resp = getTotalByObjAttr(jsonObListPatern3, reqAttrOperation, reqAttrId, reqAttrVal, false);
        expect(resp).toEqual(expectedResult);
    });

    test("when getting the average by uniqueId and price then return the average value.", () =>{
        let reqAttrId: string = "uniqueId";
        let reqAttrVal: string = "price";
        let reqAttrOperation: string = "avg";

        const expectedResult: any = {
            id: '111111113',
            average: 9.095
            };

        const resp = getTotalByObjAttr(jsonObListPatern3, reqAttrOperation, reqAttrId, reqAttrVal, false);
        expect(resp).toEqual(expectedResult);
    });
});

describe("Negative result: test json light query!", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });
    test("when json array is empty, then return the error message.", () =>{
        let reqAttrId: string = "uniqueId";
        let reqAttrVal: string = "price";
        let reqAttrOperation: string = "sum";

        const expectedResult: string = "The input format not a valid json array(empty array)!";
            
        const resp = getTotalByObjAttr({}, reqAttrOperation, reqAttrId, reqAttrVal, false);
        expect(resp).toEqual(expectedResult);
    });

    test("when json array is null, then return the error message.", () =>{
        let reqAttrId: string = "uniqueId";
        let reqAttrVal: string = "price";
        let reqAttrOperation: string = "sum";

        const expectedResult: string = "The input format not a valid json array!";
            
        const resp = getTotalByObjAttr(null, reqAttrOperation, reqAttrId, reqAttrVal, false);
        expect(resp).toEqual(expectedResult);
    });

    test("when json array is (empty string), then return the error message.", () =>{
        let reqAttrId: string = "uniqueId";
        let reqAttrVal: string = "price";
        let reqAttrOperation: string = "sum";

        const expectedResult: string = "The input format not a valid json array!";
            
        const resp = getTotalByObjAttr("", reqAttrOperation, reqAttrId, reqAttrVal, false);
        expect(resp).toEqual(expectedResult);
    });
});