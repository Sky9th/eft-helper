<template>
    <el-container>
        <el-header>
            <el-row type="flex" align="middle" style="height:100%" class="header">
                <h1>塔科夫助手</h1>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-active="active"  class="el-menu-vertical-demo" style="height:100%" @select="select">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">报价列表</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main v-if="active === '1'">
                <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
                    <el-form-item label="商品名">
                        <el-input v-model="search.title" @input="searchKey" ></el-input>
                    </el-form-item>
                </el-form>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="cover_url"
                            label="封面"
                            width="180">
                        <template slot-scope="scope">
                            <el-image :lazy="true" :src="scope.row.cover_url"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="category_title"
                            label="分类"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="avg"
                            label="平均价">
                    </el-table-column>
                    <el-table-column
                            prop="min"
                            label="最低价">
                    </el-table-column>
                    <el-table-column
                            prop="max"
                            label="最高价">
                    </el-table-column>
                    <el-table-column
                            prop="create_time"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column lable="操作">
                        <template slot-scope="scope">
                            <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import service from "@/api";

export default {
    name: "index",
    data () {
        return {
            search: {},
            formVisible: false,
            form: {},
            active: '1',
            image: 0,
            tableData: [],
            data: {},
            interval: false
        }
    },
    methods: {
        index () {
            service.index(this.search).then(data => {
                this.tableData = data.list
                this.data = data
            })
        },
        searchKey () {
            clearTimeout(this.interval)
            this.interval = setTimeout(() => {
                this.index()
            }, 300)
        }
    },
    mounted() {
        this.reset()
        this.index()
    }
}
</script>

<style scoped>
.header { border-bottom:1px solid #e9e9e9 }
</style>
