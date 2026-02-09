const supervisor = require('../model/supervisemodel');
const Login = require('../model/loginmodel');
const bcrypt = require('bcrypt');

exports.supervisor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Login({ email, password: hashedPassword, role: 'supervisor' });
    await user.save();

    res.status(201).json({ 
      message: 'Supervisor registered successfully',
      user: {
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.savedata=async  (req,res)=>{

  try{

    const { name,email,message}=req.body;


    const   data=new supervisor({email,name,message});

    await data.save();

    res.status(201).json({message:"data saved successfully"});

  } catch(error){
    res.status(500).json({message:error.message});
  }
};