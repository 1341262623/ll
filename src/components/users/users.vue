<template>
<el-card class="box-card">
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="seach">
        <el-col :span="16">
            <el-input clearable placeholder="请输入内容" class="input" v-model="query">
                <el-button slot="append" icon="el-icon-search" @click="seelist()"></el-button>
            </el-input>
            <el-button plain @click="addList()">添加</el-button>
        </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="usersData" style="width: 100%">
        <el-table-column label="#" width="50" type="index">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="150">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="180">
        </el-table-column>
        <el-table-column label="创建日期" width="180">
            <!-- 组件有作用域文本格式化无法进行传值 通用template
           slot-scope传值 传外层容器绑定的数据usersList  .row 是遍历数组中的每一项 -->

            <template slot-scope="usersList">
                {{usersList.row.create_time | fmdData('YYYY-MM-DD')}}
            </template>
        </el-table-column>
        <el-table-column label="用户状态" width="80">
            <template slot-scope="usersList">
                <el-switch v-model="usersList.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>

        <el-table-column label="操作">
            <!-- 编辑按钮 -->
            <template slot-scope="scope">
                <el-button type="primary" @click=" putList()" icon="el-icon-edit" circle size="mini" plain></el-button>
                <!-- 删除按钮 -->
                <el-button type="danger" @click="eideuserList(scope.row.id)" icon="el-icon-delete" circle size="mini" plain>
                </el-button>
                <!-- 对号 -->
                <el-button type="success" icon="el-icon-check" circle size="mini" plain></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 添加弹出框-->
    <el-dialog title="添加用户" :visible.sync="dialogVisibleadd">
        <el-form  :model="fromdata">
            <el-form-item label="用户名">
                <el-input v-model="fromdata.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="fromdata.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="fromdata.email" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="fromdata.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleadd=false">取 消</el-button>
            <el-button type="primary" @click="addusersList()">确 定</el-button>
          </span>
    </el-dialog>

      <!-- 修改用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialogVisibleput">
        <el-form :model="fromdata">
            <el-form-item label="用户名">
                <el-input v-model="fromdata.username" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="fromdata.email" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="fromdata.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleput=false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </span>
    </el-dialog>
</el-card>
</template>

<script>
export default {

    data() {
        // 用户列表
        return {
            query: '', //查询参数	可以为空
            pagenum: 1, //当前页码	不能为空
            pagesize: 2, //每页显示条数	不能为空
            total: -1,
            //渲染页面 
            loading: true, //总页数
            usersData: [{
                create_time: '',
                email: '',
                id: '',
                mg_state: '',
                mobile: '',
                role_name: '',
                username: ''
            }],
            //添加弹出框
            dialogVisibleadd: false,
            //编辑弹出框
            dialogVisibleput:false,
            fromdata: {

                username: '',
                password: '',
                email: '',
                mobile: ''
            },
        }
    },
    //vue实例后执行的函数
    created() {
        this.getUsersList()
    },

    methods: {
        //编辑框弹出
        putList(){
          this.dialogVisibleput=true
        },
        
        //删除
        eideuserList(ID) {

            this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(async () => {
                    const res = await this.$http.delete(`users/${ID}`)

                    this.getUsersList()
                    
                    this.$message({
                        type: 'success',
                        message:'删除成功'
                    });
                }).catch(() => {

                    this.$message({
                        type: 'info',
                        message:res.data.meta.msg
                    });
                });
        },
        //添加确定按钮确定按钮
        async addusersList() {
            this.dialogVisibleadd = false
            //发送请求
            const res = await this.$http.post('users', this.fromdata)
            const {
                meta: {
                    msg,
                    status
                }
            } = res.data
            //console.log(msg)
            if (status === 201) {
                //成功之后更新视图
                this.getUsersList()
                //清空fromdata
                this.fromdata = {}
                this.$message.success(msg);
            } else {
                this.$message.error(msg);
            }

        },
        //添加弹出
        addList() {
            this.dialogVisibleadd = true
        },
        //搜索
        seelist() {
            // console.log(1)
            this.getUsersList()
        },
        //分页
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
            this.pagesize = val //让页数等于当前页数
            console.log(this.pagesize)
            this.pagenum = 1
            this.getUsersList()
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.pagenum = val
            this.getUsersList()
        },
        //获取列表
        async getUsersList() {
            //设置请求头

            const AUTH_TOKEN = localStorage.getItem('token')
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
            const res = await this.$http.get(
                `users?query=${this.query}&pagenum=${this.pagenum}
           &pagesize=${this.pagesize}`)
            //console.log(res)
            this.loading = false
            const {
                data: {
                    total,
                    users
                },
                meta: {
                    msg,
                    status
                }
            } = res.data
            //console.log(msg)
            if (status === 200) {
                this.total = total //总页数相等
                this.usersData = users
            }

        }

    }

}
</script>

<style>
.seach {
    margin-top: 20px;
}

.input {
    width: 400px;
}
</style>
