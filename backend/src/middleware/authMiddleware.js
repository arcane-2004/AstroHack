const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {

        console.log("Cookies:", req.cookies);

        const token = req.cookies.token;

        console.log("Token:", token);


        if (!token) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

module.exports = {
    authenticate,
};


// const jwt = require("jsonwebtoken");

// const authenticate = (req, res, next) => {
//     try {

//         const authHeader = req.headers.authorization;

//         if (!authHeader) {
//             return res.status(401).json({
//                 message: "Authentication required"
//             });
//         }

//         const token = authHeader.startsWith("Bearer ")
//             ? authHeader.split(" ")[1]
//             : null;

//         if (!token) {
//             return res.status(401).json({
//                 message: "Invalid authorization header"
//             });
//         }

//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         req.user = decoded;

//         next();

//     } catch (error) {

//         console.error(error.message);

//         return res.status(401).json({
//             message: "Invalid or expired token"
//         });
//     }
// };

// module.exports = {
//     authenticate
// };