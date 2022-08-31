# Dad's Expense Tracker
## Features
* Register by email, Google account
* Only logged in state can access the user's exclusive data
* The so-called access, including adding, reading, editing, deleting
* Read data by category

## Getting Start
1. Clone the project
```
  https://github.com/PigeonShogi/expense-tracker.git
```
2. Install the required dependencies
```
  npm install
```
3. Install nodemon
```
  npm i nodemon
```
4. Set environment variables in .env file according to .env.example
```
  touch .env
```
5. Seed your database
```
  npm run seed
```
6. Start the server
```
  npm run dev
```
7. Execute successfully if seeing following message
```
  app.js is running on http://localhost:3000
```
## Built With
* Runtime:　Node @ 14.16.0
* Framework: Express @ 4.18.1
* Database: Mongoose @ 6.5.0
* View Engine: express-handlebars @ 6.0.6
* Check package.json for other dependencies
