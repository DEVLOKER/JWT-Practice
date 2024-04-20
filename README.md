# Authentication with JWT Tokens in React and Express.js

the project composed of:

# Client
React app with Redux Toolkit
`cd client`
`npm run dev`
open [http://localhost:3000](http://localhost:3000)

# Server
nodejs app with Express.js, the server will consist of two parts:

- The authentication server: running on port 8800, will handle login, logout, and refreshing access tokens. We'll secure the login and refresh routes using express-rate-limit to prevent brute force attacks and limit the number of requests.
- The resource server: running on port 8080, will expose a protected resource accessible only to authenticated users.
  
`cd server`
`npm run build`
`npm run dev:watch`

# Test
use these credentials:

| username | password |
| :------: | :------: |
|  user01  |   123    |
|  user02  |   456    |