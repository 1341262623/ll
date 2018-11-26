## Vue-项目-重点

### day-07-重点

#### 01-项目-准备-项目目录说明
1. src/
2. eslinttrc.js ESLint配置文件
3. config/ 服务器配置文件
4. build/ webpack相关文件
#### 02-项目-准备-代码规范-自定义指令-lintfix
1. package.json中的scripts 作用: 简化指令
>  "dev":"webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --open", 在cmd中 npm run dev
2. eslint会检查js代码规范
>   "lintfix":"eslint --ext .js,.vue src --fix",
> npm run lintfix

#### 03-项目-准备-element-ui-文档分析
> element-ui 是饿了么团队开发的 适用vue的PC端项目的开发

#### 04-项目-准备-element-ui-安装-引入
1. npm i element-ui -S
2. 在main.js中
  - import ElementUI from 'element-ui'
  - import 'element-ui/lib/theme-chalk/index.css'
  - Vue.use(ElementUI)

#### 05-项目-准备-项目模板简化-调整
> 将模板中无用文件/文件夹 删除

#### 06-项目-准备-git版本控制
> github (git/svn)
git init
git status
git add .
git commit -m '注释'
新建远程仓库
关联仓库
git push

#### 07-项目-登录-新建分支-login组件-配置路由
1. git branch
2. git checkout -b dev-login
3. 新建login.vue组件
4. 配置路由 index.js 导入login.vue 配置
> @指的是src下  '@/components/login/login.vue'

#### 08-项目-登录-引入表单组件
1. 找到element-ui的表单组件
2. 提供formdata
3. h3
4. <el-button></el-button>
#### 09-项目-登录-样式调整
> height:100% #app{height:100%}
> main.js 不要忘记引入 css/index.css重置层

#### 10-项目-登录-axios插件
> 把不是vue插件的axios库 改成了vue插件
1. 新建http.js
2. import axios from 'axios'
3. const MyHttpServer = {}
4. 增加install属性
```js
 MyHttpServer.install = (Vue)=>{
  <!-- 插件功能 -->
  Vue.prototype.$http = axios
}
```
5. 导出 export default MyHttpServer
6. 在main.js  Vue.use(MyHttpServer)
7. 使用: this.$http()

#### 11-项目-登录-发送登录请求
> 点击登录按钮 发送login请求
1. http.js 配置baseUrl
2. login.vue js this.$http.post()


#### 12-项目-登录-引入提示框组件
> this.$message.success(msg)

#### 13-项目-登录-登录成功-进入home组件
1. 新建home.vue
2. 配置路由 path:'/'
3. 编程式导航 this.$router.push({name:'12-项目-登录-引入提示框组件'})

#### 14-项目-登录-简化登录请求代码-async和await
> 目的: 在异步操作的外面获取到异步操作里面的结果
1. 给异步操作有结果的位置前面 加 await 通过用变量接收异步操作结果res
2. 在举例异步操作最近的函数前面加 async

#### 15-项目-登录-保存token值
> 如果用户没登录 就无法进入到home组件
1. login.vue handleLogin(){登录成功->保存token值}
2. const token = localStorage.setItem('token',data.token)

#### 16-项目-首页-布局容器-使用-样式调整
> 使用element-ui里面的布局容器
> 自定义了一些样式

#### 17-项目-首页-头部-样式调整
> layout布局
1. el-row 行
2. el-col 列
> 24份
#### 18-项目-首页-侧边栏-导航组件-文档
> el-menu
1. router 值 布尔类型
> 作用: 如果为true 点击导航时, path的值就是index的值
2. unique-opened false 是否只保持一个子菜单的展开

#### 19-项目-首页-侧边栏-引入导航组件-调整
> 每个导航的index要不同
> 图标 i class="element-ui中的图标类名"
#### 20-项目-首页-进入首页的权限验证
> 如果用户没登录 就无法进入home组件
1. beforeCreate(){}
2. 获取token
3. if 不存在 -> 登录组件
> 测试: 手动删除token

#### 21-项目-首页-头部-退出功能

#### 22-项目-首页-合并分支-新建用户分支

#### 23-项目-用户管理-用户列表-新建组件-路由配置

#### 24-项目-用户管理-用户列表-面包屑和搜索框

#### 25-项目-用户管理-用户列表-引入表格组件

#### 26-项目-用户管理-用户列表-表头处理

#### 27-项目-用户管理-用户列表-请求数据-设置请求头

#### 28-项目-用户管理-用户列表-渲染数据-一般数据

#### 29-项目-用户管理-用户列表-渲染数据-日期格式处理

#### 30-项目-用户管理-用户列表-渲染数据-用户状态开关

#### 31-项目-用户管理-用户列表-渲染数据-操作



