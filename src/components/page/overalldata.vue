<template>
    <div>
        <div class="overall-data" align="left">
            <div>
                <span>年限：</span>
                <el-select v-model="value4" clearable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <span>季度：</span>
                
                <el-select v-model="value4" clearable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                
            </div>
        </div>

        <section class="data-statistics">
            <div>
                <div id="zhe" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div>
                <div id="myChart1" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div>
                <div id="myChart2" :style="{width: '300px', height: '300px'}"></div>
            </div>
        </section>
        <section>
            <div>
                <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
            </div>
        </section>
       
    </div>
</template>
<script>
export default {
    data() {
        return {
            options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
            }],
            value4: ''
        }
    },
    mounted () {
        this.zhe();
        this.drawLine();
        this.pieChart();
        this.pieChart1();
    },
    methods: {
        zhe(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('zhe'))
            // 绘制图表
            myChart.setOption({
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            });
        },
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title: { text: '在Vue中使用echarts' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {    },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        },
        pieChart (){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart1'))

            myChart.setOption({
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        data:[
                            {value:235, name:'视频广告'},
                            {value:274, name:'联盟广告'},
                            {value:310, name:'邮件营销'},
                            {value:335, name:'直接访问'},
                            {value:400, name:'搜索引擎'}
                        ]
                    }
                ]
            })
        },
        pieChart1 (){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart2'))

            myChart.setOption({
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        data:[
                            {value:235, name:'视频广告'},
                            {value:274, name:'联盟广告'},
                            {value:310, name:'邮件营销'},
                            {value:335, name:'直接访问'},
                            {value:400, name:'搜索引擎'}
                        ]
                    }
                ]
            })
        }

    }
}
</script>
<style scoped>
    .overall-data{
        width: 100%;
        height: 62px;
        line-height: 62px;
        background-color: #314057;
        color: white;
        font-size: 20px;
    }
    .overall-data > div {
        display: inline-block;
    }
    .overall-data > div:first-child{
        margin-left: 98px;
    }
    .overall-data > div:last-child{
        margin-left: 134px;
    }

    .el-select-dropdown__list{
		background-color: red !important;
    }
    
    .data-statistics{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
    .data-statistics > div:first-child{
        width: 717px;
        height: 343px;
    }
</style>
