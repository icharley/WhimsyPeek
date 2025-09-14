const express = require("express");
const Session = require("../models/Session");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all sessions for authenticated user
router.get("/sessions", auth, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });

    res.json(sessions);
  } catch (error) {
    console.error("Get sessions error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new session
router.post("/sessions", auth, async (req, res) => {
  try {
    const { title, description, ideas } = req.body;

    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Filter out empty ideas
    const filteredIdeas = ideas
      ? ideas.filter((idea) => idea.trim() !== "")
      : [];

    const session = new Session({
      title: title.trim(),
      description: description?.trim() || "",
      ideas: filteredIdeas,
      userId: req.user._id,
    });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error("Create session error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update session
router.patch("/sessions/:id", auth, async (req, res) => {
  try {
    const { title, description, ideas } = req.body;

    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Filter out empty ideas
    const filteredIdeas = ideas
      ? ideas.filter((idea) => idea.trim() !== "")
      : [];

    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        title: title.trim(),
        description: description?.trim() || "",
        ideas: filteredIdeas,
      },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(session);
  } catch (error) {
    console.error("Update session error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete session
router.delete("/sessions/:id", auth, async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Delete session error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
