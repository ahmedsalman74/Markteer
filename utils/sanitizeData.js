

exports.sanitizeUser = function(user) {
    return {
      _id: user._id,
      email: user.email,
      name: user.name
    };
  };
