const { expressjwt } = require('express-jwt');

module.exports = expressjwt({
  secret: process.env.JWT_SECRET, // Ensure JWT_SECRET is defined in your environment
  algorithms: ['HS256'], // Adjust to the algorithm you're using
});


// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
};
