import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentActiveEl: null,
    currentActivePath: [],
    choosenPath: [],
  },
  actions: {},
  mutations: {
    setCurrentEl(state, currentEl) {
      console.log(currentEl);
      state.currentActiveEl = currentEl;
    },
    addPathToCurrentPath(state, path) {
      if (state.currentActivePath.includes(path, 0)) {
        return;
      } else {
        state.currentActivePath.push(path);
      }
    },
    setZeroPathLvL(state) {
      state.currentActivePath = [];
    },
    setFirstPathLvL(state, first) {
      state.currentActivePath = first;
    },
    setSecondPathLvL(state, firstAndSecond) {
      state.currentActivePath = firstAndSecond;
    },
    setLastPathLvL(state, allPath) {
      state.currentActivePath = allPath;
    },
    // SetSecondPath(state, firstAndSecond) {
    //     state.currentActivePath = firstAndSecond;
    //   },
  },
  getters: {},
  modules: {},
});
