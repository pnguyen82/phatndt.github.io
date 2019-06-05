---
title: Working with MySQL JSON
category: mysql
---

Source: https://scotch.io/tutorials/working-with-json-in-mysql
## Create Table
```sql
CREATE TABLE `e_store`.`products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
    `attributes` JSON NOT NULL ,
    PRIMARY KEY(`id`)
);
```
## Insert
### JSON RAW
```sql
INSERT INTO `e_store`.`products`(
    `attributes`
)
VALUES(
    '{"screen": "20 inch", "resolution": "1280 x 720 pixels", "ports": {"hdmi": 0, "usb": 0}, "speakers": {"left": "5 watt", "right": "5 watt"}}'
);
```

### JSON_OBJECT
```sql
INSERT INTO `e_store`.`products`(
    `attributes`
)
VALUES(

    JSON_OBJECT(
        "network" ,
        JSON_ARRAY("GSM" , "CDMA" , "HSPA" , "EVDO") ,
        "body" ,
        "5.11 x 2.59 x 0.46 inches" ,
        "weight" ,
        "143 grams"
    )
);
```

### JSON_MERGE
``` sql
INSERT INTO `e_store`.`products`(
    `attributes`
)
VALUES(
    JSON_MERGE(
        '{"sensor_type": "CMOS"}' ,
        '{"processor": "Digic DV III"}' ,
        '{"scanning_system": "progressive"}'
    )
);
```

### JSON_TYPE
```
SELECT JSON_TYPE(attributes) FROM `e_store`.`products`; // return Object
```

## SELECT
### JSON_EXTRACT
```sql
SELECT
    *
FROM
    `e_store`.`products`
WHERE
    `category_id` = 1
AND JSON_EXTRACT(`attributes` , '$.ports.usb') > 0
AND JSON_EXTRACT(`attributes` , '$.ports.hdmi') > 0;
```
```sql
SELECT
    *
FROM
    `e_store`.`products`
WHERE
    `category_id` = 1
AND `attributes` -> '$.ports.usb' > 0
AND `attributes` -> '$.ports.hdmi' > 0;
``
## UPDATE
### JSON_INSERT
```sql
UPDATE `e_store`.`products`
SET `attributes` = JSON_INSERT(
    `attributes` ,
    '$.chipset' ,
    'Qualcomm'
)
WHERE
    `category_id` = 2;
```
### JSON_REPLACE
```sql
UPDATE `e_store`.`products`
SET `attributes` = JSON_REPLACE(
    `attributes` ,
    '$.chipset' ,
    'Qualcomm Snapdragon'
)
WHERE
    `category_id` = 2;
```

### JSON_SET
```sql
UPDATE `e_store`.`products`
SET `attributes` = JSON_SET(
    `attributes` ,
    '$.body_color' ,
    'red'
)
WHERE
    `category_id` = 1;
```

>The JSON_INSERT function will only add the property to the object if it does not exists already.

>The JSON_REPLACE function substitutes the property only if it is found.

>The JSON_SET function will add the property if it is not found else replace it.


### JSON_REMOVE
```sql
UPDATE `e_store`.`products`
SET `attributes` = JSON_REMOVE(`attributes` , '$.mount_type')
WHERE
    `category_id` = 3;
```
