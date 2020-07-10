import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Form from '../views/Form.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/form',
    name: 'Form',
    component: Form,
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const requireAuth = to.matched.some(record => record.meta.requireAuth);

  let userLoggedIn = currentUser !== null;

  if (requireAuth && !userLoggedIn) next("/");
  else next();
});

export default router
