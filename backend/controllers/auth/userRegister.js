const User = require('../../models/user');
const { registerSchema } = require('../../validation/authSchema');

const userRegister = async (req, res) => {
  try {
    //Validate incoming data using Zod
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        field: err.path[0],
        message: err.message,
      }));
      return res.status(400).json({ errors });
    }

    //Extract validated data
    const { name, email, password, role, avatarUrl, bio } = result.data;

    //Additional checks
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({
        message: 'Email already Registered'
      });
    }

    if (role === 'admin') {
      return res.status(403).json({
        message: 'You cannot register as Admin'
      });
    }

    //Create and save new user
    const newUser = new User({
      name,
      email,
      password, //Consider hashing this with bcrypt before saving
      role: role === 'customer' ? 'customer' : 'customer',
      avatarUrl,
      bio,
    });

    await newUser.save();

    return res.status(200).json({ newUser });
  } 
  catch (error) {
    console.error('Server Issue', error);
    res.status(500).json({
      message: 'Server Issue'
    });
  }
};

module.exports = userRegister;
