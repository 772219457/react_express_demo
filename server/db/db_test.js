/**
 * 测试mongoose
 * */
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

mongoose.connect('mongodb://localhost:27017/gzhipin_test2')

mongoose.connection.on('connected', () => {
    console.log('数据库连接成功！')
})


// 2. 得到对应特定集合的 Model
// 2.1. 字义 Schema(描述文档结构)
const userSchema = mongoose.Schema({
    username: {type: String, required: true}, // 用户名
    password: {type: String, required: true}, // 密码
    userType: {type: String, required: true}, // 用户类型: dashen/laoban
    userImg: String
})
// 2.2. 定义 Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('user', userSchema) // 集合名: users 自动生成集合名users

/**
 *通过 Model 或其实例对集合数据进行 CRUD 操作
 */
// 通过 Model 实例的 save()添加数据
function testSave() {
    const user = {
        username: 'xiaoeyu',
        password: md5('123456'),
        userType: 'BOSS',
    }
    const userModel = new UserModel(user)
    userModel.save((err,doc)=>{
        if(!err){
            console.log('成功')
        }
    })
}
// testSave() 调用保存数据方法

// 过 Model 的 find()/findOne()查询多个或一个数据
function testFind() {
    UserModel.find((err,doc)=>{ // 如果有匹配条件返回的是一个符合条件的[user, user..], 如果 没有一个匹配的返回[]
        if(!err){
            console.log(doc)
        }
    })
    UserModel.findOne({_id:'5cf3bd46d65d250938ca347e'},(err,doc)=>{ // 如果 有匹配返回的是一条数据 doc, 如果没有一个匹配的返回 null
        if(!err){
            console.log('findOne',doc)
        }
    })
}
// testFind() // 调用查询数据方法

// 通过 Model 的 findByIdAndUpdate()更新某个数据
function testUpdate() {
    UserModel.findByIdAndUpdate({_id: '5cf3ba838f699c091c526448'},{username:'xiaomiaomiao'},(err,doc)=>{
        if(!err){
            console.log(doc) // 返回旧的username的那条数据
        }
    })
}
// testUpdate()

// 通过 Model 的 remove()删除匹配的数据
function testRemove() {
    UserModel.remove({_id: '5cf3ba838f699c091c526448'},(err,doc)=>{
        if(!err){
            console.log(doc)
        }
    })
}
testRemove()
