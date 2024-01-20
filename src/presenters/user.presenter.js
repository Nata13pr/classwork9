module.exports = {
  userPresenter : ( user ) => {
    return {
      _id : user._id,
      brand : user.brand,
      email : user.email,
      year : user.year,
      createdAt : user.createdAt,
      updatedAt : user.updatedAt,
    };
  },
};
