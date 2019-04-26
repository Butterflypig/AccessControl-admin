import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

//定义状态
let state = {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    count: 6,
    customerList: []
};

//用于读取状态
let getters = {
    count () {
        return state.count;
    },
    customerList () {
        return state.customerList;
    }
};

//action 行为，要执行的相关操作，由视图去调用行为
//写相关流程或异步请求
let actions = {
    setProduct (){
          this.$axios.get( this.$api.customer.getCustomerData ).then(
              res => {
                  console.log(res);
              }
          ).catch(
              err => {
                  console.log(err);
                  commit('getCustomerData',res);
              }
          )
    },

    add ( {commit,state} ){
        commit('add');  //提交到mutations对应的名称里
    },
    sub ( {commit,state} ){
        commit('sub');
    }
};

//改变状态的值（处理状态的改变）
let mutations = {
    add( state ){
        state.count++;
    },
    sub( state ){
        state.count--;
    },
    getCustomerData ( res ) {
        state.customerList = res;
    },
    changeLogin (state, user) {
        state.Authorization = user.Authorization;
        localStorage.setItem('Authorization', user.Authorization);
    }
};


export default new Vuex.Store({
                    state,
                    getters,
                    actions,
                    mutations
                });

