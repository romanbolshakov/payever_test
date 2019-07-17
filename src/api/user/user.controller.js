const userService = require('../../services/user.service');

exports.getUser = async (req, res, next) => {
  try{
    const userId = req.params.userId;
    const userData = await userService.getRemoteUserInfo(userId);
    return res.json({
      response: userData
    })
  } catch(err){
    next(err);
  }
}

exports.getUserAvatar = async (req, res, next) => {
  try{  
    const userId = req.params.userId;
    const userAvatar = await userService.getUserAvatar(userId);
    return res.json({
      response: userAvatar
    })
  }catch(err){
    next(err);
  }
}

exports.deleteUserData = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const isGood = await userService.deleteUserData(userId);
    return res.json({
      response: isGood
    })
  } catch (err) {
    next(err);
  }
}