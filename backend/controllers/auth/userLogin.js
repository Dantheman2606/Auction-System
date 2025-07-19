const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { loginSchema } = require("../../validation/authSchema");

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

const userLogin = async (req, res) => {
  try {
    //Zod validation
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        field: err.path[0],
        message: err.message,
      }));
      return res.status(400).json({ errors });
    }

    const { email, password } = result.data;

    //Checking if user exists
    const user = await User.findOne({ email }).select('+password'); // assuming password is select: false in schema
    if (!user) {
      return res.status(403).json({
        message: 'Invalid email or password'
      });
    }

    //Check password
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
      return res.status(403).json({
        message: 'Invalid email or password'
      });
    }

    //Generate JWT (the key)
    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: "Logged In",
      token,
      user: {
        id: user._id,
        name:user.name,
        email: user.email,
        role:user.role
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      message: 'Something went wrong'
    });
  }
};

module.exports = userLogin;
