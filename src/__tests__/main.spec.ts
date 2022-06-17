import { VernQueryFactory } from "../main";
import { jsonObListPatern1, jsonObListPatern2, jsonObListPatern3, jsonObListPatern4, jsonObListPatern5, jsonObListPatern6 } from "./mock-payload/json-obj-req";

describe("VernQueryFactory: Test get total by Id!", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetModules();
	});
	test("when getting the overall total by attrId and value, then return the total value.", () => {
		const idAttrNm = "attrId";
		const numericAttrNm = "value";

		const expectedResult = {
			id: "111111111",
			total: 60
		};
		const resp = VernQueryFactory.getTotalById({jsonObjArray:jsonObListPatern1, idAttrNm, numericAttrNm}, expectedResult.id);
		expect(resp).toEqual(expectedResult);
	});

	test("when getting the overall total by uniqueId and price, then return the total value.", () => {
		const idAttrNm = "uniqueId";
		const numericAttrNm = "price";

		const expectedResult = {
			id: "111111113",
			total: 18.19
		};
		const resp = VernQueryFactory.getTotalById({jsonObjArray:jsonObListPatern2, idAttrNm, numericAttrNm}, expectedResult.id);
		expect(resp).toEqual(expectedResult);
	});

	test("when getting the overall total by uniqueId and price(json string), then return the total value.", () => {
		const idAttrNm = "uniqueId";
		const numericAttrNm = "price";

		const expectedResult = {
			id: "111111113",
			total: 18.19
		};

		const resp = VernQueryFactory.getTotalById({jsonObjArray:jsonObListPatern3, idAttrNm, numericAttrNm}, expectedResult.id);
		expect(resp).toEqual(expectedResult);
	});

	test("when json array is empty, then return the error message.", () =>{
		const idAttrNm = "uniqueId";
		const numericAttrNm = "price";

		const expectedResult = "The input format not a valid json array(empty array)!";
            
		const resp = VernQueryFactory.getTotalById({jsonObjArray:{}, idAttrNm, numericAttrNm}, "");
		expect(resp).toEqual(expectedResult);
	});

	test("when json array is null, then return the error message.", () => {
		const idAttrNm = "uniqueId";
		const numericAttrNm = "price";

		const expectedResult = "The input format not a valid json array!";
            
		const resp = VernQueryFactory.getTotalById({jsonObjArray:null, idAttrNm, numericAttrNm}, null);
		expect(resp).toEqual(expectedResult);
	});

	test("when json array is (empty string), then return the error message.", () => {
		const idAttrNm = "uniqueId";
		const numericAttrNm = "price";

		const expectedResult = "The input format not a valid json array!";
            
		const resp = VernQueryFactory.getTotalById({jsonObjArray:"", idAttrNm, numericAttrNm}, null);
		expect(resp).toEqual(expectedResult);
	});

});

describe("VernQueryFactory: Test get total!", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetModules();
	});
	
	test("when getting the total, then return the total value regardless of differences on id.", () => {
		const idAttrNm = "uniqueId";
		const numericAttrNm = "price";

		const expectedResult = {
			id: "all",
			total: 30
		};
		const resp = VernQueryFactory.getTotal({jsonObjArray:jsonObListPatern4, idAttrNm, numericAttrNm});
		expect(resp).toEqual(expectedResult);
	});
});

describe("VernQueryFactory: Test get total by group!", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetModules();
	});
	
	test("when request the total by id, then return the total with group by id.", () => {
		const idAttrNm = "uniqueId";
		const numericAttrNm = "price";
		const grpAttrNm = "uniqueId";

		const expectedResult = [
			{ uniqueId: "111111111", attrSeq: "1001", price: 50 },
			{ uniqueId: "111111112", attrSeq: "1002", price: 20 },
			{ uniqueId: "111111113", attrSeq: "1002", price: 10 }
		];
		const resp = VernQueryFactory.getTotalByGroup({jsonObjArray:jsonObListPatern5, idAttrNm, numericAttrNm}, grpAttrNm);
		expect(resp).toEqual(expectedResult);
	});

	test("when request the total by seq, then return the total with group by seq.", () => {
		const idAttrNm = "uniqueId";
		const numericAttrNm = "price";
		const grpAttrNm = "attrSeq";

		const expectedResult = [
			{ uniqueId: "111111111", attrSeq: "1001", price: 50 },
			{ uniqueId: "111111112", attrSeq: "1002", price: 30 }
		];
		const resp = VernQueryFactory.getTotalByGroup({jsonObjArray:jsonObListPatern6, idAttrNm, numericAttrNm}, grpAttrNm);
		console.log({resp});
		expect(resp).toEqual(expectedResult);
	});
});