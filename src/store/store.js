import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentActiveEl: null, // поточний активний елемент третього(last) блоку
    currentActivePath: [], // поточна ієрархія
    choosenPath: [], // ієрархія активного елементу
  },
  actions: {},
  mutations: {
    setCurrentActiveEl(state, currentEl) {
      // Задажємо новий активний елемент
      console.log(currentEl);
      state.currentActiveEl = currentEl;
    },
    setZeroPathLvL(state) {
      // Обнуляємо поточну ієрархію
      state.currentActivePath = [];
    },
    setFirstPathLvL(state, first) {
      // Привласнюємо назву першого блоку поточній ієрархії
      state.currentActivePath = first;
    },
    setSecondPathLvL(state, firstAndSecond) {
      // Привласнюємо назву першого і другого блоку поточній ієрархії
      state.currentActivePath = firstAndSecond;
    },
    setLastPathLvL(state, allPath) {
      // Привласнюємо весь шлях поточній ієрархії
      state.currentActivePath = allPath;
    },
  },
  getters: {},
  modules: {},
});
