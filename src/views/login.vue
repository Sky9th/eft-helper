<template>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
        <el-form :model="form" :rules="rules" label-width="80px" ref="form">
            <el-form-item label="邮箱" prop="mail">
                <el-input v-model="form.mail" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input v-model="form.code" autocomplete="off">
                    <template slot="append"><img class="login-code" :src="captchaImg" @click="refreshVerify"></template>
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="login">登 录</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import service from "@/api/index";
    import util from '@/libs/util'
    export default {
        name: "login",
        props:['value'],
        data () {
            return {
                form: {
                    mail: '',
                    password: '',
                    code: '',
                },
                captchaImg: '',
                dialogVisible: false,
                rules: {
                    mail: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                }
            }
        },
        computed: {
            fingerprint () {
                return this.$store.state.fingerprint
            }
        },
        watch: {
            value (val) {
                this.dialogVisible = val
            },
            dialogVisible (val) {
                this.$emit('input', val)
            }
        },
        methods: {
            refreshVerify () {
                service.captcha(this.fingerprint).then(data => {
                    this.captchaImg = data
                })
            },
            login () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.form.fingerprint = this.fingerprint
                        service.login(this.form).then(data => {
                            if (data) {
                                util.cookies.set('sessionKey', data.sessionKey)
                                this.dialogVisible = false
                                this.$store.dispatch('getUserInfo')
                            }
                        }).catch(() => {
                            this.refreshVerify()
                        })
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted() {
            this.refreshVerify()
        },
        destroyed() {
            clearInterval(this.btnInterval)
        }
    }
</script>

<style scoped>
.login-code { display:block;margin:0 -20px;height:38px;cursor: pointer }
</style>
