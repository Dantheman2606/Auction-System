const User = require('../../models/user');

const userRegister = async (req, res) => {
    try {
        const {
        name,
        email,
        password,
        role,
        avatarUrl,
        bio
    } = req.body;

    if(!name || !email || !password || !role) {
        return res.status(400).json({
            message: 'Enter the required fields'
        });
    }

    const existingUser = await User.findOne({ email });

    if(existingUser) {
        return res.status(403).json({
            message: 'Email already Registered'
        });
    }

    if(role == 'admin') {
        return res.status(403).json({
            message: 'You cannot register as Admin'
        });
    }

    const newUser = new User({
        name,
        email,
        password,
        role: role == 'customer' ? 'customer' : 'customer',
        avatarUrl,
        bio,
    });

    await newUser.save();

    return res.status(200).json({
        newUser
    });

    }
    catch (error) {
        console.log('Server Issue', error);
        res.status(500).json({
            message: 'Server Issue'
        })
    }

};

module.exports = userRegister;