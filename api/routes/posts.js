const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
//create a post
router.post("/", async (req, res) => {
  await Post.sync()
  const newPost = Post.build(req.body);
  try {
    const savedPost = await newPost.save();
    console.log("ffffffffffffffffffffffffffff",savedPost);
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    console.log(post.userId);
    console.log(req.body.userId);
    if (post.userId == req.body.userId) {
      await post.update(req.body)
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post.userId == req.body.userId) {
      await post.destroy();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like  a post//dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post.likes.includes((req.body.userId).toString())) {
      await post.likes.push(req.body.userId)
      await post.changed('likes', true);
      await post.save()
      res.status(200).json("The post has been liked");
    } else {
      await post.likes.pop(req.body.userId)
      await post.changed('likes', true);
      await post.save()
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
let userId =(req.params.userId)
    const currentUser = await User.findByPk(userId);
    console.log('userId:', userId);
    if(typeof userId == "string")
    console.log("string value");
  else
    console.log("Not a string");
    const userPosts = await Post.findAll({
      where: {
        userId:currentUser.id.toString()
      }
    });
    console.log('userPosts:', userPosts );
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.findAll({   
          where: {
            userId: friendId
          }
        });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
//get user's all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    });
    const posts = await Post.findAll({
      where: {
        userId: user.id.toString()
      }
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;