const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const userLogin = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        
        if(!email || !password) {
            return res.status(403).json({
                message: 'Enter the required fields'
            });
        }

        const user = await User.findOne({email}).select('+password');
        if(!user) {
            return res.status(403).json({
                message: 'Invalid email or password'
            })
        }

        // console.log('Password received from client:', password);
        const isCorrect = user.comparePassword(password);
        if(!isCorrect) {
            return res.status(403).json({
                message: 'Invalid email or password'
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        return res.status(200).json({
            message: "Logged In",
            token
        })
    }
    catch (error) {
        console.log('Something went wrong');
        return res.status.json({
            message: 'Something went wrong'
        })
    }
};

module.exports = userLogin;