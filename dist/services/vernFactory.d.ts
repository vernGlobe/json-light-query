import { ParamRequestAttr } from "../dataobject/requestType";
export declare class VernFactory {
    static getTotal(reqParams: ParamRequestAttr): any;
    static getTotalById(reqParams: ParamRequestAttr, idAttrVal: string): any;
    static getTotalByGroup(reqParams: ParamRequestAttr, grpAttrNm: string): any;
}
