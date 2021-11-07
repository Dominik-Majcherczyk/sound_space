import express from "express";
import { getSongs, addSong, updateSong, deleteSong } from "./../controllers/songs.js";
const router = express.Router();

router.get("/", getSongs);
router.post("/", addSong);
router.patch("/:id", updateSong);
router.delete("/:id", deleteSong);
export default router;
