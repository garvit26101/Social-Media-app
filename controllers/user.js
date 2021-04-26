const _ = require("lodash");
const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id)
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

exports.updateUser = (req, res, next) => {
  let user = req.profile;
  //this is a method in lodash liberary, we give user object which we
  //want to extend with updated req.body
  user = _.extend(user, req.body); //extend - mutate the source object
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: "You are not authorized to perform this action!",
      });
    }
    user.password = undefined;
    res.json({ user });
  });
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
