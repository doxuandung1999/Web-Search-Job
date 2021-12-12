<template>
  <v-container style="max-width: 100% !important">
    <v-row
      class="d-flex justify-center align-center pb-10"
      style="background-color: #f0f0f0; padding: 20px 0 0"
    >
      <v-alert class="s-alert" :type="typeAlert" v-show="isShowAddler">{{
        messageAlert
      }}</v-alert>
      <v-col cols="10" class="pt-0 content" style="background-color: #f0f0f0">
        <v-row style="background-color: white">
          <div style="width: 100%; position: relative">
            <v-img height="236px" :src="banner" width="100%"></v-img>
          </div>

          <div
            style="
              padding: 4px;
              border-radius: 4px;
              margin-top: -70px;
              z-index: 2;
              margin-left: 24px;
              margin-bottom: 24px;
            "
          >
            <img
              height="140px"
              width="140px"
              :src="avatar"
              style="
                border-radius: 4px;
                padding: 4px;
                background-color: white;
                object-fit: cover;
              "
            />
          </div>
          <div
            style="
              width: 470px;
              margin-left: 20px;
              margin-top: 10px;
              margin-bottom: 24px;
            "
          >
            <div style="font-size: 18px; padding-top: 8px">
              {{ company.companyName }}
            </div>
          </div>
        </v-row>
        <v-row>
          <div class="content-company">
            <div class="content-left">
              <div class="left-title">
                <div>Giới thiệu công ty</div>
              </div>
              <div v-html="company.companyDescriber"></div>
            </div>
            <div class="content-right">
              <div class="left-title">
                <div>Địa chỉ công ty</div>
              </div>

              <div>
                <div class="location">
                  <v-icon dark color="#4caf50"> mdi-map-marker </v-icon>
                  <div style="margin-left: 4px">{{ company.address }}</div>
                </div>
              </div>
            </div>
          </div>
        </v-row>
        <v-row>
          <div class="content-company">
            <div class="content-left">
              <div class="left-title">Tuyển dụng</div>
              <v-row
                class="d-flex align-center p-b-52 p-t-8 p-l-8 p-r-8 p-t-16"
              >
                <v-col
                  v-for="jobItem in listJobItem"
                  :key="jobItem.PostId"
                  lg="12"
                  md="12"
                  sm="12"
                  xs="16"
                  class="pt-0 content"
                >
                  <job-item
                    :data="jobItem"
                    @emit-alert="showAlert"
                    :isAdmin="false"
                  ></job-item>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import JobItem from "../shared/JobItem.vue";
import JobItemModel from "@/models/job-item.js";
export default {
  name: "company",
  components: {
    JobItem,
  },

  data: () => ({
    hihi: "Anh <strong>l&agrave; Dũng</strong>",
    isChoseBanner: false,
    isChoseAvatar: false,
    isEdit: true,
    avatar: require("../../assets/default_company_logo.png"),
    banner: require("../../assets/topcv_banner.jpg"),
    isDisableLocal: false,
    isWantEdit: true,
    isAdminCompany: true,
    isWantEditLocation: true,
    isEditLocation: true,
    isWantEditName: true,
    isEditName: true,
    company: null,
    location: null,
    htmlText: null,
    typeAlert: "success",
    isShowAddler: false,
    messageAlert: "",
    companyStorage: null,
    isLoadingName: false,
    isLoadingDescribe: false,
    isLoadingLocation: false,
    listJobItem: [],
    nowDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
  }),
  created() {
    if (this.$route.params.companyID) {
      axios
        .get("company/getcompanybycompanyid?id=" + this.$route.params.companyID)
        .then((res) => {
          this.company = { ...res.data.data };

          if (this.company.companyAvatar != null) {
            this.avatar = this.company.companyAvatar;
          }
          if (this.company.companyBanner != null) {
            this.banner = this.company.companyBanner;
          }
          if (this.company.address == null) {
            this.company.address = "Chưa có thông tin";
          }
          if (this.company.companyName == null) {
            this.company.companyName = "Chưa có thông tin";
          }
          if (this.company.companyDescriber == null) {
            this.company.companyDescriber = "Chưa có thông tin";
          }
        })
        .catch(() => {});

      var userCompany = JSON.parse(sessionStorage.getItem("user"));
      if (userCompany) {
        axios
          .get(
            "Post/getpostbycompanyid?companyID=" +
              this.$route.params.companyID +
              "&userID=" +
              userCompany.id
          )
          .then((res) => {
            res.data.result.forEach((element) => {
              if (element.status == 0 && Math.floor( (Date.parse(this.formatDateDriff(element.expireDate)) - Date.parse(this.nowDate)) / 86400000 > 0)) {
                var objItem = new JobItemModel(
                  element.postId,
                  element.companyId,
                  element.title,
                  element.companyName,
                  element.companyAvatar,
                  element.isFavourite
                );
                this.listJobItem.push(objItem);
              }
            });
          })
          .catch(() => {});
      }
    }
  },

  methods: {
    // show thông báo
    showAlert(typeAlert, messageAlert) {
      this.typeAlert = typeAlert;
      this.messageAlert = messageAlert;
      this.isShowAddler = true;
      setTimeout(() => {
        this.isShowAddler = false;
      }, 3000);
      // setTimeout(this.isShowAddler = false, 3000);
    },
    formatDateDriff(date) {
      if (!date) return null;
      const dateobj = date.split("T");
      return dateobj[0];
    },
  },
};
</script>

<style scoped>
.content {
  background-color: #fff;
  border-radius: 4px;
}
.content-company {
  display: flex;
  background-color: #f0f0f0;
  margin-top: 20px;
  width: 100%;
}

.content-left {
  max-width: 700px;
  background-color: #fff;
  padding: 12px 20px 12px 20px;
  flex: 1;
}
.content-right {
  width: 300px;
  max-height: 300px;
  min-width: 200px;
  max-width: 350px;
  margin-left: 20px;
  background-color: #fff;
  padding: 12px 20px 12px 20px;
}
.left-title {
  border-left: 6px solid #4caf50;
  font-size: 18px !important;
  font-weight: 500;
  padding-left: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.disable {
  display: none;
}
.location {
  display: flex;
  align-items: center;
  flex-wrap: initial;
}
.s-alert {
  position: fixed;
  right: 0;
  bottom: 0;
  max-width: 250px;
  z-index: 9999;
  height: 36px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
}
.my-font {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
