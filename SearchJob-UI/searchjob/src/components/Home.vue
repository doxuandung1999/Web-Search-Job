<template>
  <v-app>
    <Header />
    <v-main class="d-lex">
      <Search />
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
    Footer
  },
  data: () => ({}),
};
</script>
