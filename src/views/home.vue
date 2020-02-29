<template>
    <el-container>
        <el-header>
            <div class="header">
                <a href="https://github.com/Sky9th/sky-admin-vue" target="_blank" class="sky-admin-logo"><img src="@/assets/all.png" alt="logo"></a>
                <div class="user-status">
                    <div class="user" v-if="!userInfo.mail">
                        <el-button type="success" @click="register" :size="isPhone ? 'mini' : ''">注册</el-button>
                        <el-button type="primary" @click="loginVisible = true" :size="isPhone ? 'mini' : ''">登录</el-button>
                    </div>
                    <div class="user" v-else>
                        <span>欢迎，</span><el-tag type="primary" :size="isPhone ? 'mini' : ''">{{userInfo.mail}}</el-tag> <el-button size="mini" type="danger" @click="logout">注销</el-button>
                    </div>
                </div>
            </div>
        </el-header>
        <el-main class="body">
            <el-row>
                <el-col :offset="isPhone ? 0 : 4" :span="isPhone ? 24 : 16" align="center">
                    <img :class="'logo ' + slide" src="@/assets/logo.jpg" alt="logo" />
                    <div class="search-input">
                        <i class="el-icon-search"></i>
                        <input ref="search" placeholder="请输入物品名称搜索" v-model="searchForm.title" @input="search" />
                    </div>
                </el-col>
            </el-row>
            <el-row class="data">
                <el-col :offset="isPhone ? 0 : 4" :span="isPhone ? 24 : 16">
                    <el-table :data="list" v-if="list.length > 0">
                        <el-table-column width="50px" prop="cover_url" label="封面">
                            <template slot-scope="scope">
                                <img class="cover" :src="scope.row.cover_url" width="40px" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="名称"></el-table-column>
                        <el-table-column prop="avg" label="估价(卢布)"></el-table-column>
                        <el-table-column prop="update_date" label="更新时间"></el-table-column>
                        <el-table-column label="纠错">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="light" content="估价误差超过30%请点击该按钮" placement="right-start">
                                    <el-button :disabled="scope.row.mistake" circle class="el-icon-warning-outline" type="danger" size="mini" @click="mistake(scope.row.id)"></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="none">
                        <span style="color:#999;" v-if="list.length === 0 && searchForm.title.length > 0">暂未找到相关物品</span>
                    </div>
                </el-col>
            </el-row>
        </el-main>
        <div class="copyright">
            <p>数据均采集于“逃离塔科夫”，数据均为虚拟数据</p>
            <p>Copyright &copy; 2020 SkyAdmin | <a href="https://cloud.baidu.com/?from=console" target="_blank">百度智能云AI提供技术支持</a></p>
        </div>
        <login v-model="loginVisible"></login>
        <notice></notice>
        <register v-model="registerVisible"></register>
        <div class="adv">
            <a href="https://www.yuelun.com/tkf?from=skyadmin" target="_blank"><img src="https://download.yuelun.com/V9DOWN/660160.png" alt=""></a>
        </div>
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
            ...mapState(['userInfo','isPhone']),
            slide () {
                return this.list.length > 0 || this.searchForm.title.length > 0 ? 'slide' : ''
            }
        },
        methods: {
            index () {
                if (this.searchForm.title.length > 0) {
                    service.index(this.searchForm).then(data => {
                        let list = data.list
                        for (let i in list) {
                            list[i].mistake = false
                        }
                        this.list = list
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
            },
            mistake (id) {
                for (let i in this.list) {
                    if(this.list[i].id === id) {
                        this.list[i].mistake = true
                        break;
                    }
                }
                service.mistake(id).then(() => {
                    this.$message.success('已提交')
                })
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
    .cover { border-radius: 5px }
    .logo { width:650px;transition:width .3s; }
    .logo.slide { width:0; }

    .header { height:110px;display: flex; align-items:center;justify-content: space-between; position: relative;z-index: 1 }
    .user-status { float:right; }
    .body {  padding-top: 70px; padding-bottom: 100px}
    .search-input { display:flex;transition: all .3s;align-items:center;background: #fff;border: 1px solid #dfe1e5;box-shadow: none;border-radius: 24px;z-index: 3;height: 44px;margin: 0 auto;width: 482px; }
    .search-input:hover { box-shadow: 0 3px 6px 0 #e9e9e9 }
    .search-input i { width:10%; }
    .search-input input { width:95%;background-color: transparent;border: none;margin: 0;padding: 0;color: rgba(0,0,0,.87);word-wrap: break-word;outline: none;display: flex;flex: 100%;-webkit-tap-highlight-color: transparent;height: 34px;font-size: 16px; }
    .copyright { position: fixed; width:100%;bottom:0;font-size: 14px;color:#555;text-align: center;background: #fff;height:100px }

    .data { margin-top: 15px }
    .tr { display:flex;padding:5px;border:1px solid #e9e9e9;border-radius:5px;transition: all .3s; }
    .tr:hover {  box-shadow:0 3px 6px 0 #e9e9e9; }
    .tr .img { border-radius:5px;overflow: hidden;width:84px;height:84px; }
    .tr .label { color:#999;float:left;width:100%;text-align:left; }
    .tr span { display:block;color:#555;font-size:24px;text-align: left;width:100%; }
    .tr .price { color:#66b1ff; }
    .tr .date { font-size:16px }

    .adv { position:absolute;top:0;width:50%;text-align: center;z-index: 2;left:25%; }
    .adv img { max-height:120px; }

    .none { text-align:center }

    @media screen and (max-width: 750px) {
        .el-header { padding:0; }
        .header { height:50px;display: flex; align-items:center; position: relative;z-index: 1 }

        .user-status { font-size: 12px }

        .search-input { width:100%; }
        .search-input i { width:20%; }

        .body { padding:0 5px;padding-bottom:150px }

        .logo { width:100%;transition:width .3s; }
        .logo.slide { width:0; }

        .sky-admin-logo {}
        .sky-admin-logo img { height:50px }

        .adv { position:fixed;top:auto;bottom:50px;width:100%;left:0; }
        .adv img { width:100%; }

        .copyright { height:50px;position: fixed; width:100%;bottom:0;font-size: 12px;color:#555;text-align: center;}
        .copyright p { margin:5px 0 }
    }
</style>
