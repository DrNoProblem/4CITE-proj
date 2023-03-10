const bcrypt = require("bcryptjs");
const User = require("../models/user.model");



  exports.getCurrentUser = async (req, res, next) => {
    try {
      const { id, email, pseudo, role } = req.user;
      res.json({ id, email, pseudo, role });
    } catch (err) {
      next(err);
    }
  };
  
exports.updateCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    const { email, pseudo, password } = req.body;

    if (email) user.email = email;
    if (pseudo) user.pseudo = pseudo;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteCurrentUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.userId);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, pseudo, password, role } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email) user.email = email;
    if (pseudo) user.pseudo = pseudo;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (role) user.role = role;

    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};
