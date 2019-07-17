const axios = require('axios');
const fs = require('fs');
const path = require('path');

const getRemoteUserInfo = async (userId) => {
  // TODO: impl error handle
  const config = {};
  const url = `https://reqres.in/api/users/${userId}`;
  const response = await axios.get(url, config);
  return response.data.data;
}

const getUserAvatar = async (userId) => {
  // TODO: impl error handle
  // TODO: check image extension
  const imageFilename = getAvatarFilepath(userId);
  const isExists = fs.existsSync(imageFilename);
  if (isExists){
    let image = fs.readFileSync(imageFilename);
    let imageBffer = new Buffer(image);
    return imageBffer.toString('base64');
  }else {
    const userInfo = await getRemoteUserInfo(userId)
    const avatarUrl = userInfo.avatar;
    const result = await axios.request({
      responseType: 'arraybuffer',
      url: avatarUrl,
      method: 'get',
      headers: {}
    });
    fs.writeFileSync(imageFilename, result.data);
    return new Buffer(result.data).toString('base64');
  }

}

const deleteUserData = async (userId) => {
  const imageFilename = getAvatarFilepath(userId);
  fs.unlinkSync(imageFilename);
  return true;
}

const getAndSaveUserListPage = async (page, fileName) => {
  try{
    const config = {};
    const url = `https://reqres.in/api/users?page=${page}`;
    const response = await axios.get(url, config);
    const totalPages = response.data.total_pages;
    if (page > totalPages) return;
    const users = response.data.data;
    if (fs.existsSync(fileName)){
      let raw = await fs.readFileSync(fileName);
      let savedUserData = JSON.parse(raw);
      // TODO: check for unique
      let newUserList = savedUserData.concat(users);
      await fs.writeFile(fileName, JSON.stringify(newUserList));
    }
    else {
      await fs.writeFile(fileName, JSON.stringify(users));
    }
    return true;
  }catch(err){
    return false;
  }
}

// PRIVATE

const getAvatarFilepath = (userId) => {
  return path.resolve(__dirname, '../../uploads', `${userId}.jpg`);
}

module.exports = {
  getRemoteUserInfo,
  getUserAvatar,
  deleteUserData,
  getAndSaveUserListPage
}