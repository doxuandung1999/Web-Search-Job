<template>
  <v-container style="max-width: 100% !important">
    <v-row
      class="d-flex justify-center align-center pb-10"
      style="background-color: #f0f0f0; padding: 20px 0 0"
    >
      <v-col cols="10" class="pt-0 content" style="background-color: #f0f0f0">
        <v-row>
          <div>
            <v-alert type="success"> I'm a success alert. </v-alert>
          </div>
        </v-row>
        <v-row style="background-color: white">
          <div style="width: 100%; position: relative">
            <v-img height="236px" :src="banner" width="100%"></v-img>
            <input
              type="file"
              accept="image/*"
              label="File input"
              style="display: none"
              ref="inputBanner"
              @change="onBannerPick"
            />
            <v-btn
              :disabled="isChoseBanner"
              color="#f0f0f0"
              class="ma-2 font-family-app text-none"
              @click="upBanner"
              style="
                position: absolute;
                right: 0;
                margin-right: 0px !important;
                margin-top: -36px !important;
                border-radius: 4px 0px 0px 4px;
              "
            >
              Chỉnh sửa ảnh bìa
              <v-icon right dark> mdi-camera </v-icon>
            </v-btn>
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

            <input
              type="file"
              accept="image/*"
              label="File input"
              style="display: none"
              ref="inputAvatar"
              @change="onAvatarPick"
            />
            <v-btn
              :disabled="isChoseAvatar"
              color="#f0f0f0"
              class="ma-2"
              fab
              small
              @click="upAvatar"
              style="
                margin-left: -33px !important;
                margin-top: -16px !important;
              "
            >
              <v-icon dark> mdi-camera </v-icon>
            </v-btn>
          </div>
          <div
            style="
              width: 470px;
              margin-left: 20px;
              margin-top: 10px;
              margin-bottom: 24px;
            "
          >
            <div :class="{ disable: !isAdminCompany }">
              <v-btn
                outlined
                color="success"
                class="font-family-app text-none"
                small
                @click="editName"
                :class="{ disable: !isEditName }"
                >Sửa</v-btn
              >
              <v-btn
                :class="{
                  disable: isWantEditName,
                  disable: isEditName,
                }"
                color="success"
                class="font-family-app text-none"
                small
                >Lưu</v-btn
              >
              <v-btn
                :class="{
                  disable: isWantEditName,
                  disable: isEditName,
                }"
                outlined
                color="error"
                class="font-family-app text-none ml-4"
                small
                @click="cancelEditName"
                >Hủy</v-btn
              >
              <v-text-field
                :class="{ disable: isEditName }"
                color="#4caf50"
                class="pl-2"
                v-model="company.companyName"
                hide-details="true"
              ></v-text-field>
            </div>
            <div
              :class="{ disable: !isEditName }"
              style="font-size: 18px; padding-top: 8px"
            >
              {{ company.companyName }}
            </div>
          </div>
        </v-row>
        <v-row>
          <div class="content-company">
            <div class="content-left">
              <div class="left-title">
                <div>Giới thiệu công ty</div>
                <div
                  :class="{ disable: !isAdminCompany }"
                  style="margin-left: 50px"
                >
                  <v-btn
                    outlined
                    color="success"
                    class="font-family-app text-none"
                    small
                    @click="editDescriber"
                    :class="{ disable: !isEdit }"
                    >Sửa</v-btn
                  >
                  <v-btn
                    :class="{ disable: isWantEdit, disable: isEdit }"
                    color="success"
                    class="font-family-app text-none"
                    small
                    >Lưu</v-btn
                  >
                  <v-btn
                    :class="{ disable: isWantEdit, disable: isEdit }"
                    outlined
                    color="error"
                    class="font-family-app text-none ml-4"
                    small
                    @click="cancelEdit"
                    >Hủy</v-btn
                  >
                </div>
              </div>
              <div :class="{ disable: !isEdit }">
                {{ company.companyDescriber }}
              </div>
              <div :class="{ disable: isEdit }">
                <editor
                  v-model="company.companyDescriber"
                  :resizable-content="true"
                  :resizable-toolbar="true"
                  rows="10"
                  cols="30"
                >
                </editor>
              </div>
            </div>
            <div class="content-right">
              <div class="left-title">
                <div>Địa chỉ công ty</div>
                <div
                  :class="{ disable: !isAdminCompany }"
                  style="margin-left: 50px"
                >
                  <v-btn
                    outlined
                    color="success"
                    class="font-family-app text-none"
                    small
                    @click="editLocation"
                    :class="{ disable: !isEditLocation }"
                    >Sửa</v-btn
                  >
                  <v-btn
                    :class="{
                      disable: isWantEditLocation,
                      disable: isEditLocation,
                    }"
                    color="success"
                    class="font-family-app text-none"
                    small
                    >Lưu</v-btn
                  >
                  <v-btn
                    :class="{
                      disable: isWantEditLocation,
                      disable: isEditLocation,
                    }"
                    outlined
                    color="error"
                    class="font-family-app text-none ml-4"
                    small
                    @click="cancelEditLocation"
                    >Hủy</v-btn
                  >
                </div>
              </div>

              <div :class="{ disable: !isEditLocation }">
                <div class="location">
                  <v-icon dark color="#4caf50"> mdi-map-marker </v-icon>
                  <div style="margin-left: 4px">{{ company.address }}</div>
                </div>
              </div>

              <v-text-field
                :class="{ disable: isEditLocation }"
                color="#4caf50"
                class="pl-2"
                v-model="company.address"
                prepend-inner-icon="mdi-map-marker"
                hide-details="true"
              ></v-text-field>
            </div>
          </div>
        </v-row>
        <v-row>
          <div class="content-company">
            <div class="content-left">
              <div class="left-title">Tuyển dụng</div>
            </div>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Editor } from "@progress/kendo-editor-vue-wrapper";
