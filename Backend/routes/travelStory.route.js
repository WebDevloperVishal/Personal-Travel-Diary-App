 // Travel story routes - handles all story-related API endpoints
import express from "express"
import { verifyToken } from "../utils/verifyUser.js" // Auth middleware
import {
    addTravelStory, deleteImage, deleteTravelStory, editTravelStory, filterTravelStories, getAllTravelStory, imageUpload, searchTravelStory, updateIsFavourite,
} from "../controllers/travelStory.controller.js"
import upload from "../multer.js" // File upload configuration

const router = express.Router()

// IMAGE ROUTES
router.post("/image-upload", upload.single("image"), imageUpload) // Upload single image
router.delete("/delete-image", deleteImage) // Remove uploaded image

// STORY CRUD OPERATIONS (all require authentication)
router.post("/add", verifyToken, addTravelStory) // Create new story
router.get("/get-all", verifyToken, getAllTravelStory) // Get user's stories
router.post("/edit-story/:id", verifyToken, editTravelStory) // Update story by ID
router.delete("/delete-story/:id", verifyToken, deleteTravelStory) // Delete story by ID

// STORY FEATURES
router.put("/update-is-favourite/:id", verifyToken, updateIsFavourite) // Toggle favorite status
router.get("/search", verifyToken, searchTravelStory) // Search stories by keyword
router.get("/filter", verifyToken, filterTravelStories) // Filter stories by criteria

export default router 