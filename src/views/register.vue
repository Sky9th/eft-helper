<template>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :width="isPhone ? '100%' :'500px'">
        <el-form :model="form" :rules="rules" label-width="80px" ref="form">
            <el-form-item label="邮箱" prop="mail">
                <el-input v-model="form.mail" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
                <el-input v-model="form.repassword" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input v-model="form.code" autocomplete="off">
                    <el-button type="primary" slot="append" @click="getVerify" :disabled="disabled">{{btnText}}</el-button>
                </el-input>
            </el-form-item>
            <el-form-item prop="agree">
                <el-radio v-model="form.agree" :label="true" style="margin-right:5px">请阅读并同意</el-radio><el-button type="primary" size="mini" @click="protoolVisible = true">《用户协议》</el-button>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="register">注 册</el-button>
        </div>

        <el-dialog :visible.sync="protoolVisible" :modal="false" :close-on-click-modal="false">
            <div slot="title">
                用户协议
            </div>
            <pre class="pre">
一、 “塔科夫小助手”运用自己的操作系统，通过国际互联网络等手段为会员提供法律信息交流平台。“塔科夫小助手”有权在必要时修改服务条款，服务条款一旦发生变动，将会在重要页面上提示修改内容或通过其他形式告知会员。如果会员不同意所改动的内容，可以主动取消获得的网络服务。如果会员继续享用网络服务，则视为接受服务条款的变动。“塔科夫小助手”保留随时修改或中断服务而不需知照会员的权利。“塔科夫小助手”行使修改或中断服务的权利，不需对会员或第三方负责。
二、保护会员隐私权
您注册“塔科夫小助手”相关服务时，跟据网站要求提供相关个人信息；在您使用“塔科夫小助手”服务、参加网站活动、或访问网站网页时，网站自动接收并记录的您浏览器上的服务器数据，包括但不限于IP地址、网站Cookie中的资料及您要求取用的网页记录；“塔科夫小助手”承诺不公开或透露您的密码、手机号码等在本站的非公开信息。除非因会员本人的需要、法律或其他合法程序的要求、服务条款的改变或修订等。
为服务用户的目的，“塔科夫小助手”可能通过使用您的个人信息，向您提供服务，包括但不限于向您发出活动和服务信息等。
同时会员须做到：
● 用户名和昵称的注册与使用应符合网络道德，遵守中华人民共和国的相关法律法规。
● 用户名和昵称中不能含有威胁、淫秽、漫骂、非法、侵害他人权益等有争议性的文字。
● 注册成功后，会员必须保护好自己的帐号和密码，因会员本人泄露而造成的任何损失由会员本人负责。
● 不得盗用他人帐号，由此行为造成的后果自负。
您的个人信息将在下述情况下部分或全部被披露：
● 经您同意，向第三方披露；
● 如您是合资格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；
● 根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；
● 如果您出现违反中国有关法律或者网站政策的情况，需要向第三方披露；
● 为提供你所要求的产品和服务，而必须和第三方分享您的个人信息；
● 其他本网站根据法律或者网站政策认为合适的披露
三、责任说明
基于技术和不可预见的原因而导致的服务中断，或者因会员的非法操作而造成的损失，“塔科夫小助手”不负责任。会员应当自行承担一切因自身行为而直接或者间接导致的民事或刑事法律责任。
四、会员必须做到：
1、不得利用本站危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得利用本站制作、复制和传播下列信息：
（1）煽动抗拒、破坏宪法和法律、行政法规实施的；
（2）煽动颠覆国家政权，推翻社会主义制度的；
（3）煽动分裂国家、破坏国家统一的；
（4）煽动民族仇恨、民族歧视，破坏民族团结的；
（5）捏造或者歪曲事实，散布谣言，扰乱社会秩序的；
（6）宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；
（7）公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；
（8）损害国家机关信誉的；
（9）其他违反宪法和法律行政法规的；
（10）进行商业广告行为的。
2、未经本站的授权或许可，任何会员不得借用本站的名义从事任何商业活动，也不得将本站作为从事商业活动的场所、平台或其他任何形式的媒介。禁止将本站用作从事各种非法活动的场所、平台或者其他任何形式的媒介。违反者若触犯法律，一切后果自负，本站不承担任何责任。
五、版权说明：
任何会员在本站发表任何形式的信息，均表明该用户主动将该信息的发表权、汇编权、修改权、信息网络传播权无偿独家转让给“塔科夫小助手”运营商。本协议已经构成《著作权法》第二十五条所规定的书面协议，并在用户同意本注册协议时生效，其效力及于用户此后在塔科夫小助手发布的任何内容。
会员同意并明确了解上述条款，不将已发表于本站的信息，以任何形式发布或授权其它网站（及媒体）使用。
同时，“塔科夫小助手”保留删除站内各类不符合规定点评而不通知会员的权利：
六、免责声明：
● “塔科夫小助手”是为互联网用户提供信息存储空间的互联网服务提供者，对于任何包含、经由或连接、下载或从任何与有关本网站所获得的任何内容、信息或广告，不声明或保证其正确性或可靠性；并且对于用户经本网站上的内容、广告、展示而购买、取得的任何产品、信息或资料，“塔科夫小助手”不负保证责任。用户自行负担使用本网站的风险。
● “塔科夫小助手”有权但无义务，改善或更正本网站任何部分之任何疏漏、错误。
● 本站内相关信息内容仅代表发布者的个人观点，并不表示本站赞同其观点或证实其描述，本站不承担由此引发的法律责任。
            </pre>
        </el-dialog>
    </el-dialog>
</template>

<script>
    import service from "@/api/index";
    import util from '@/libs/util'
    import {mapState} from "vuex";
    export default {
        name: "login",
        props:['value'],
        data () {
            return {
                form: {
                    mail: '',
                    password: '',
                    repassword: '',
                    code: '',
                    agree: false,
                },
                disabled: false,
                dialogVisible: false,
                protoolVisible: false,
                btnInterval: false,
                btnBreak: 60,
                btnText: '发送验证码',
                rules: {
                    mail: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    repassword: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                }
            }
        },
        computed: {
            ...mapState(['userInfo','isPhone']),
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
            getVerify () {
                var reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if(!reg.test(this.form.mail)){
                    this.$message.error('请填写正确邮箱')
                    return false
                }
                service.verify(this.form.mail).then(() => {
                    this.disabled = true
                    this.btnText = this.btnBreak + 's'
                    let that = this
                    this.btnInterval = setInterval(() => {
                        that.btnBreak = that.btnBreak - 1
                        that.btnText = this.btnBreak + 's'
                        if (that.btnBreak <= 0) {
                            clearInterval(this.btnInterval)
                            that.disabled = false
                            that.btnBreak = 60
                            that.btnText = '发送验证码'
                        }
                    }, 1000)
                }).catch(() => {
                    this.disabled = false
                })
            },
            register () {
                this.$refs['form'].validate((valid) => {
                    console.log(this.form.agree)
                    if(!this.form.agree){
                        this.$message.error('请阅读并同意用户协议')
                        return false
                    }
                    if (valid) {
                        service.register(this.form).then(data => {
                            if (data) {
                                util.cookies.set('sessionKey', data.sessionKey)
                                this.dialogVisible = false
                                this.$store.dispatch('getUserInfo')
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }
        },
        destroyed() {
            clearInterval(this.btnInterval)
        }
    }
</script>

<style scoped>
.pre { white-space: pre-wrap;word-wrap: break-word;margin: 0 }
@media screen and (max-width: 750px) {
    .el-dialog { width:100%!important; }
}
</style>
