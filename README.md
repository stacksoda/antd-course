# antd-course
antd官方教程学习

## 初始化项目
在github上建立一个项目 拷贝到本地
init npm
``` node 
npm init
```
## 安装`umi`依赖
``` node 
npm install umi --save-dev
```
## 初始化umi配置
配置文件被约定为 `config/config.js`,也可以简单的使用`.umirc.js`来作为配置文件,二者选择一个即可
`config/config.js`中初始化的内容如下:
``` javascript
export default {};
```
改配置文件export了一个空对象，没有什么实际的作用

在`umi`中约定的存放页面代码文件夹为`pages`若想用单数`page`来作为目标文件夹,则更改配置文件为
``` javascript
export default {
    singular: true,
}
```
## 配置路由
在配置文件 `config/config.js`中添加如下配置:
``` javascript
export default {
    routes: [{
        path: '/',
        component: './HelloWorld',
    }]
}
```
## 在对应目录下构建组件
``` javascript
export default () => (
    <h1>Hello World!</h1>
)
```

## 添加构建指令
`package.json`
``` javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "umi dev",
    "build": "umi build"
  },
```

## 执行dev命令
``` node 
npm run dev
```

## 上传项目
``` node 
git add .
git commit -m 'antd-course init'
git push origin master
```

## 添加`umi-plugin-react`插件
`npm install umi-plugin-react --save-dev`,然后在配置文件`config/config.js` 并引入antd
``` javascript
export default {
    // ...
    plugins: [
        ['umi-plugin-react',{
            antd: true
        }],
    ],
}
```

脚手架中自带了 antd 否则需要安装
``` node 
npm install --save antd
```
## 受控组件与非受控组件
"受控"组件指组件的值可以被外部修改的组件
"非受控"组件指组件的值由自己维护，即未向外暴露value属性,组件的状态由组件自己维护的组件
