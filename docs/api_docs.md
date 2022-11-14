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
                "averageRate": "0", // TODO: change to Rating
                "chef": {   // TODO: change to Chef_name
                    "password": "1234",
                    "role": "chef",
                    "username": "chef",
                    "uuid": "e80c7132-3c08-4e7b-924c-962632915d44"
                },
                "hasRates": false,  // TODO: remove
                "name": "Tarta de atun",    // TODO: change to Meal
                "uuid": "3b27739b-be1e-41b2-9f42-42f688630882"
            },
            ...
        ]
    }

