<template>
    <el-container>
        <el-header>
            <el-row class="header" :gutter="15">
                <el-col :span="12" >
                    <img src="@/assets/all.png" alt="logo">
                </el-col>
                <el-col :span="12" align="right">
                    <div class="user">
                        <el-button type="success" size="mini">注册</el-button>
                        <el-button type="primary" size="mini">登录</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row class="body">
                <el-col :offset="4" :span="16" align="center">
                    <img :class="slide" src="@/assets/logo.png" alt="logo" />
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
                        <div class="th" style="width:50%;">
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
            Copyright &copy; 2020 SkyAdmin
        </el-footer>
        <login :visible="loginVisible"></login>
    </el-container>
</template>

<script>
    import service from "@/api";
    import login from './login';

    export default {
        name: "home",
        components: {login},
        data () {
            return {
                searchForm: {
                    title: ''
                },
                list: [],
                loginVisible: true
            }
        },
        computed: {
            slide () {
                return this.list.length > 0 ? 'logo slide' : 'logo'
            }
        },
        methods: {
            index () {
                if (this.searchForm.title.length > 0) {
                    service.index(this.searchForm).then(data => {
                        this.list = data.list
                        this.data = data
                    })
                }
            },
            search () {
                clearTimeout(this.interval)
                this.interval = setTimeout(() => {
                    this.index()
                }, 300)
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
    .logo { transition: all .3s; }
    .logo.slide { width:30%; }
    .header { height:66px;display: flex;align-items: center }
    .body { padding-top: 49px }
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
