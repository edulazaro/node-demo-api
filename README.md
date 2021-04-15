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
  npm migrate
  ```
3. Start the application
  ```
  npm start
  ```

You can then import the collection **NodeApp.postman_collection.json** into [Postman](https://www.postman.com/) and call the endpoints, using by default port `3000`.

To manually execute the migration or the seeder:

```
# Migrate
npx sequelize-cli db:migrate

# Seed
npx sequelize-cli db:seed:all
```

## Testing

To test the application just run the command: `npm run test`.

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



