<template>
  <v-app>
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
