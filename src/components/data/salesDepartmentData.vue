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

            <!-- 折线图 -->
            <div>
                <div id="lineChart"></div>
            </div>

             <!-- 条形图 -->
            <div>
                <div id="barChart"></div>
            </div>
            

        </section>


        <section class="pie">

            <!-- 饼状图 -->
            <div>
                <div id="accountOpening"></div>
            </div>
            <div>
                <div id="pieChartBusiness"></div>
            </div>
            <div>
                <div id="pieChartAdvisory"></div>
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
        this.lineChart();
        this.accountOpening();
        this.pieChartBusiness();
        this.pieChartAdvisory();
        this.barChart();
    },
    methods: {

        //折线图
        lineChart(){
            
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('lineChart'));

            // 绘制图表
            myChart.setOption({
                title: { text: '到访统计' },
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

        //饼状图  开户
        accountOpening (){

            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('accountOpening'))

            myChart.setOption({
                title: { text: '办理业务' },
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
                        ],
                        color:[ '#e07183','#639fa9','#d6896e','#455a7c','#97c7af']
                    }
                ]
            })
        },

        //饼状图  办理业务
        pieChartBusiness (){

            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('pieChartBusiness'))

            myChart.setOption({
                title: { text: '办理业务' },
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
                        ],
                        color:[ '#e07183','#639fa9','#d6896e','#455a7c','#97c7af']
                    }
                ]
            })
        },

        //饼状图   咨询
        pieChartAdvisory (){

            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('pieChartAdvisory'))

            myChart.setOption({
                title: { text: '咨询' },
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
                        ],
                        color:[ '#e07183','#639fa9','#d6896e','#455a7c','#97c7af']

                    }
                ]
            })
        },

        // 条形图
        barChart(){

            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('barChart'));

            // 绘制图表
            myChart.setOption({
                title: { text: '关注点统计' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                
                yAxis: {    },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20],
                    itemStyle:{
                        normal: {
                            // 随机显示
                            //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                        
                            // 定制显示（按顺序）
                            color: function(params) { 
                                var colorList = ['#97c7af','#d6896e','#639fa9','#455a7c','#e07183', '#97c7af','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                                return colorList[params.dataIndex] 
                            }
                        }
                    },
                }]
            });
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
    .data-statistics > div{
        width: 816px;
    }

    #lineChart,#barChart{
        height: 365px;
        background-color: #fff;
        margin-top: 25px;
        box-shadow: 0 3px 3px rgba(51, 51, 51, .2);
    }
    #pieChartAdvisory,#pieChartBusiness,#accountOpening{
        background-color: #fff;
        width: 536px;
        height: 387px;
        box-shadow: 0 3px 3px rgba(51, 51, 51, .2);
    }

    .pie{
        margin-top: 25px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
</style>
