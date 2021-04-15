Simple API to manage user data build with express

## Development



npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all


docker build -t neeonez/node-app .




docker run -p 3000:8080 -v C:/Code/nodeapp/storage:/usr/src/app/storage neeonez/node-app