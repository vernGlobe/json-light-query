# json-light-query

To get total attribute value from same attribute id in json array(object/string).

# Usage

1 - How to get the TOTAL/AVERAGE value from following json array, 
\n TOTAL: Please use keyword "sum" for param "reqAttrOperation".
\n AVERAGE: Please use keyword "avg" for param "reqAttrOperation".

```ts

const reqAttrId = "nameOfUniqueId";
const reqAttrVal = "nameOfAttributeToGetTotal";
const reqAttrOperation = "sum";
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
// or const jsonArraySample ='[{"uniqueId":"111111113","attrSeq":"1001","price":10.98},{"uniqueId":"111111113","attrSeq":"1002","price":7.21}]'

const resp = getTotalByObjAttr(jsonArraySample, reqAttrOperation, reqAttrId, reqAttrVal, false);

```

The above method will return the total value of "nameOfAttributeToGetTotal"

```ts

{
  id: '111111113',
  total: 18.19
} 

```


# Installing

Install the latest version, run:

## npm

npm i json-light-query
