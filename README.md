# Hotel Waiting System

## GitHub Address

https://github.com/crazyqiqi0639/HotelWaitingSystem

## preparation

Before running this system, you need to make sure that your environment has installed npm, nodejs and mongoDB.

## Opreation Instruction

If you running this repository for the first time, there are four procedure need to be done:

> npm install 
 
This is to install the modules that we need.

> npm run compile

This is to compile.

> mongo waitlist ./scripts/init.mongo.js

This is to initialize the `waitlist` database.

>node ./server/server.js

This is to run the project.

Now you can use `localhost:3000` to view the system.

## Function Instruction

This system is a Hotel Waiting System. There are two main function:

* Add customer to the system.

* Delete customer from the system.


## File Instruction

#### ./scripts/test.js

This is the test script that to test all CRUD operations. 

#### ./scripts/init.mongo.js

This is to initialize the waitlist database.

#### ./server/server.js

This is the server javascript file. You can run the system by running `node ./server/server.js`.

#### ./server/schema.graphql

This is the graphql file.

#### ./src/App.jsx

This is the front-end react file.