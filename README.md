# SWIFT Codes API

## Overview
The `SWIFT Codes API` provides a simple and efficient way to retrieve and manage SWIFT codes for financial institutions. It allows users to search for SWIFT codes by bank name, country, and other criteria, making it easier to process international transactions. It was done based on the file provided: [SWIFT Codes Data File](/src/data/Interns_2025_SWIFT_CODES.csv)

### Getting Started

To set up and use the `SWIFT Codes API`, follow these steps:

### Prerequisites
- Ensure you have the [Docker Compose](https://docs.docker.com/compose/) installed in order to run multiple-container applications
<!-- - Ensure you have [Node.js](https://nodejs.org/) installed (version 14 or higher).
- Install [npm](https://www.npmjs.com/) (Node Package Manager). -->

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/swift-codes-api.git
    ```
2. Navigate to the project directory:
    ```sh
    cd swift-codes-api
    ```
3. Build the Docker image:
    ```sh
    docker compose build
    ```

### Running the API
1. Run the container with application (both database and the app itself):
    ```sh
    docker compose up
    ```
2. The API will be running at `http://localhost:8080`.

### Testing the API
1. To test whether everything went well, one can access the base route of the API via `http://localhost:8080`, which should return "Hello World!"
2. To run the unit tests, use the follwing command in the Docker Environment
    ```sh
    npm run test
    ```

### Using the API
You can use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to interact with the API endpoints. One can also use the browser to manually modify request and get the responses (not recommended).

### Example Request
To retrieve information using SWIFT Code:
```sh
curl -X GET "http://localhost:8080/v1/swift-codes/AAISALTRXXX"
```
This should return:
```json
{
  "address": "HYRJA 3 RR. DRITAN HOXHA ND. 11 TIRANA, TIRANA, 1023",
  "bankName": "UNITED BANK OF ALBANIA SH.A",
  "countryISO2": "AL",
  "countryName": "ALBANIA",
  "isHeadquerter": true,
  "swiftCode": "AAISALTRXXX",
  "branches": [
    {
      "address": "HYRJA 3 RR. DRITAN HOXHA ND. 11 TIRANA, TIRANA, 1023",
      "bankName": "UNITED BANK OF ALBANIA SH.A",
      "countryISO2": "AL",
      "isHeadquerter": true,
      "swiftCode": "AAISALTRXXX"
    }
  ]
}
```

### Endpoints
#### GET endpoints
1. **GET** `http://localhost:8080/v1/swift-codes/{swift-code}` - retrieving data about headquerters/departments using their SWIFT code

2. **GET** `http://localhost:8080/v1/swift-codes/country/{countryISO2code}` - retrieving data about headquerters/departments using their countryISO2code

#### POST endpoints
1. **POST** `http://localhost:8080/v1/swift-codes` - adding a new headquerter/department

#### DELETE endpoints
1. **DELETE** `http://localhost:8080/v1/swift-codes/{swiftCode}` - deleting a headquerter/department by the SWIFT code

<!-- #### GET /endpoint
Description of the GET endpoint.

#### POST /endpoint
Description of the POST endpoint. -->

## Error Handling
Information on how errors are handled by the API.

## Tech Stack
This project utilizes the following technologies:

1. **NodeJS with TypeScript**: The backend of the API is built using NodeJS, a JavaScript runtime, with TypeScript for static typing and improved code quality.
2. **ExpressJS**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
3. **Sequelize**: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication, and more. I picked it for this application because in case of many requests it provides fast access to data by keeping track of the changes in the database and synchronising data in its memory. This provides the scalability opportunities of this solution for further development.
4. **PostgreSQL**: An advanced, enterprise-class, and open-source relational database system that supports both SQL (relational) and JSON (non-relational) querying.
5. **Jest**: A delightful JavaScript testing framework with a focus on simplicity. It works with projects using Babel, TypeScript, Node.js, React, Angular, Vue.js, and Svelte.
6. **Docker**: A set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers. It ensures that the application runs in a consistent environment across different stages of development and production.

<!-- These technologies together provide a robust and scalable foundation for the `swift-codes-api` project. -->

<!-- ## Contributing
Guidelines for contributing to the project. -->

## License
## License
This project is licensed under the MIT License.

## Contact
Created by: 
Wojciech Siostrzonek  
wojciechsiostrzonek@gmail.com  
[GitHub](https://github.com/wotorr3s)
