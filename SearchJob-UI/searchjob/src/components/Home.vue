<template>
  <v-app style="position: relative;">
    <Header />
    <v-main class="d-lex">
      <Search :hidden="checkHide"></Search>
      <router-view />
      <Footer class="mt-auto" />
    </v-main>
  </v-app>
</template>
<script>
import Header from "./Header.vue";
import Search from "./Search.vue";
import Footer from "./Footer.vue";
export default {
  name: "home",
  components: {
    Header,
    Search,
    Footer,
  },
  data: () => ({
    checkHide: false,
  }),
  created(){
     if (this.$route.name == "company" || this.$route.name == "recruit") {
        this.checkHide = true;
      } else {
        this.checkHide = false;
      }
  },
  watch: {
    $route(to) {
      if (to.name == "company" || to.name == "recruit") {
        this.checkHide = true;
      } else {
        this.checkHide = false;
      }
    },
  },
};
</script>
<style scoped>
.h-alert {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 250px;
  z-index: 9999;
}
</style>
