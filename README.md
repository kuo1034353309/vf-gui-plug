## 调试

1. 安装 vs code 插件 Live Server && npm i

2. packages 目录中建立相关 ts 文件 , 参考 testButton 示例

3. 执行 npm run watch 开启监听

4. 修改 index.html 中 importScript 路径为当前修改示例路径。

5. vs code 中，选择 index.html 右键，选择 open with Live Server 启动服务

6. 愉快的调试吧


## 压缩js

node node_modules/uglify-js/bin/uglifyjs file.js -o file.min.js

## 注意

1.类名与文件命名保持一致

2.打包方式为 umd , 不支持多文件导入。

3.由于是裸鞋ts，并且输出是es5，所以，请不要写es6的东西。

## vf使用

资源中，添加相关的js路径，name为类名，type类型为js

组件中，可以初始化插件，type为name类名

```
"assets": {
        "id":{
            "name": "TestButton",
            "type": "js",
            "url": "http://www.xxxx.com/TestButton.js"
        },
}

"components": {
    "id": {
        "name": "xxxx",
        "type": "TestButton",
        "text": "11111"
    },
}
```
