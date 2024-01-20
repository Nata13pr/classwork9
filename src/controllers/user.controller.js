const User = require("../dataBase/User");
const CError = require("../error/CustomError");
const { userPresenter } = require("../presenters/user.presenter");
const { hashPassword } = require("../services/password.service");
const { uploadFile } = require("../services/s3.service");
const {
  updateOneUser,
  findUsers,
  findOneUser,
  deleteOneUser,
} = require("../services/user.service");

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;

    const updatedUser = await updateOneUser({ _id: id }, req.body);

    const userForResponse = userPresenter(updatedUser);

    res.status(201).json(userForResponse);
  } catch (e) {
    next(e);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await findUsers(req.query).exec();

    const userForResponse = users.map((u) => userPresenter(u));

    res.json(userForResponse);
  } catch (e) {
    next(e);
  }
}

async function getById(req, res, next) {
  try {
    const { userId = "" } = req.params;

    const user = await findOneUser({ _id: userId });

    if (!user) {
      throw new CError(`User with ID ${userId} is not found`, 404);
    }

    res.json(user);
  } catch (e) {
    next(e);
  }
}

async function createUser(req, res, next) {
  try {
    console.log("77777777777777777", req.files);
    const avater = "gfdfdg";

    const hashedPassword = await hashPassword(req.body.password);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const { Location } = await uploadFile(
      req.files.userAvatar,
      "user",
      user._id
    );

    const userWithPhoto = await User.findByIdAndUpdate(
      user._id,
      { avatar: Location },
      { new: true }
    );

    res.status(201).json(userWithPhoto);
  } catch (e) {
    next(e);
  }
}

//з схеми
// async function createUser(req, res, next) {
//   try {
//     const user = await User.createWithHashPassword(req.body);

//     res.status(201).json(user);
//   } catch (e) {
//     next(e);
//   }
// }

async function deleteUser(req, res, next) {
  try {
    const { userId = "" } = req.params;

    await deleteOneUser({ _id: userId });

    res.status(204).json("User was deleted");
  } catch (e) {
    next(e);
  }
}

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  getById,
  updateUser,
};
