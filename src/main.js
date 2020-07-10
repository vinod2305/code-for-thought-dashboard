import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyD7YdC4nLKArUL1tEAiPOmRn0P3lRNC1es",
  authDomain: "coding-site.firebaseapp.com",
  databaseURL: "https://coding-site.firebaseio.com",
  projectId: "coding-site",
  storageBucket: "coding-site.appspot.com",
  messagingSenderId: "650942778639",
  appId: "1:650942778639:web:77e88f2a131b2041cd027a",
  measurementId: "G-7B1MSVJXNN",
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
