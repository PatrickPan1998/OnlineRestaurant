const jwt = require("jsonwebtoken");
// const SECRET_KEY = "123456";
    
module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //Parsed user data
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
