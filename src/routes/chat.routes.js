const {Router} = require('express');
const { route } = require('../app');
const router = Router();

const {renderIndex, renderChat} = require('../controller/chat.controller');

router.get('/', renderIndex);

router.get('/chat/:username', renderChat);


module.exports = router;