const express = require('express');
const router = express.Router();
const {UserModel,ChatModel} = require('../db/models')
const md5 = require('blueimp-md5')
const filter = {password: 0, __v: 0} // 对数据查询的数据过滤掉特别的属性

/**
 * GET home page
 * */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


/**
 * 注册接口
 * */
router.post('/register', (req, res, next) => {
    const {username, password, userType} = req.body

    UserModel.findOne({username}, (err, userDoc) => {
        if (userDoc) { //判断是否存在用户
            res.send({
                code: 1,
                msg: '账号名已存在'
            })
        } else { //保存用户，注册成功
            new UserModel({username, password: md5(password), userType}).save((err, user) => {
                const data = {username, userType, _id: user._id}
                // 生成一个 cookie(userid: user._id), 并交给浏览器保存
                res.cookie('userId', user._id, {maxAge: 1000 * 60 * 60 * 7})
                res.send({code: 0, data})
            })
        }
    })
})


/**
 * 登录接口
 * */
router.post('/login', (req, res, next) => {
    const {username, password} = req.body

    UserModel.findOne({username,password:md5(password)}, filter, (err, userDoc) => { // filter过滤掉指定的属性
        if (userDoc) { //判断是否存在用户
            const data = userDoc
            // 生成一个 cookie(userid: user._id), 并交给浏览器保存
            res.cookie('userId', userDoc._id, {maxAge: 1000 * 60 * 60 * 7})
            res.send({code: 0, data})
        } else {
            res.send({
                code: 1,
                msg: '账号或者密码错误'
            })
        }
    })
})

/**
 * 信息完善
 * */
router.post('/infoUpdate', (req, res, next) => {
    // 从请求中得到userId
    const userId = req.cookies.userId //请求自带

    if(!userId) {
        return res.send({
            code: 1,
            msg: '请先登录'
        })
    }

    // 根据userId去更新信息
    const userInfo = req.body

    UserModel.findByIdAndUpdate({_id:userId}, userInfo, (err, oldUserDoc) => { // filter过滤掉指定的属性
        if (!oldUserDoc) { //判断是否成功
            res.clearCookie('userId')
            res.send({
                code: 1,
                msg: '请先登录'
            })
        } else {
            const {_id,username,userType} = oldUserDoc
            const data = Object.assign({_id,username,userType},userInfo)
            res.send({
                code: 0,
                data: data
            })
        }
    })
})

router.get('/user', (req, res, next) => {
    const userId = req.cookies.userId //请求自带

    UserModel.findOne({_id:userId}, filter, (err, userDoc) => { // filter过滤掉指定的属性
        if (userDoc) { //判断是否存在用户
            const data = userDoc
            // 生成一个 cookie(userid: user._id), 并交给浏览器保存
            res.cookie('userId', userDoc._id, {maxAge: 1000 * 60 * 60 * 7})
            res.send({code: 0, data})
        } else {
            res.clearCookie('userId')
            res.send({
                code: 1,
                msg: '请先登录'
            })
        }
    })
})

router.get('/userList', (req, res, next) => {
    const {userType} = req.query
    UserModel.find({userType},filter,(err, userDoc) => {
        if (userDoc) { //判断是否有值
            const data = userDoc
            res.send({code: 0, data})
        } else {
            res.send({
                code: 1,
                msg: '网络错误'
            })
        }
    })
})

router.get('/msgList', (req, res, next) => {
    const userId = req.cookies.userId
    let users = {}
    UserModel.find((err,userDocs) => {
        users = userDocs.reduce((users, user) => {
            users[user._id] = {username: user.username, headImg: user.headImg}
            return users
        },{})

    })
    ChatModel.find({'$or':[{from:userId},{to:userId}]},filter,(err,chatMsgs) => {
        res.send({code:0, data: {users, chatMsgs}})
    })
})

router.post('/readMsg', (req, res, next) => {
    const from = req.body.from
    const to = req.cookies.userId

    ChatModel.update({from,to,read: false},{read: true},{multi: true},(err,chatMsgs) => {
        res.send({code:0, data: chatMsgs.nModified}) // 更新的数量
    })
})


module.exports = router;
