const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const { auth, permit } = require("../middleware/auth");
const { summarizeWithLLM } = require("../llm");
const { summarize } = require("../llm/gemini");;
// create article
router.post("/", auth, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const article = new Article({ title, content, tags: tags || [], createdBy: req.user._id });
    await article.save();
    res.status(201).json(article);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// get all (with optional pagination/search)
router.get("/", auth, async (req, res) => {
  const { q, tag, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (q) filter.$or = [{ title: new RegExp(q,"i") }, { content: new RegExp(q,"i") }];
  if (tag) filter.tags = tag;
  const skip = (page - 1) * limit;
  const items = await Article.find(filter).populate("createdBy","email name").sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
  res.json(items);
});

// get single
router.get("/:id", auth, async (req, res) => {
  const article = await Article.findById(req.params.id).populate("createdBy","email name");
  if (!article) return res.status(404).json({ message: "Not found" });
  res.json(article);
});

// update (owner or admin)
router.put("/:id", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Not found" });
    const isOwner = article.createdBy.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    // versioning
    article.versions.push({
      content: article.content,
      summary: article.summary,
      editedAt: new Date(),
      editedBy: req.user._id
    });

    article.title = req.body.title ?? article.title;
    article.content = req.body.content ?? article.content;
    article.tags = req.body.tags ?? article.tags;
    await article.save();
    res.json(article);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// delete (admin only)
router.delete("/:id", auth, permit("admin"), async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// summarize endpoint (rate-limit optional)

router.post("/:id/summarize", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    console.log(article);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    console.log("🧠 Summarizing article:", article.title);

    // Call Gemini directly (no provider param)
    const summary = await summarize(article.content);
    console.log(summary)

    // Save the summary
    article.summary = summary;
    await article.save();

    res.json({
      message: "✅ Summary generated successfully using Gemini AI",
      summary,
    });
  } catch (err) {
    console.error("❌ Error generating summary:", err);
    res.status(500).json({
      message: "Failed to generate summary using Gemini AI",
      error: err.message,
    });
  }
});

module.exports = router;
