## Vue-项目-重点

### day-07-重点

#### 01-项目-准备-项目目录说明

1. src/
2. eslinttrc.js ESLint 配置文件
3. config/ 服务器配置文件
4. build/ webpack 相关文件

#### 02-项目-准备-代码规范-自定义指令-lintfix

1. package.json 中的 scripts 作用: 简化指令
   > "dev":"webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --open", 在 cmd 中 npm run dev
2. eslint 会检查 js 代码规范
   > "lintfix":"eslint --ext .js,.vue src --fix",
   > npm run lintfix

#### 03-项目-准备-element-ui-文档分析

> element-ui 是饿了么团队开发的 适用 vue 的 PC 端项目的开发

#### 04-项目-准备-element-ui-安装-引入

1. npm i element-ui -S
2. 在 main.js 中

- import ElementUI from 'element-ui'
- import 'element-ui/lib/theme-chalk/index.css'
- Vue.use(ElementUI)

#### 05-项目-准备-项目模板简化-调整

> 将模板中无用文件/文件夹 删除

#### 06-项目-准备-git 版本控制

> github (git/svn)
> git init
> git status
> git add .
> git commit -m '注释'
> 新建远程仓库
> 关联仓库
> git push

#### 07-项目-登录-新建分支-login 组件-配置路由

1. git branch
2. git checkout -b dev-login
3. 新建 login.vue 组件
4. 配置路由 index.js 导入 login.vue 配置
   > @指的是 src 下 '@/components/login/login.vue'

#### 08-项目-登录-引入表单组件

1. 找到 element-ui 的表单组件
2. 提供 formdata
3. h3
4. <el-button></el-button>

#### 09-项目-登录-样式调整

> height:100% #app{height:100%}
> main.js 不要忘记引入 css/index.css 重置层

#### 10-项目-登录-axios 插件

> 把不是 vue 插件的 axios 库 改成了 vue 插件

1. 新建 http.js
2. import axios from 'axios'
3. const MyHttpServer = {}
4. 增加 install 属性

```js
 MyHttpServer.install = (Vue)=>{
  <!-- 插件功能 -->
  Vue.prototype.$http = axios
}
```

5. 导出 export default MyHttpServer
6. 在 main.js Vue.use(MyHttpServer)
7. 使用: this.\$http()

#### 11-项目-登录-发送登录请求

> 点击登录按钮 发送 login 请求

1. http.js 配置 baseUrl
2. login.vue js this.\$http.post()

#### 12-项目-登录-引入提示框组件

> this.\$message.success(msg)

#### 13-项目-登录-登录成功-进入 home 组件

1. 新建 home.vue
2. 配置路由 path:'/'
3. 编程式导航 this.\$router.push({name:'12-项目-登录-引入提示框组件'})

#### 14-项目-登录-简化登录请求代码-async 和 await

> 目的: 在异步操作的外面获取到异步操作里面的结果

1. 给异步操作有结果的位置前面 加 await 通过用变量接收异步操作结果 res
2. 在举例异步操作最近的函数前面加 async

#### 15-项目-登录-保存 token 值

> 如果用户没登录 就无法进入到 home 组件

1. login.vue handleLogin(){登录成功->保存 token 值}
2. const token = localStorage.setItem('token',data.token)

#### 16-项目-首页-布局容器-使用-样式调整

> 使用 element-ui 里面的布局容器
> 自定义了一些样式

#### 17-项目-首页-头部-样式调整

> layout 布局

1. el-row 行
2. el-col 列
   > 24 份

#### 18-项目-首页-侧边栏-导航组件-文档

> el-menu

1. router 值 布尔类型
   > 作用: 如果为 true 点击导航时, path 的值就是 index 的值
2. unique-opened false 是否只保持一个子菜单的展开

#### 19-项目-首页-侧边栏-引入导航组件-调整

> 每个导航的 index 要不同
> 图标 i class="element-ui 中的图标类名"

