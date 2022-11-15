# API Docs

## For chefs

#### Register

```http
POST /chef/register
```
_Parameters_
|Parameter|Type|
|---------|----|
|username|string|
|password|string|

_Returns_
```json
HTTP/1.1 201 Created
{
    "message": "Successfully registered",
}
```

#### Login

```http
POST /chef/login
```
_Parameters_
|Parameter|Type|
|---------|----|
|username|string|
|password|string|

_Returns_
```json
HTTP/1.1 200 OK
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZDc1ZjYwZTAtYmY4MC00NTQ2LThiNzYtZjkyNDMxOGNmMGMxIiwidXNlcm5hbWUiOiJjaGVmMiIsInJvbGUiOiJjaGVmIiwiaWF0IjoxNjY4NDA4MjgwfQ.wDRUAvycxGKqlMcBsTqxSScCuPnreaSVkqFRbl69H6M"
}
```

#### Create meal

```http
POST /chef/meals
```
_Parameters_
|Parameter|Type|
|---------|----|
|name|string|

_Headers_
|Key|Value|
|---------|----|
|Authorization|Bearer < token >|

_Returns_
```json
HTTP/1.1 201 Created
{
    "message": "Meal created",
}
```

#### Show chef's meals

```http
GET /chef/meals
```

_Headers_
|Key|Value|
|---------|----|
|Authorization|Bearer < token >|

_Returns_
```json
HTTP/1.1 200 OK
    {
        "data": [
            {
                "averageRate": 4,
                "chefName": "chef",
                "meal": "Tarta de atun",
                "uuid": "709691c0-8f59-4bcf-8d88-19ccc915e87a"
            }
            ...
        ]
    }
```

## For Customers

#### Register

```http
POST /customer/register
```
_Parameters_
|Parameter|Type|
|---------|----|
|username|string|
|password|string|

_Returns_
```json
HTTP/1.1 201 Created
{
    "message": "Successfully registered",
}
```

#### Login

```http
POST /customer/login
```
_Parameters_
|Parameter|Type|
|---------|----|
|username|string|
|password|string|

_Returns_
```json
HTTP/1.1 200 OK
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZDc1ZjYwZTAtYmY4MC00NTQ2LThiNzYtZjkyNDMxOGNmMGMxIiwidXNlcm5hbWUiOiJjaGVmMiIsInJvbGUiOiJjaGVmIiwiaWF0IjoxNjY4NDA4MjgwfQ.wDRUAvycxGKqlMcBsTqxSScCuPnreaSVkqFRbl69H6M"
}
```

#### Show meals

```http
GET /meals
```

_Headers_
|Key|Value|
|---------|----|
|Authorization|Bearer < token >|

_Returns_
```json
HTTP/1.1 200 OK
    {
        "data": [
            {
                "alreadyRated": true,
                "chefName": "chef01",
                "meal": "Tarta de atun",
                "uuid": "709691c0-8f59-4bcf-8d88-19ccc915e87a"
            },
            {
                "alreadyRated": true,
                "chefName": "chef01",
                "meal": "Vitel tone",
                "uuid": "3b27739b-be1e-41b2-9f42-42f688630882"
            },
            {
                "alreadyRated": false,
                "chefName": "chef02",
                "meal": "Sopita de caracol",
                "uuid": "289ba61e-a649-4a88-8435-09a606f3c4a1"
            }
            ...
        ]
    }
```

#### Rate meal

```http
POST /meals/:uuid/rate
```
_Parameters_
|Parameter|Type|
|---------|----|
|rate|number|

_Headers_
|Key|Value|
|---------|----|
|Authorization|Bearer < token >|

_Returns_
```json
HTTP/1.1 201 Created
{
    "message": "Rate registered",
}
```