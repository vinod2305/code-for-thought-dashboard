<template>
  <div class="my-2">
    <v-btn small @click="register">Register</v-btn>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    async register() {
      if (JSON.parse(localStorage.getItem("user"))) {
        this.$router.push("/form");
      } else {
        this.$store.dispatch("loginWithGoogle");
      }
    }
  }
};
</script>
