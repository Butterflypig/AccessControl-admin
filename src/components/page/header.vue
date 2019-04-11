<template>
    <div>
      <header align="left">
		<div class="head-intro">
			<h2>智能前台接待系统后台管理</h2>
			<div>
				欢迎HaHa
				<span>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-dropout"></use>
					</svg>
				</span>
			</div>
		</div>
		<div class="line"></div>

		<!-- 面包屑导航 -->
		<div>

		</div>
      </header>
	  
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
  header{
    width: 100%;
	height: 127px;
	background-color: #fff;
  }
  .head-intro{
	height: 72px;
	line-height: 72px;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
  }
  .head-intro > div {
	  color: #999;
	  font-size: 14px;
  }
  .head-intro > div > span{
	  margin-left: 28px;
	  
  }
  header > div{
	margin-right: 87px;
  }
  h2{
	letter-spacing: 0px;
    margin-left: 87px;
	color: #314057;
	font-size: 30px;
	font-family: '宋体'
  }

  .line{
	height: 2px;
	background-color: #999;
	width: 100%;
  }

	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
		font-size: 14px;
		color: #60a0a7;
	}
</style>
