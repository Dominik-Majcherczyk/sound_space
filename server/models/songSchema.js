import mongoose from "mongoose";

const songSchema = mongoose.Schema({
   title: String,
   author: String,
   tags: [String],
   selectedFile: String,
   source: String,
   songURL: String,
   description: String,
   likes: {
      type: [String],
      default: [],
   },
   comments: {
      type: [String],
      default: [],
   },
   createdAt: {
      type: Date,
      default: new Date(),
   },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
