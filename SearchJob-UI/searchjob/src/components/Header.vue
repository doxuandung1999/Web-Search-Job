<template>
  <v-app-bar
    style="padding: 0 20px"
    height="100px"
    app
    color="white"
    light
    elevate-on-scroll
    elevation="6"
  >
    <v-toolbar-title>
      <v-img width="100px" height="100px" src="../assets/logo.svg"></v-img>
    </v-toolbar-title>

    <v-list class="d-flex align-center" style="padding-left: 30px">
      <v-list-item
        active-class="bg-active"
        v-for="menu in menus"
        :key="menu.title"
        
        @click="routeToPage(menu.route)"
        replace
        link
      >
        <v-list-item-title class="font-family-app">{{
          menu.title
        }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-spacer />

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-card style="box-shadow: none !important" v-bind="attrs" v-on="on">
          <avatar v-show="isUser" :username="userName" color="white"> </avatar>
        </v-card>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="logout"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      v-show="!isUser"
      @click="routeLogin"
      outlined
      color="success"
      class="font-family-app text-none"
      >Đăng nhập</v-btn
    >

    <v-btn
      v-show="!isUser"
      @click="routeRegister"
      style="background-color: #4caf50 !important"
      class="ml-4 font-family-app text-none"
      color="white--text"
      >Đăng ký</v-btn
    >
  </v-app-bar>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  name: "Header",
  components: {
    Avatar,
  },

  data: () => ({
    menus: [
      { title: "Việc làm", route: "job" },
      { title: "Việc làm quan tâm", route: "job-care" },
      { title: "Công ty", route: "company" },
      { title: "Đăng tuyển", route: "recruit" },
    ],
    items: [{ title: "Đăng xuất" }],
    userName: "",
    isUser: false,
  }),
  methods: {
    routeLogin() {
      this.$router.push({ name: "login" });
    },
    routeToPage(route) {
      this.$router.push({ name: route });
    },
    routeRegister() {
      this.$router.push({ name: "register" });
    },
    logout() {
      sessionStorage.removeItem("user");

      this.$router.push({ name: "home" });
      this.$router.go();
    },
  },
  created() {
    if (sessionStorage.getItem("user") != null) {
      var user = JSON.parse(sessionStorage.getItem("user"));
      this.isUser = true;
      this.userName = user.name;
      // if (user.role == 0) {
      //   this.menus = [
      //     { title: "Việc làm", route: "job" },
      //     { title: "Việc làm quan tâm", route: "job-care" },
      //   ];
      // }
    }
  },
};
</script>

<style scoped>
.font-family-app {
  font-family: Arial, Helvetica, sans-serif !important;
  font-weight: 600;
}

/* .v-list-item--link:before {
  background-color: white;
} */
.theme--light.v-list-item--active:before,
.theme--light.v-list-item--active:hover:before,
.theme--light.v-list-item:focus:before {
  border-radius: 4px;
}

.bg-active {
  background-color: white !important;
  color: #4caf50 !important;
}
</style>
