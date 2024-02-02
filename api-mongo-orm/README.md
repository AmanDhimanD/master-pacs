# API Endpoints Documentation

## Patient

**GET All Patients**

```
GET http://localhost:8000/api/patients
```

Retrieves a list of all patients.

**GET Patient by ID**

```
GET http://localhost:8000/api/patients/:id
```

Retrieves a specific patient using their unique ID.

**POST New Patient**

```
POST http://localhost:8000/api/patients
```

Creates a new patient record. The request body should contain patient data.

**PUT Update Patient**

```
PUT http://localhost:8000/api/patients/:id
```

Updates an existing patient record with the provided ID. The request body should contain updated patient data.

**DELETE Patient**

```
DELETE http://localhost:8000/api/patients/:id
```

Deletes a patient with the specified ID.

## Studies

**GET All Studies**

```
GET http://localhost:8000/api/studies
```

Retrieves a list of all studies.

**GET Study by ID**

```
GET http://localhost:8000/api/studies/:id
```

Retrieves a specific study using its unique ID.

**POST New Study**

```
POST http://localhost:8000/api/studies
```

Creates a new study. The request body should contain study data.

**PUT Update Study**

```
PUT http://localhost:8000/api/studies/:id
```

Updates an existing study with the provided ID. The request body should contain updated study data.

**DELETE Study**

```
DELETE http://localhost:8000/api/studies/:id
```

Deletes a study with the specified ID.

## Series

**GET All Series**

```
GET http://localhost:8000/api/series
```

Retrieves a list of all series.

**GET Series by ID**

```
GET http://localhost:8000/api/series/:id
```

Retrieves a specific series using its unique ID.

**POST New Series**

```
POST http://localhost:8000/api/series
```

Creates a new series. The request body should contain series data.

**PUT Update Series**

```
PUT http://localhost:8000/api/series/:id
```

Updates an existing series with the provided ID. The request body should contain updated series data.

**DELETE Series**

```
DELETE http://localhost:8000/api/series/:id
```

Deletes a series with the specified ID.

## Images

**GET All Images**

```
GET http://localhost:8000/api/images
```

Retrieves a list of all images.

**GET Image by ID**

```
GET http://localhost:8000/api/images/:id
```

Retrieves a specific image using its unique ID.

**POST New Image (with images/files)**

```
POST http://localhost:8000/api/images/uploads
```

Uploads a new image file. The request should include the image data.

**PUT Update Image**

```
PUT http://localhost:8000/api/images/:id
```

Updates an existing image with the provided ID. The request body should contain updated image data.

**DELETE Image**

```
DELETE http://localhost:8000/api/images/:id
```

Deletes an image with the specified ID.
