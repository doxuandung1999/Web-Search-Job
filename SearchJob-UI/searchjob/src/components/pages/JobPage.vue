<template>
  <v-container style="max-width: 100% !important">
    <v-row
      class="d-flex justify-center align-center"
      style="background-color: #f0f0f0; padding: 20px 0 0"
    >
    <v-alert class="s-alert" :type="typeAlert" v-show="isShowAddler">{{
        messageAlert
      }}</v-alert>
      <v-col cols="10" class="pt-0 content">
        <v-col>
          <div class="fs-18 bold flex-m">
            <v-icon class="m-r-4" color="green darken-2">mdi-star</v-icon
            ><span style="line-height: 60px"
              >TIN TUYỂN DỤNG, VIỆC LÀM TỐT NHẤT</span
            >
          </div>
        </v-col>

        <v-carousel
          v-model="model"
          show-arrows-on-hover
          :height="'auto'"
          hide-delimiter-background
          progress-color="#4caf50"
          style="background-color: #fff:padding:20px;"
          
        >
          <v-carousel-item v-for="(page, i) in listPage" :key="i" >
            <v-row class="d-flex align-center p-b-52 p-t-8 p-l-8 p-r-8 p-t-16">
              <v-col
                v-for="jobItem in page"
                :key="jobItem.PostId"
                lg="4"
                md="4"
                sm="4"
                xs="16"
                class="pt-0 content"
              >
                <job-item :data="jobItem" @emit-alert="showAlert"></job-item>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import JobItem from "../shared/JobItem.vue";
import JobItemModel from "@/models/job-item.js";
import axios from "axios";
export default {
  name: "jobpage",
  components: {
    JobItem,
  },
  data() {
    return {
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      model: 0,
      listJobItem: [],
      listPage: [],
      listItemInPageOne: [],
      listItemInPageTwo: [],
      typeAlert: "success",
    isShowAddler: false,
    messageAlert: "",
    };
  },
  methods: {
    initData() {
      var user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        axios
          .get("Post/getpostbyuserid?userID=" + user.id)
          .then((res) => {
            res.data.result.forEach((element) => {
              var objItem = new JobItemModel(
                element.postId,
                element.companyId,
                element.title,
                element.companyName,
                element.companyAvatar,
                element.isFavourite
              );
              this.listJobItem.push(objItem);
            });
            for (let i = 0; i < this.listJobItem.length; i++) {
              if (i < 12) {
                this.listItemInPageOne.push(this.listJobItem[i]);
              } else {
                this.listItemInPageTwo.push(this.listJobItem[i]);
              }
            }
            this.listPage.push(this.listItemInPageOne);
            this.listPage.push(this.listItemInPageTwo);
          })
          .catch(() => {});
      } else {
        axios
          .get("Post/getallpost")
          .then((res) => {

            res.data.result.forEach((element) => {
              var objItem = new JobItemModel(
                element.postId,
                element.companyId,
                element.title,
                element.companyName,
                element.companyAvatar,
                element.isFavourite
              );
              this.listJobItem.push(objItem);
            });
            for (let i = 0; i < this.listJobItem.length; i++) {
              if (i < 12) {
                this.listItemInPageOne.push(this.listJobItem[i]);
              } else {
                this.listItemInPageTwo.push(this.listJobItem[i]);
              }
            }
            this.listPage.push(this.listItemInPageOne);
            this.listPage.push(this.listItemInPageTwo);
          })
          .catch(() => {});
      }

      
      // setTimeout(this.isShowAddler = false, 3000);
    },

    showAlert(typeAlert, messageAlert) {
      this.typeAlert = typeAlert;
      this.messageAlert = messageAlert;
      this.isShowAddler = true;
      setTimeout(() => {
        this.isShowAddler = false;
      }, 3000);

 
    },
  },
  created() {
    this.initData();
  },
};
</script>

<style scoped>
.content {
  background-color: #fff;
  border-radius: 4px;
}
.s-alert {
  position: fixed;
  right: 0;
  bottom: 0;
  max-width: 600px;
  z-index: 9999;
  font-family: Arial, Helvetica, sans-serif;
  height: 36px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