#### 20-项目-首页-进入首页的权限验证

> 如果用户没登录 就无法进入 home 组件

1. beforeCreate(){}
2. 获取 token
3. if 不存在 -> 登录组件
   > 测试: 手动删除 token

#### 21-项目-首页-头部-退出功能

```js
 handleloginout(){
      // 1. 提示
      this.$message.success('退出成功')
      // 2. 清除
      localStorage.clear()
      // 3. 回到login组件
      this.$router.push({name:'login'})
    }
```

#### 22-项目-首页-合并分支-新建用户分支

1. git branch
2. git checkout master
3. git merge dev-login(合并分支)
4. git push
5. git checkout -b dev-users

#### 23-项目-用户管理-用户列表-新建组件-路由配置

1. home.vue el-menu 开启导航的路由模式
2. home.vue main <router-view>
3. 新建 users.vue
4. 路由配置 home 组件的配置中写 children:[path:'/users']

### day-08-重点

#### 01-项目-用户管理-用户列表-面包屑和搜索框

1. el-card 小容器
2. 面包屑 el-breadcrumb
3. el-row>el-col > 搜索框 el-input+添加用户的按钮 el-button
4. 给 el-input 绑定数据 query

#### 02-项目-用户管理-用户列表-引入表格组件

> el-table

1. :data="网络请求返回的数据数组 list"
2. el-table-column label->表头 prop->list 中每个对象的 key 单元格的数据
3. 表格的行数 和 list 数组长度有关

#### 03-项目-用户管理-用户列表-表头处理

> type 属性值是 index 时 每行会显示索引(从 1 开始)

```html
<el-table-column type="index" label="#" width="80"> </el-table-column>
```

#### 04-项目-用户管理-用户列表-请求数据

> 除了登录之外的请求 需要设置请求头 (授权)

1. 设置请求头

```js
const AUTH_TOKEN = localStorage.getItem('token')
this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
```

2. created(){this.getUserList()} 发送请求
3. 处理响应
   3.1 this.userlist = res.data.data.users
   3.2 this.total = res.data.data.total
4. 在表格视图中 通过 prop 绑定单元格要显示的数据

#### 05-项目-用户管理-用户列表-渲染数据-一般数据

1. el-table 绑定数据 userlist
2. js data 中 提供了 userlist
3. methods getUserList(){获取了用户列表数据 this.userlist = res.data.data.users}
4. prop="users 中的 key 名"
   > 一般数据: 单元格显示的数据是文本(字符串)

#### 06-项目-用户管理-用户列表-渲染数据-日期格式处理

1. main.js 定义过滤器
2. 处理日期
   2.1 prop="create_time | fmtdate" 不行!
   2.2 在<el-table-column></el-table-column>内部写{{create_time | fmtdate}} 不行!
3. 如果 el-table-column 单元格内部数据不是字符串 需要提供容器 template
   3.1 <el-table-column><template>{{create_time | fmtdate}}</tempalte></el-table-column>不行!
4. 在 template 通过 slot-scope 进行传值
   4.1 slot-scope 会自动找外层数据 "scope"就相当于 el-table 所绑定的数据 userlist
   4.2 scope.row 指的是 userlist 每个对象
   4.3 最终写法

```html
<el-table-column label="创建日期">
  <!--
    如果单元格的内容不是字符串/文本 需要给要展示的内容外层包裹一个tempalte
  -->
  <!-- slot-scope 传值 userlist是外层容器绑定的数据 -->
  <template slot-scope="scope">
    <!-- {{create_time | fmtdate}} -->
    <!-- userlist中的每个对象中的create_time -->
    {{scope.row.create_time |fmtdate}}
  </template>
</el-table-column>
```

#### 07-项目-用户管理-用户列表-渲染数据-用户状态开关

> el-switch 开关组件

1. 单元格里面不是文本内容 提供容器 template
2. slot-scope="scope"
3. 开关组件 v-model="scope.row.mg_state"

