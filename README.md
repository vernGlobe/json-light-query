# json-light-query

To get total attribute value from same attribute id in json object/array.

# Usage

How to get total value from following json array.

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