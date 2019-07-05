<b>react,node.js,学习demo,boss直聘项目</b>


## 分支说明：

master分支：前后端统一开发的版本；可以用于学习nodejs+mongodb+express+react+redux相关知识；


## 技术栈

**前端技术栈：** react + redux + ES6/7 + less + an

**服务端技术栈：** nodejs + express  + mongodb

**网络协议：** http + sockieIO




## 前序准备

**运行前准备：**

1、需要在本地调试及开发：

   由于此项目是基于nodejs和mongodb的前后端结合项目，你需要进行nodejs和mongodb的相关准备工作。项目运行之前，请确保系统已经安装以下应用：
   
   (1)、node (6.0 及以上版本)。使用细节，请参考：[node的下载及安装。](https://nodejs.org/en/download/)
   
   (2)、mongodb 。使用细节，请参考：[mongodb的下载及使用。](https://pan.baidu.com/s/1jIxPJrK)【下载，db/log配置，开启服务，use touzi，导入数据】
   
   (3)、robomongod。使用细节，请参考：[robomongod的下载及使用。](https://pan.baidu.com/s/1hsQuc08)（注意：mongodb可视化视图工具，本项目不是必须安装，主要用于方便查看数据库数据）。
        

## 功能
 - 登录/退出 -- 完成
 - 首页 -- 完成
 - 用户列表 -- 完成
 - 信息列表 -- 完成
 - 注册 -- 完成
 - 查看求职者或者boss信息 -- 完成
 - 聊天 -- 完成

## 目录结构
```shell
├── server                     // node服务端
│   ├── public                 // 静态资源
│   ├── db                     // db数据模型定义
│   ├── bin/www                // express服务器启动项
│   ├── route/index.js         // api接口
├── src                        // 源代码
│   ├── assets                 // 图片,样式等静态资源
│   ├── components             // 全局公用组件
│   ├── containers             // 项目布局组件和页面
│   ├── redux                  // redux数据存储器
│   ├── api                    // 封装ajax请求
│   ├── sockieIO               // sockieIO协议
│   ├── utils                  // 全局公用方法
│   ├── index.js               // 入口 加载组件 初始化


## License 网上学习视频，哔哩哔哩搜索尚硅谷

