const Login = require('../model/loginmodel');

const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { email, password, role = 'user' } = req.body;

    console.log(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Login({ email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.changeRole = async (req, res) => {
  try {
    const { email, newRole } = req.body;

    if (!['user', 'supervisor'].includes(newRole)) {
      return res.status(400).json({ message: 'Invalid role. Must be user or supervisor' });
    }

    const user = await Login.findOneAndUpdate(
      { email },
      { role: newRole },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: `User role changed to ${newRole} successfully`,
      user: {
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Login.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ 
      message: 'Login successful', 
      user: {
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};