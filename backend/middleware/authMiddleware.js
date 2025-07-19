const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

const authMiddleware = async (req , res , next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(403).json({
            msg: "No Token provided"
    })

    if(!authHeader.startsWith('Bearer '))
        return res.status(403).json({
            msg: "No Token provided"
    })

    const token = authHeader.split(' ')[1];

    try
    {
        const jwtVerify = jwt.verify(token,JWT_SECRET);

        req.user_id = {
            id : jwtVerify.id
        };

        next();
    }
    catch(err)
    {
        return res.status(403).json({
            msg:"Invalid Token"
        })
    }

    
}

module.exports = authMiddleware;