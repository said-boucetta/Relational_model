const User = require("../../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { nom, prenom, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
      phone,
    });
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    console.log("Error in signUp => ", error);
    res.status(500).send({
      message: "Server error",
    });
  }
};

const logIn = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "User doesn't exist",
      });
    }
    const samePassword = await bcrypt.compare(password, user.password);
    if (!samePassword) {
      return res.status(400).send({
        message: "Wrong password",
      });
    }
    const token = jwt.sign({ email: user.email }, process.env.PRIVATE_KEY);
    return res.status(200).send({
      accessToken: token,
    });
  } catch (error) {
    console.log("Error in logIn => ", error);
    res.status(500).send({
      message: "Server error",
    });
  }
};

module.exports = {
  signUp,
  logIn,
};
