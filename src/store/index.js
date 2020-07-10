import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/main";
import { storageRef } from "@/main";
import { auth } from "@/main";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user")),
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload;
    },
    logoutUser(state) {
      state.user = null;
    },
  },
  actions: {
    async logout({ commit }) {
      try {
        await auth.signOut();
        localStorage.removeItem("user");
        commit("logoutUser");
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async loginWithGoogle({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      let authResult = await firebase
        .auth()
        .signInWithPopup(provider)
        .catch(() => {});
      localStorage.setItem("user", JSON.stringify(authResult.user));
      commit("updateUser", authResult.user);
    },

    async registerStudent(payload) {
      const file = payload.file;
      let data = payload.data;
      try {
        let result = await db.collection("students").doc(data.usn).get();

        if (!result.exists) {
          let snapshot = await storageRef.child(`${data.usn}.jpg`).put(file);
          let downloadUrl = await snapshot.ref.getDownloadURL();
          const finalData = {
            ...data,
            imageName: `${data.usn}.jpg`,
            imageUrl: downloadUrl,
          };
          await db.collection("students").doc(data.usn).set(finalData);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
});
