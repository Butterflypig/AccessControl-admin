<template>
    <div>
        <aside>
            <div class="logo">
                <img src="./../../../static/images/dengluhxlogo.png" alt="logo">
            </div>
            <el-menu
                router
                collapse-transition
                unique-opened
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#314057"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu v-for="(item,key) in list" :key="key" :index="item.id">
                    <template slot="title">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="item.iconName"></use>
                        </svg>
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item-group v-for="(group,index) in item.items" :key="index">
                        <el-menu-item :index="group.index" @click="toPage(group.index)">{{group.title}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </aside>
        <div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Aside",
        data() {
            return {
                list: [
                    {
                        id: '2',
                        iconName: '#icon-shuju1',
                        name: '数据统计',
                        items: [
                            {
                                index: 'overalldata',
                                title: '整体数据'
                            },
                            {
                                index: 'salesDepartmentData',
                                title: '营业部数据'
                            }
                        ]
                    },
                    {
                        id: '3',
                        iconName: '#icon-renlianshibie2',
                        name: '客户管理',
                        items: [
                            {
                                index: 'customerInfo',
                                title: '客户信息'
                            },
                            {
                                index: 'customerArrangement',
                                title: '内容推荐'
                            },
                            {
                                index: 'visitingRecord',
                                title: '预约管理'
                            },
                            {
                                index: 'visitingRecord',
                                title: '到访日志'
                            },
                            {
                                index: 'matter',
                                title: '事项设置'
                            },
                            // {
                            //     index: 'tag',
                            //     title: '标签设置'
                            // },
                            {
                                index: 'like',
                                title: '兴趣点'
                            }
                        ]
                    },
                    {
                        id: '4',
                        iconName: '#icon-zuzhi',
                        name: '组织架构',
                        items: [
                            {
                                index: 'companyInfo',
                                title: '公司信息'
                            },
                            {
                                index: 'department',
                                title: '部门管理'
                            },
                            {
                                index: 'staff',
                                title: '员工管理'
                            },
                            {
                                index: 'device',
                                title: '设备管理'
                            }

                        ]
                    },
                    {
                        id: '7',
                        iconName: '#icon-shezhi',
                        name: '常用设置',
                        items: [
                            {
                                index: 'announcement',
                                title: '公告设置'
                            },
                            {
                                index: 'voice',
                                title: '语音设置'
                            },
                            {
                                index: 'system',
                                title: '系统设置'
                            },
                            {
                                index: 'account',
                                title: '账号设置'
                            },
                            {
                                index: 'default',
                                title: '默认设置'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            toIndex() {
                this.$router.push({name: 'index'});
            },
            toPage(index) {
                if (index === '2-1') {
                    this.$router.push({name: 'product'});
                } else if (index === '5-1') {
                    this.$router.push({name: 'message'});
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "./../../assets/less/index";

    .logo {
        padding: 40px 0;
    }

    aside {
        height: 1080px;
        width: 224px;
        background: #314057;
    }

    .el-menu {
        width: 224px;
    }

    svg {
        margin-right: 25px;
    }
</style>
