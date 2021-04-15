Simple API to manage user data build with express

## Development

To install the application follow these steps:

1. Clone the repository
  ```
  git clone git@github.com:edulazaro/node-demo-api.git
  ```
2. Install npm packages
  ```
  npm install
  ```
2. Run the migrations and import the seeds
  ```
  npm run migrate
  ```
3. Start the application
  ```
  npm start
  ```

You can then import the collection **NodeApp.postman_collection.json** into [Postman](https://www.postman.com/) and call the endpoints, using by default port `3000`.

To can also manually execute the migration or the seeder for teh `users` table:

```
# Migrate
npx sequelize-cli db:migrate

# Seed
npx sequelize-cli db:seed:all
```

## Testing and coverage

To test the application just run the command `npm test`.

To get test coverage information run the command`npm run cover` and then access the `coverage\index.html` file to check the results.

## Run with docker

Follow these steps, replacing `[path/to/database/folder]` with the complete absolute path to the `/storage` app folder.

1. Build the image using:
  ```
  docker build -t node-app
  ```
2. Run the image using:
  ```
  docker run -p 3000:8080 -v [path/to/database/folder]:/usr/src/app/storage node-app
  ```

## Endpoints and examples

### GET REQUEST: index users

**GET**: `https://demo.zonaspace.com/api/users/`

**Results (200)**

```
{
    "success": true,
    "data": [
        {
            "id": "d9605c85-3bdb-4ba7-bf69-ab00c4aae5a",
            "email": "test1@test.dev",
            "givenName": "Edu",
            "familyName": "Lazaro",
            "created": null
        },
        {
            "id": "79c326c3-a0f1-4c4e-be4c-6a5fc857d411",
            "email": "test2@test.dev",
            "givenName": "Daniel",
            "familyName": "LaRusso",
            "created": null
        },
        {
            "id": "b9c6aa8c-39fd-4338-86e8-4e2554633a5d",
            "email": "test3@test.dev",
            "givenName": "Hideo",
            "familyName": "Miyagi",
            "created": null
        },
        {
            "id": "29a8c8d7-52db-4ccf-a684-3e1e957a901c",
            "email": "test4@test.dev",
            "givenName": "Johnny",
            "familyName": "5",
            "created": "2021-04-15T02:17:44.296Z"
        },
    ]
}
```

### GET REQUEST: get single user

**GET**: `http://localhost:3000/api/users/d9605c85-3bdb-4ba7-bf69-ab00c4aae5a`

**Results (200)**


```
{
    "success": true,
    "data": {
        "id": "d9605c85-3bdb-4ba7-bf69-ab00c4aae5a",
        "email": "test1@test.dev",
        "givenName": "Edu",
        "familyName": "Lazaro",
        "created": null
    }
}
```


### POST REQUEST: post a user

**POST**: `http://localhost:3000/api/users` with:
```
{
    "givenName": "John",
    "familyName": "Doe",
    "email": "test4@test.dev"
}
```

**Results (201)**

```
{
    "success": true,
    "data": {
        "id": "abc841c5-7698-4746-b3c2-75143f407a25",
        "email": "test4@test.devvvvvvvvvvvvv",
        "givenName": "Johnny",
        "familyName": "5",
        "created": "2021-04-15T02:18:15.301Z"
    }
}
```

### PATCH REQUEST: update a user

The PATCH endpoint returns a 200 status instead of 204 for consistency of the returned results.

**PATCH**: `http://localhost:3000/api/users/d9605c85-3bdb-4ba7-bf69-ab00c4aae5a` with:

```
{
    "givenName": "JohnV2",
    "familyName": "DoeV2",
    "email": "johndoe@bla.com"
}
```

**Results (200)**

```
{
    "success": true,
    "data": {
        "id": "d9605c85-3bdb-4ba7-bf69-ab00c4aae5a",
        "email": "johndoe@bla.com",
        "givenName": "John",
        "familyName": "Doe",
        "created": null
    }
}
```

### DELETE REQUEST: remove a user

The DELETE endpoint returns a 200 status instead of 204 for consistency of the returned results.

**DELETE**: `http://localhost:3000/api/users/b8929789-50c0-4992-a337-e1eea706e862` with:

**Results (200)**

```
{
    "success": true
}
```
