const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByPk(req.params.id)
      await user.update(req.body)
      await user.save();
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});
//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByPk(req.params.id);
      await user.destroy();
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});
//get a user
// router.get("/:id", async (req, res) => {
//   try {
//       const id = parseInt(req.params.id);
//       let user = await User.findOne({ where: {id: id} });
//       //not necessary properties // dont want to get it 
//       // delete user.dataValues['password']
//       const { password, updatedAt, ...other } = user.dataValues;
//     res.status(200).json(other);
//   } catch (err) {
//       console.log(err);
//     res.status(500).json(err);
//   }
// });
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId 
    ? await User.findByPk(userId)
    : await User.findOne({
        where: {
          username: username
        }
      });
    const {
      password,
      updatedAt,
      ...other
    } = user.dataValues;
    res.status(200).json(other);
  } catch (err) {
    // res.status(500).json(err);
    console.log(err);
  }
});

//get friends//followings list
// router.get("/friends/:userId", async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.userId);
//     const friends = await Promise.all(
//       user.followings.map((friendId) => {
//         return User.findByPk(friendId);
//       })
//     );
//     let friendList = [];
//     friends.map((friend) => {
//       const {
//         id,
//         username,
//         profilePicture
//       } = friend;
//       friendList.push({
//       id,
//         username,
//         profilePicture
//       });
//     });
//     res.status(200).json(friendList)
//   } catch (err) {
//     res.status(500).json(err);
//     console.log(err);
//   }
// });
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findByPk(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const {
        id,
        username,
        profilePicture
      } = friend;
      friendList.push({
        id,
        username,
        profilePicture
      });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});
//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userId = req.body.userId
      const user = await User.findByPk(req.params.id);
      const currentUser = await User.findByPk(req.body.userId);
      if (!user.followers.includes(userId.toString())) {
        await user.followers.push(req.body.userId)
        await user.changed('followers', true);
        await user.save()
        await currentUser.followings.push(req.params.id)
        await currentUser.changed('followings', true);
        await currentUser.save()
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      // res.status(500).json(err);
      console.log(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});
//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userId = req.body.userId
      const user = await User.findByPk(req.params.id);
      const currentUser = await User.findByPk(req.body.userId);
      if (user.followers.includes(userId.toString())) {
        await user.followers.pop(req.body.userId);
        await user.changed('followers', true);
        await user.save()
        await currentUser.followings.pop(req.params.id);
        await currentUser.changed('followings', true);
        await currentUser.save()
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

module.exports = router;