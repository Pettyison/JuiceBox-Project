const express = require("express");
const { getAllTags, getPostsByTagName } = require("../db");
const tagsRouter = express.Router();

tagsRouter.use((reg, res, next) => {
  console.log("A request is being made to /tags");
  next();
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;
  try {
    const allPostsWithTagName = await getPostsByTagName(tagName);
    const postsWithTagName = allPostsWithTagName.filter((post) => {
      if (post.active) {
        return true;
      }
      if (req.user && post.author.id === req.user.id) {
        return true;
      }
      return false;
    });
    res.send({ posts: postsWithTagName });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;
