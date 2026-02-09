const Video = require('../model/videomodel');

// Upload video
exports.uploadVideo = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const newVideo = new Video({
      employeeId,
      videoUrl: req.file.path
    });

    await newVideo.save();

    res.status(200).json({
      message: "Video uploaded successfully",
      video: newVideo
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
