const _ = require("lodash");
const User = require("../models/user");
const formidable = require("formidable");
const fs = require("fs");

exports.userById = (req, res, next, id) => {
  User.findById(id)
    //populate followers and following array
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found!",
        });
      }

      req.profile = user; //add profile object to req
      next();
    })
    .select("name email updated created");
};

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;

  if (!authorized) {
    return res.status(203).json({
      error: "User is not authorized to perform this action!",
    });
  }
};

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status().json({
        error: err,
      });
    }

    return res.json({ users });
  }).select("name email updated created");
};

exports.getUser = (req, res) => {
  //to not show password when calling getUser
  req.profile.password = undefined;
  return res.json(req.profile);
};

// exports.updateUser = (req, res, next) => {
//   let user = req.profile;
//   //this is a method in lodash liberary, we give user object which we
//   //want to extend with updated req.body
//   user = _.extend(user, req.body); //extend - mutate the source object
//   user.updated = Date.now();
//   user.save((err) => {
//     if (err) {
//       return res.status(400).json({
//         error: "You are not authorized to perform this action!",
//       });
//     }
//     user.password = undefined;
//     res.json({ user });
//   });
// };

exports.updateUser = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be updated",
      });
    }

    //save user
    let user = req.profile;
    user = _.extend(user, fields);
    user.updated = Date.now();

    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      user.password = undefined;
      res.json(user);
    });
  });
};

exports.userPhoto = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set(("Content-Type", req.profile.photo.contentType));
    return res.send(req.profile.photo.data);
  }
  next();
};

exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  console.log(user);
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    res.json({ message: "User deleted Successfully!" });
  });
};

//follow unfollow
exports.addFollowing = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.userId,
    { $push: { following: req.body.followId } },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      next();
    }
  );
};

exports.addFollower = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.followId,
    { $push: { followers: req.body.userId } },
    { new: true }
  )
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      result.password = undefined;
      res.json(result);
    });
};

exports.removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.userId,
    { $pull: { following: req.body.unfollowId } },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      next();
    }
  );
};

exports.removeFollower = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    { $pull: { followers: req.body.userId } },
    { new: true }
  )
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      result.password = undefined;
      res.json(result);
    });
};
