import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";

Vue.config.productionTip = false;

const config = {
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export const storageRef = firebase.storage().ref();
export const auth = firebase.auth();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
