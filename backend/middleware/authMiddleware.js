const jwt = require("jsonwebtoken")// for authentication

//middleware for authentication
const authenticateToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(403).json({ message: "Access denied"});

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;