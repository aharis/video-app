import { errorHandler } from "../utils/errorHandling.js";
import Video from "../models/Video.js";
import { status } from "../utils/statuses.js";

const createVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const createVideo = await newVideo.save();
    res.status(status.success).json(createVideo);
  } catch (error) {
    next(errorHandler(401, "Error crating video", error));
  }
};

const updateVideo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const video = await Video.findById(id);
    if (!video)
      return next(errorHandler(status.notFound, "No video with this ID"));
    if (req.user.id === video.userId) {
      const updateVideo = await Video.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(status.success).json(updateVideo);
    } else {
      return next(errorHandler(404, "Video not found!"));
    }
  } catch (error) {
    next(errorHandler(status.serverError, "Error updating video", error));
  }
};

const deleteVideo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const video = await Video.findById(id);
    if(!video) return next(errorHandler(404, 'This video does not exist'))
    if(id === video.userId) {// Check userId is it string here
      await Video.findByIdAndDelete(id);
      res.status(status.success).json("Video deleted");
    }else {
      return next(errorHandler(403, 'You can delete only your video!'))
    }
  } catch (error) {
    next(errorHandler(status.serverError, "Error deleting video", error));
  }
};

const getVideo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const getVideo = await Video.findById(id);
    res.status(status.success).json(getVideo);
  } catch (error) {
    next(errorHandler(500, "Failed to find video", error));
  }
};

const addView = async (req, res, next) => {
  const id = req.params.id;
  try {
    const addView = await Video.findById(id, {
      $inc: { views: 1 },
    });
    res.status(status.success).json("The view has been incrised");
  } catch (error) {
    next(errorHandler(500, "Failed to find video", error));
  }
};

const getRandomVideos = async (req, res, next) => {
  const id = req.params.id;
  try {
    const getVideo = await Video.findById(id);
    res.status(status.success).json(getVideo);
  } catch (error) {
    next(errorHandler(500, "Failed to find video", error));
  }
};

const getTrends = async (req, res, next) => {
  const id = req.params.id;
  try {
    const getVideo = await Video.findById(id);
    res.status(status.success).json(getVideo);
  } catch (error) {
    next(errorHandler(500, "Failed to find video", error));
  }
};

const subscribe = async (req, res, next) => {
  const id = req.params.id;
  try {
    const getVideo = await Video.findById(id);
    res.status(status.success).json(getVideo);
  } catch (error) {
    next(errorHandler(500, "Failed to find video", error));
  }
};

export { createVideo, updateVideo, deleteVideo, getVideo, addView, getTrends, getRandomVideos, subscribe };
