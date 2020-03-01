import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    position: '北京',
    userName:''
};

const mutation = {
    setPosition(state, val) {
        state.position = val;
    },
    setUsername(state,val){
        state.userName = val;
    }
};

const actions = {
    setPosition(state, val) {
        state.commit('setPostion',val);
    }
};

export default new Vuex.Store({
    state, mutation, actions
})