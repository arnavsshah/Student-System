# Student-System


#### Install dependencies for server
`npm install`
#### Install dependencies for client
`npm run client-install`
#### Run the client & server with concurrently
`npm run dev`
#### Run the Express server only
`npm run server`
#### Run the React client only
`npm run client`

#### Server runs on http://localhost:5000 and client on http://localhost:3000


### Neo4j connection

- Create a new database in the Neo4j desktop application. During creation, enter a **password**. The **user** is **neo4j**  by default.
- **Start** the database.
- Copy the URL for the database. Select the URL with the **bolt** protocol under Manage/Details.
- Add the **DATABASE_URL, DATABASE_USERNAME, DATBASE_PASSWORD** as environment variables. (Sample env file is provided).
- Using these details, the **driver** object of the neo4j-driver module is initialised in config/db.js
- Import the driver object into a file to query the database.


### Creating database

- Setup Neo4j connection 
- DATA folder must contain 2 folders - Students & Faculty - each containing the necessary json files

- for adding students to the database
`npm run create_students`

- for adding teachers to the database
`npm run create_teachers`
