# LogServer
Log Server for DSD06
# Software required
- Webstorm : IDE to code
- Prepros: Software for compile sass/scss => css
- Robomongo: View database NoSQL
- Postman: Test GET/POST/PUT/DELETE

# Language
- NodeJs (Server)
- MongoDB (Database)
- Jade (View)

# Init, start server
Step 1: Create file .env

    cp .env-sample .env

    Node: Write value for DB_URL (Exp: mongodb://127.0.0.1/logsystem)
Step 2: Import module

    npm install

Step 3: Start server
    
    node ./bin/www

# Create database (fake data)
    node data_faker/fakeDatabase

