<template>
    <el-container>
        <el-header>
            <el-row class="header" :gutter="15">
                <el-col :span="12" >
                    <a href="https://github.com/Sky9th/sky-admin-vue" target="_blank"><img src="@/assets/all.png" alt="logo"></a>
                </el-col>
                <el-col :span="12" align="right">
                    <div class="user" v-if="!userInfo.mail">
                        <el-button type="success" size="mini" @click="register">注册</el-button>
                        <el-button type="primary" size="mini" @click="loginVisible = true">登录</el-button>
                    </div>
                    <div class="user" v-else>
                        <span>欢迎，</span><el-tag type="primary">{{userInfo.mail}}</el-tag> <el-button size="mini" type="danger" @click="logout">注销</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row class="body">
                <el-col :offset="4" :span="16" align="center">
                    <img :class="'logo ' + slide" src="@/assets/logo.jpg" alt="logo" />
                    <div class="search-input">
                        <i class="el-icon-search"></i>
                        <input ref="search" placeholder="请输入物品名称搜索" v-model="searchForm.title" @input="search" />
                    </div>
                </el-col>
            </el-row>
            <el-row class="data">
                <el-col :offset="6" :span="12" align="center">
                    <div class="tr" v-for="(item, index) in list" :key="index">
                        <div class="th">
                            <div class="img">
                                <el-image :src="item.cover_url"></el-image>
                            </div>
                        </div>
                        <div class="th" style="width:50%;padding-left:5%;box-sizing: border-box">
                            <div class="label">名称</div>
                            <span class="price">{{item.title}}</span>
                        </div>
                        <div class="th" style="width:20%;">
                            <div class="label">估价</div>
                            <span class="price">{{item.avg}}</span>
                        </div>
                        <div class="th">
                            <div class="label">更新时间</div>
                            <span class="date">{{item.create_time}}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-main>
        <el-footer class="copyright">
            Copyright &copy; 2020 SkyAdmin | <a href="https://cloud.baidu.com/?from=console" target="_blank">百度智能云AI提供技术支持</a>
        </el-footer>
        <login v-model="loginVisible"></login>
        <notice></notice>
        <register v-model="registerVisible"></register>
    </el-container>
</template>

<script>
    import service from "@/api";
    import login from './login';
    import notice from './notice';
    import register from './register';

    import { mapState } from 'vuex'

    export default {
        name: "home",
        components: {login, register, notice},
        data () {
            return {
                searchForm: {
                    title: ''
                },
                list: [],
                loginVisible: false,
                registerVisible: false
            }
        },
        computed: {
            ...mapState(['userInfo']),
            slide () {
                return this.list.length > 0 || this.searchForm.title > 0 ? 'slide' : ''
            }
        },
        methods: {
            index () {
                if (this.searchForm.title.length > 0) {
                    service.index(this.searchForm).then(data => {
                        this.list = data.list
                        this.data = data
                    })
                } else{
                    this.list = []
                    this.data = {}
                }
            },
            search () {
                clearTimeout(this.interval)
                this.interval = setTimeout(() => {
                    this.index()
                }, 300)
            },
            register () {
                this.registerVisible = true
            },
            logout () {
                this.$store.dispatch('logout')
            }
        },
        mounted () {
            this.index()
            this.$nextTick(() => {
                this.$refs.search.focus()
            })
        }
    }
</script>

<style scoped>
    .logo { width:650px;transition:width .3s; }
    .logo.slide { width:300px; }
    .header { height:66px;display: flex;align-items: center }
    .body { padding-top: 90px }
    .search-input { display:flex;transition: all .3s;align-items:center;background: #fff;border: 1px solid #dfe1e5;box-shadow: none;border-radius: 24px;z-index: 3;height: 44px;margin: 0 auto;width: 482px; }
    .search-input:hover { box-shadow: 0 3px 6px 0 #e9e9e9 }
    .search-input i { width:10%; }
    .search-input input { width:95%;background-color: transparent;border: none;margin: 0;padding: 0;color: rgba(0,0,0,.87);word-wrap: break-word;outline: none;display: flex;flex: 100%;-webkit-tap-highlight-color: transparent;height: 34px;font-size: 16px; }
    .copyright { position: fixed; width:100%;bottom:0;font-size: 14px;color:#555;text-align: center; }

    .data { margin-top: 15px }
    .tr { display:flex;padding:5px;border:1px solid #e9e9e9;border-radius:5px;transition: all .3s;align-items: center; }
    .tr:hover {  box-shadow:0 3px 6px 0 #e9e9e9; }
    .tr .img { border-radius:5px;overflow: hidden;width:84px;height:84px; }
    .tr .label { color:#999 }
    .tr span { color:#555;font-size:24px; }
    .tr .price { color:#66b1ff; }
    .tr .date { font-size:16px }
</style>
