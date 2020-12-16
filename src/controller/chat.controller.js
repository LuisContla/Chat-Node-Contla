const chatCtrl = {};
const path = require('path');

chatCtrl.renderIndex = (req, res) => {
    return res.sendFile(path.join(__dirname , '../public/index.html'));
}

chatCtrl.renderChat = (req, res) => {
    return res.sendFile(path.join(__dirname , '../public/chat.html'));
}

module.exports = chatCtrl;