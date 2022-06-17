
import { ParamRequestAttr, ParamRequestDateAttr } from "../dataobject/requestType";
import { getTotal, getTotalById, getTotalByGroup } from "./queryUtility";

export class VernFactory {
	/**
	 * Get the total value by one unique id
	 * @param reqParams 
	 * @returns 
	 */
	static getTotal(reqParams: ParamRequestAttr): any {
		return getTotal(reqParams);
	}

	/**
	 * Get the total value by one unique id
	 * @param reqParams 
	 * @returns 
	 */
	static getTotalById(reqParams: ParamRequestAttr, idAttrVal: string): any {
		return getTotalById(reqParams, idAttrVal);
	}

	/**
	 * Get total value by for all unique id.
	 * 
	 * @param reqParams
	 * @param grpAttrNm 
	 * @returns 
	 */
	static getTotalByGroup(reqParams: ParamRequestAttr, grpAttrNm: string): any {
		return getTotalByGroup(reqParams, grpAttrNm);
	}

}


