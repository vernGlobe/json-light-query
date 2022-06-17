# json-light-query

Get the total/average value from json array(object/string).

# Usage

1 - How to get total by id

```ts
const { VernQueryFactory } = require("json-light-query");
const reqAttrId = "nameOfUniqueId";
const reqAttrVal = "nameOfAttributeToGetTotal";
const reqAttrIdVal = "111111113";
const jsonArraySample = [{
  "nameOfUniqueId": "111111113",
  "anyAdditonalAttributeIsFine": "1001",
  "nameOfAttributeToGetTotal": 10.98
 },
 {
  "nameOfUniqueId": "111111113",
  "anyAdditonalAttributeIsFine": "1002",
  "nameOfAttributeToGetTotal": 7.21
  }];
const resp = VernQueryFactory.getTotalById({jsonObjArray:jsonArraySample, idAttrNm: reqAttrId, numericAttrNm: reqAttrVal}, reqAttrIdVal);
```
The above resp will be:
```ts
{
  id: '111111113',
  total: 18.19
} 
```
2 - How to get total by group

```ts
const { VernQueryFactory } = require("json-light-query");
const reqAttrId = "uniqueId";
const reqAttrVal = "price";
const reqAttrGrpNm = "attrSeq";
const jsonArraySample ='[{"uniqueId":"111111113","attrSeq":"1001","price":10},{"uniqueId":"111111114","attrSeq":"1001","price":10},{"uniqueId":"111111113","attrSeq":"1002","price":10}]';

const resp = VernQueryFactory.getTotalByGroup({jsonObjArray:jsonArraySample, idAttrNm: reqAttrId, numericAttrNm: reqAttrVal}, reqAttrGrpNm);
```
The above resp will be:
```ts
[{
  uniqueId: '111111113',
  attrSeq: '1001'
  price: 20
},
{
  uniqueId: '111111113',
  attrSeq: '1002'
  price: 10
}]
```
3 - How to get total for all

```ts
const { VernQueryFactory } = require("json-light-query");
const reqAttrId = "uniqueId";
const reqAttrVal = "price";
const reqAttrGrpNm = "attrSeq";
const jsonArraySample ='[{"uniqueId":"111111113","attrSeq":"1001","price":10},{"uniqueId":"111111114","attrSeq":"1001","price":10},{"uniqueId":"111111113","attrSeq":"1002","price":10}]';

const resp = VernQueryFactory.getTotal({jsonObjArray:jsonArraySample, idAttrNm: reqAttrId, numericAttrNm: reqAttrVal});
```
The above resp will be:
```ts
{
  id: 'all',
  total: 30
} 
```

# Installation

```ts

$ npm i json-light-query

```