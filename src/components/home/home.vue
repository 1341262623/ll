<template>
    <el-container class="container">
        <!-- 头部 -->
        <el-header class="header">
               <el-row>
                     <el-col :span="4">
                         <div class="grid-content bg-purple">
                             <img src="@/assets/logo.png" alt="">
                         </div>
                      </el-col>
                      <el-col :span="19">
                         <div class="grid-content bg-purple-light title">
                            <h2>电商后台管理系统</h2>
                         </div>
                       </el-col>
                     <el-col :span="1"> 
                         <div class="grid-content bg-purple">
                             <a  @click.prevent="loginout()" href="#" class="loginout">退出</a>
                        </div>
                    </el-col>
               </el-row>
          </el-header>
        <!-- 菜单导航 -->
         <el-container>
          <el-aside width="200px" class="aside">
              <el-menu
               class="el-menu-vertical-demo"
               :unique-opened ="true"
               :router="true"
               >
               <!-- 1 -->
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                      <el-menu-item index="users">
                        <i class="el-icon-location"></i>
                         用户列表
                      </el-menu-item>
                 </el-submenu>
                 <!-- 2权限管理 -->
                  <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>
                      <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                         角色列表
                      </el-menu-item>
                      <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                         权限列表
                      </el-menu-item>
                 </el-submenu>
                 <!-- 3 商品管理-->
                  <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                    </template>
                      <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                         商品列表
                      </el-menu-item>
                       <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                         分类参数
                      </el-menu-item>
                       <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                         商品分类
                      </el-menu-item>
                      
                 </el-submenu>
                 <!-- 4订单管理 -->
                  <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                    </template>
                      <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                         订单列表
                      </el-menu-item>
                 </el-submenu>
                 <!-- 5 数据统计-->
                  <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                    </template>
                      <el-menu-item index="1-1">
                        <i class="el-icon-location"></i>
                         数据报表
                      </el-menu-item>
                 </el-submenu>
               </el-menu>   
          </el-aside>
          <el-main class="main">
                <router-view>

                </router-view>
          </el-main>
        </el-container>
</el-container>
</template>

<script>
export default {
   beforeCreate(){
             //读取token是否存在.存在则登录过,不存在在跳转
             const token=localStorage.getItem('token')
             console.log(token)
             if(!token){
                 this.$router.push({name:"login"})
                 this.$message.warning('请先登录');
             }

         },
methods:{
        //判断是否登录  beforeCreate在实例被创建前的函数
    //退出功能1.跳转,2清除token,3提示
    loginout(){
        this.$router.push({name:'login'})
        localStorage.clear()
        this.$message.warning('退出成功');

    }

}


}
</script>

<style>
.container{
    height: 100%;
}
.header{
    background-color: #b3c0d1;
}
.aside{
 background-color: #d3dce6;
}
.main{
 background-color: #e9eef3;
  height: 100%;
}
.header .title{
    text-align: center;
   
    
   
}
.header .loginout{
    text-decoration:none;
    line-height: 60px;
    text-align: right;
   color: teal;
}
</style>
