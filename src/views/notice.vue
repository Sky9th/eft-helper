<template>
    <div>
        <el-card class="notice">
            <div slot="header">
                通知公告
            </div>
            <div class="notice-content">
                <p>“塔科夫小助手”是腐竹在玩逃离塔科夫时，在战局中经常因为无法记住每个物品的价格而带来的选择困难症，带来诸多不便，所以自行制作了这个小助手并免费分享给大家。</p>
                <p>塔科夫小助手的数据是利用百度AI技术进行智能识别，没有进行过人工排查，也不是官方的API接口，<span style="color:#F56C6C">所以本站的所有信息不保证其时效性，请各位知悉</span></p>
                <p style="color:#F56C6C;font-weight: bold">重要的事情说三遍</p>
                <p style="color:#F56C6C;font-weight: bold">数据仅供参考!数据仅供参考!数据仅供参考!</p>
            </div>
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
    export default {
        name: "notice",
        data () {
            return {
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
            }
        },
        mounted() {
            this.refreshVerify()
        }
    }
</script>

<style scoped>
    .notice { position: fixed;right:15px;top:100px;width:240px;}
    .notice-btn { display: flex; align-items: center;justify-content: center;color:#409EFF;margin-top:25px  }
    .notice-btn i { font-size: 16px }
    .notice-btn span { font-size:18px }
    .login-code { display:block;margin:0 -20px;height:38px;cursor: pointer }
</style>