```html
<el-table-column label="用户状态">
  <template slot-scope="scope">
    <el-switch
      v-model="scope.row.mg_state"
      active-color="#13ce66"
      inactive-color="#ff4949"
    >
    </el-switch>
  </template>
</el-table-column>
```

#### 08-项目-用户管理-用户列表-渲染数据-操作

> 操作中显示三个按钮

1. 提供容器 template slot-scope="scope"
2. el-button plain size="mini" circle

#### 09-项目-用户管理-用户列表-分页组件-文档-引入

1. @size-change 每个条数修改触发
2. @current-change 页码改变时 就出发
3. total 总数
4. currentPage 当前页码
5. page-sizes=[] 每个显示的条数数组 2 4 6 8

> 引入分页组件 配置分页组件要用的数据

#### 10-项目-用户管理-用户列表-分页组件-配置数据

> pagenum 控制从第几页开始的数据
> pagesize 控制每页有几条
> total 一共多少条数据 24 条

```html
24条 total 每页2条 pagesize 12页 pagenum pagenum=3 pagesize=2 1.2. / 3.4 / 5.6
```

#### 11-项目-用户管理-用户列表-分页组件-分页请求

1. 改变页码 按照新页码 重新获取数据
2. 改变每页条数 按照新 pagesize 重新获取数据

> 重置 pagenum=1

```js
 // 分页相关的方法
    // 每个条数改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      // 重置页码pagenum
      this.pagenum = 1
      this.getUserList()
    },
    // 当前页码改变时 pagenum=1->2
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    }
```

#### 12-项目-用户管理-用户列表-搜索用户

1. 给搜索输入框 绑定 query v-model="query"
2. 按钮搜索按钮 发送请求 pagenum=1

> 一键清除 el-input 的 clearable 属性

#### 13-项目-用户管理-用户列表-添加用户-显示对话框

1. el-dialog 对话框
2. js data dialogFormVisibleAdd:false
3. 点击添加用户的按钮 -> dialogFormVisibleAdd=true
4. 配置对话框的数据 form
   > form 的需要看接口文档添加用户时的 key 名
5. 调整对话框中 el-form-el-input 的宽度 label-width

#### 14-项目-用户管理-用户列表-添加用户-发送请求

1. 点击对话框确定按钮 - 发请求
   1.1 关闭对话框
   1.2 提示消息
   1.3 刷新视图
   1.4 清空对话框
   > this.form 清空

#### 15-项目-用户管理-用户列表-添加用户-处理响应

```js
for (const key in this.form) {
  if (this.form.hasOwnProperty(key)) {
    this.form[key] = ''
  }
}
```

#### 16-项目-用户管理-用户列表-删除用户-打开确认框

> this.\$confirm().then().catch()

1. 点击按钮 -> 打开确认框
2. 点击确认框中的确定 -> 发送删除请求 -> id
   2.1 data 中找 id
   2.2 调用方法时 传参 scope.row.id
   > 注意: async 的位置

```js
 showMegBoxDele(userId) {
      this.$confirm('是否删除用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发送删除请求
          const res = await this.$http.delete(`users/${userId}`)
          console.log(res)
          // 更新视图
          //
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

```

#### 17-项目-用户管理-用户列表-删除用户-处理响应

> 如果删除成功-> 更新视图

#### 18-项目-用户管理-用户列表-编辑用户-显示对话框

> 点击操作中的编辑按钮 -> 打开编辑对话框

1. 编辑对话框
2. 配置数据 dialogFormVisibleEdit
3. this.form 中的 mobile 和 email

```
git操作
1. gitbash -> cmd中的指令操作
2. gitGUI -> 图形页面工具
```

### day-09-重点

#### 01-项目-用户管理-用户列表-编辑用户-显示编辑数据

#### 02-项目-用户管理-用户列表-编辑用户-发送请求

#### 03-项目-用户管理-用户列表-编辑用户-处理响应
