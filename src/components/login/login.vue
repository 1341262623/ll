    <template>
      <div class="login-wrap">
         <el-form 
         class="login-form"
          label-position="top" 
          label-width="80px"
          :v-model="fromdata"       
           >
           <h2>用户登录</h2>
            <el-form-item label="账号:">
            <el-input  v-model="fromdata.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
            <el-input  v-model="fromdata.password" ></el-input>
            </el-form-item>
           <el-button @click.prevent="Logon()" type="primary" class="login-btn">登录</el-button>
        </el-form>  
      
      </div>
    </template>
    
    <script>
export default {
  data() {
    return {
      fromdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
            //async await 异步请求看成同步
            //当满足await后面的条件时再执行下面的函数
       async Logon(){
           const res= await this.$http.post('login',this.fromdata)
            const {
                 meta: { msg, status },
                 data
                    } = res.data;
            if(status==200){
                       //跳转页面 弹出提示框 把数据存入本地
                       const token=res.data.data.token
                       //console.log(res.data.data.token)
                       localStorage.setItem('token',token)
                        this.$router.push({name:'home'})
                        this.$message.success(msg)
                   }else{
                       this.$message.error(msg)
                   }
                  }
        

    // Logon() {
    //   this.$http.post("login", this.fromdata).then((res) => {
    //     console.log(res);
    //     const {
    //       meta: { msg, status },
    //       data
    //     } = res.data;
    //     if(status==200){
    //         //跳转页面 弹出提示框 把数据存入本地
    //         const token=res.data.data.token
    //         //console.log(res.data.data.token)
    //         localStorage.setItem('token',token)
    //          //this.$router.push({name:'home'})
    //          this.$message.success(msg)
    //     }else{
    //         this.$message.error(msg)
    //     }
    //   });
    // }
  }
  
};
</script>
    
<style>
.login-wrap {
  height: 100%;
  background-color: darkgrey;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>
    