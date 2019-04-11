<template>
    <div>
		<section>
            <Aside/>
            <main>
                <HeaderAdmin/>
                <div class="content">
                    <router-view/>
                </div>
                
            </main>
		</section>
    </div>
</template>
<script>

import Aside from './page/aside'
import HeaderAdmin from './page/header'
export default {
    components:{
        Aside,
        HeaderAdmin
	}
}
</script>
<style scoped>
    section{
        display: flex;
    }
    main{
        width: calc(100% - 224px);
        background-color: #ebebeb;
    }
    .content{
        padding: 25px 20px;
    }
</style>