import axios from "axios";
export default {
  name: "company",
  components: {
    Editor,
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
  }),
  created() {
    console.log("b");
    if (this.$route.query.id) {
      console.log("a");
    } else {
      if (sessionStorage.getItem("user") != null) {
        var user = JSON.parse(sessionStorage.getItem("user"));
        this.company = user.company;
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
      }
    }
  },

  methods: {
    onBannerPick(event) {
      const filebanner = event.target.files;
      const filereader = new FileReader();
      filereader.addEventListener("load", () => {
        this.banner = filereader.result;

        this.company.companyBanner = this.banner;
        axios
          .post("company/updatecompany", this.company)
          .then((res) => {
            var user = JSON.parse(sessionStorage.getItem("user"));
            user.company = res.data.data;
            sessionStorage.removeItem("user");
            sessionStorage.setItem("user", JSON.stringify(user));
          })
          .catch(() => {});
      });
      filereader.readAsDataURL(filebanner[0]);

      // console.log(this.banner);
      // ../../assets/topcv_banner.jpg
    },
    onAvatarPick(event) {
      const filebanner = event.target.files;
      const filereader = new FileReader();
      filereader.addEventListener("load", () => {
        this.avatar = filereader.result;
      });
      filereader.readAsDataURL(filebanner[0]);
      // console.log(this.banner);
    },
    upBanner() {
      this.$refs.inputBanner.click();
    },
    upAvatar() {
      this.$refs.inputAvatar.click();
    },
    editDescriber() {
      this.isEdit = false;
      this.isWantEdit = false;
    },
    cancelEdit() {
      this.isEdit = true;
      this.isWantEdit = true;
    },
    editLocation() {
      this.isEditLocation = false;
      this.isWantEditLocation = false;
    },
    cancelEditLocation() {
      this.isEditLocation = true;
      this.isWantEditLocation = true;
    },
    editName() {
      this.isEditName = false;
      this.isWantEditName = false;
    },
    cancelEditName() {
      this.isEditName = true;
      this.isWantEditName = true;
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
</style>
