const userdata = require('../model/usercredential');

// Update employee location
exports.updateLocation = async (req, res) => {
  try {
    const { employeeId, lat, lng } = req.body;

    if (!employeeId || lat === undefined || lng === undefined) {
      return res.status(400).json({ 
        message: 'Missing required fields: employeeId, lat, lng' 
      });
    }

    // Find and update user location
    const updatedUser = await userdata.findOneAndUpdate(
      { userid: employeeId }, // or use _id if that's what Flutter sends
      { 
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        lastUpdated: new Date()
      },
      { new: true, upsert: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ 
        message: 'Employee not found' 
      });
    }

    console.log(`Location updated for employee ${employeeId}: lat=${lat}, lng=${lng}`);

    res.status(200).json({ 
      message: 'Location updated successfully',
      employee: {
        employeeId: updatedUser.userid,
        name: updatedUser.name,
        lat: updatedUser.lat,
        lng: updatedUser.lng
      }
    });

  } catch (error) {
    console.error('Location update error:', error);
    res.status(500).json({ 
      message: 'Error updating location', 
      error: error.message 
    });
  }
};

// Get single employee location
exports.getEmployeeLocation = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await userdata.findOne({ userid: employeeId });

    if (!employee) {
      return res.status(404).json({ 
        message: 'Employee not found' 
      });
    }

    res.status(200).json({
      employeeId: employee.userid,
      name: employee.name,
      lat: employee.lat,
      lng: employee.lng,
      lastUpdated: employee.lastUpdated
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching location', 
      error: error.message 
    });
  }
};
