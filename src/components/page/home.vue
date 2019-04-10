<template>
    <div>
        <aside>
            <el-menu
                router
                collapse-transition
                unique-opened
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1" @click="toIndex()">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shouye"></use>
                    </svg>
                    <span slot="title">首页</span>
                </el-menu-item>

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
    </div>
</template>
<script>
export default {
    data() {
            return {
                list: [
                    {
                        id: '2',
                        iconName: '#icon-chanpin',
                        name: '产品管理',
                        items: [
                            {
                                index: '2-1',
                                title: '产品管理'
                            },
                            {
                                index: '2-2',
                                title: '选项二'
                            }
                        ]
                    },
                    {
                        id: '3',
                        iconName: '#icon-neirong',
                        name: '内容管理',
                        items: [
                            {
                                index: 'wold',
                                title: '文字管理'
                            },
                            {
                                index: 'image',
                                title: '图片管理'
                            },
                            {
                                index: 'video',
                                title: '视频管理'
                            },
                            {
                                index: 'voice',
                                title: '语音管理'
                            }
                        ]
                    },
                    {
                        id: '4',
                        iconName: '#icon-authority',
                        name: '权限管理',
                        items: [
                            {
                                index: '4-1',
                                title: '选项一'
                            },
                            {
                                index: '4-2',
                                title: '选项二'
                            }
                        ]
                    },
                    {
                        id: '5',
                        iconName: '#icon-liuyanbeizhu',
                        name: '留言管理',
                        items: [
                            {
                                index: '5-1',
                                title: '留言'
                            },
                            {
                                index: '5-2',
                                title: '选项二'
                            }
                        ]
                    },
                    {
                        id: '6',
                        iconName: '#icon-wenhuayuandi',
                        name: '文化管理',
                        items: [
                            {
                                index: 'CompanyHistory',
                                title: '公司历史'
                            },
                        ]
                    },
                    {
                        id: '7',
                        iconName: '#icon-lianjie',
                        name: '链接管理',
                        items: [
                            {
                                index: 'links',
                                title: '链接管理'
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
<style scoped>

</style>
