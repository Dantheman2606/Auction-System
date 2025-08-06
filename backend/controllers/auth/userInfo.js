const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

const userInfo = async (req , res) => {
    const userId = req.user_id.id;

    try
    {
        const user = await User.findById(userId);

        if(!user) {
            return res.status(403).json({
                msg : "User doesn't exist"
            })
        }

        return res.status(200).json(user);
    }
    catch(err)
    {
        return res.status(403).json({
            msg : "Something went wrong is finding the user Id"
        })
    }
}

module.exports = userInfo