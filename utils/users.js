const users = [];

// chat에 들어온 user
function userJoin(id, username){
    const user = { id, username };
    users.push(user);
    return user;
}

// 유저 불러오기
function getCurrentUser(id){
    return users.find(user => user.id === id);
}

module.exports = {
    userJoin,
    getCurrentUser
};