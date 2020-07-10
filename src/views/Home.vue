<template>
  <div class="my-2">
    <v-btn small @click="register">Register</v-btn>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    register() {
      let currentUser = JSON.parse(localStorage.getItem("user"));
      if (currentUser) {
        this.$router.push("/about");
      } else {
        this.$store.dispatch("loginWithGoogle").then(() => {
          this.$router.push("/about");
        });
      }
    }
  }
};
</script>
