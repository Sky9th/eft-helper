<template>
    <el-dialog :visible.sync="visible">
        <el-form :model="form" label-width="80px">
            <el-form-item label="邮箱">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="form.repassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input v-model="form.code" autocomplete="off">
                    <el-button type="primary" slot="append" @click="getVerify">{{btnText}}</el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="register">注 册</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import service from "@/api/index";
    export default {
        name: "login",
        props: ['visible'],
        data () {
            return {
                form: {
                    email: 'weitianxu@qq.com',
                    password: '',
                    repassword: '',
                    code: ''
                },
                dialogVisible: false,
                btnInterval: false,
                btnBreak: 5,
                btnText: '发送验证码',
            }
        },
        watch: {
            visible () {
                this.dialogVisible = this.visible
            }
        },
        methods: {
            getVerify () {
                service.verify(this.form.email).then(() => {
                    this.btnText = this.btnBreak + 's'
                    let that = this
                    this.btnInterval = setInterval(() => {
                        that.btnBreak = that.btnBreak - 1
                        this.btnText = this.btnBreak + 's'
                        if (that.btnBreak <= 0) {
                            clearInterval(this.btnInterval)
                            this.btnText = '发送验证码'
                        }
                    }, 1000)
                })
            },
            register () {

            },
            close () {
                this.$emit()
            }
        },
        destroyed() {
            clearInterval(this.btnInterval)
        }
    }
</script>

<style scoped>

</style>
