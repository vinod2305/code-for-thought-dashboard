import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async loginWithGoogle({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      let authResult = await firebase
        .auth()
        .signInWithPopup(provider)
        .catch(() => {});
      localStorage.setItem("user", JSON.stringify(authResult.user));
      commit("updateUser", authResult.user);
    },
  },
  modules: {},
});
