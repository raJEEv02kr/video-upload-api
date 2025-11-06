const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB database 'podcast'
mongoose.connect('mongodb://localhost:27017/podcast', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected successfully to MongoDB database');
});

// Define Mongoose schema for video
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

// POST endpoint to add new video
app.post('/api/videos', async (req, res) => {
  const { title, description, videoUrl } = req.body;
  if (!title || !videoUrl) {
    return res.status(400).json({ success: false, message: 'title and videoUrl are required.' });
  }
  try {
    const video = new Video({ title, description, videoUrl });
    await video.save();
    return res.status(201).json({
      success: true,
      message: 'Video added successfully!',
      data: {
        _id: video._id,
        title: video.title,
        description: video.description,
        videoUrl: video.videoUrl,
        createdAt: video.createdAt,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET endpoint to retrieve all videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.status(200).json({ success: true, data: videos });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// DELETE endpoint to delete a video by ID
app.delete('/api/videos/:id', async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    if (!deletedVideo)
      return res.status(404).json({ success: false, message: 'Video not found.' });
    return res.status(200).json({ success: true, message: 'Video deleted.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// PUT endpoint to update video details by ID
app.put('/api/videos/:id', async (req, res) => {
  const { title, description, videoUrl } = req.body;
  const updates = {};
  if (title) updates.title = title;
  if (description) updates.description = description;
  if (videoUrl) updates.videoUrl = videoUrl;

  try {
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedVideo)
      return res.status(404).json({ success: false, message: 'Video not found.' });
    return res.status(200).json({
        success: true,
        message: 'Video updated.',
        data: updatedVideo,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
