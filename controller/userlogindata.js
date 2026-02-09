const userdata = require('../model/usercredential');


exports.getUserData = async (req, res) => {
  try {
    const users = await userdata.find();  
    
    // Transform data to match Flutter app expectations
    const transformedUsers = users.map(user => ({
      _id: user._id,
      name: user.name,
      lat: user.lat,
      lng: user.lng
    }));
    
    res.status(200).json(transformedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
