const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// generator token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //  find single user
    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.status(400).json("Email already exist.");
    }

    //  user validaton condition
    if (!name || !email || !password) {
      return res.status(400).json("All fields are required.");
    }
    if (!validator?.isEmail(email)) {
      return res.status(400).json("Invalid email");
    }
    if (!validator?.isStrongPassword(password)) {
      return res
        .status(400)
        .json(
          "Password must be contain uppercase, lowercase, number, symbol and minimum 8 characters"
        );
    }

    //  hash password

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    // create user
    const user = await userModel.create({ name, email, password: hash });

    // create token
    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, password: user.password, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { registerUser };