<template>
    <div>
        <el-card class="notice" v-if="!visible">
            <div slot="header">
                通知公告
                <el-button style="float: right; padding: 3px 0" type="text" @click="close">关闭</el-button>
            </div>
            <pre class="notice-content">{{config.notice}}</pre>
            <div class="notice-btn">
                <el-button type="warning" size="mini" class="notice-btn-item">
                    <i class="el-icon-connection"></i>
                    <span @click="dialogVisible = true">反馈建议</span>
                </el-button>
            </div>
        </el-card>


        <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
            <div slot="title">
                反馈建议
            </div>
            <el-form :model="form" label-width="80px" ref="form">
                <el-form-item label="内容" prop="content">
                    <el-input type="textarea" :rows="8" v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="form.code" autocomplete="off">
                        <template slot="append"><img class="login-code" :src="captchaImg" @click="refreshVerify"></template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="advise">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import service from "@/api/index";
    import util from '@/libs/util'
    import {mapState} from "vuex";
    export default {
        name: "notice",
        data () {
            return {
                visible: false,
                form: {
                    content: '',
                    code: '',
                    fingerprint: ''
                },
                captchaImg: '',
                dialogVisible: false
            }
        },
        computed: {
            ...mapState(['userInfo','isPhone','config']),
            fingerprint () {
                return this.$store.state.fingerprint
            }
        },
        methods: {
            refreshVerify () {
                service.captcha(this.fingerprint).then(data => {
                    this.captchaImg = data
                })
            },
            advise () {
                this.form.fingerprint = this.fingerprint
                service.advise(this.form).then(() => {
                    this.dialogVisible = false
                    this.form = {
                        content: '',
                        code: '',
                        fingerprint: ''
                    }
                    this.$message.success('已成功提交')
                }).catch(() => {
                    this.refreshVerify()
                })
            },
            close () {
                util.cookies.set('close_notice', true)
                this.visible = true
            }
        },
        mounted() {
            this.refreshVerify()
            this.visible = util.cookies.get('close_notice')
        }
    }
</script>

<style scoped>
    .notice { position: fixed;right:15px;top:150px;width:240px;}
    .notice-btn { display: flex; align-items: center;justify-content: center;color:#409EFF;margin-top:25px  }
    .notice-btn i { font-size: 16px }
    .notice-btn span { font-size:18px }
    .notice-content {
        width:100%;
        display: block;
        font-family: -moz-fixed;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    .login-code { display:block;margin:0 -20px;height:38px;cursor: pointer }


    @media screen and (max-width: 750px) {
        .notice { position:fixed;width:90%;left:5%;top:10px;opacity: 1;z-index: 10 }
    }
</style>
