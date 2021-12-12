<template>
  <div class="w-full">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          style="display: none"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          ref="showConfirm"
        >
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 my-font"> Thông báo </v-card-title>
        <v-card-text style="font-size: 14px" class="my-font"
          >Bạn có chắc chắn xóa bài đăng</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="my-font"
            style="font-weight: bold"
            color="red darken-1"
            :loading="loadingDelete"
            text
            @click="deletePost(data)"
          >
            Đồng ý
          </v-btn>
          <v-btn
            class="my-font"
            style="font-weight: bold"
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Không
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card class="hov-pointer pos-relative">
      <div class="flex-m wrap h-item">
        <div class="image">
          <img v-bind:src="data.CompanyAvatar" alt="" />
        </div>
        <div
          style="padding-left: 12px"
          :class="[!isAdmin && !isManage ? 'w-item' : 'w-item-company']"
        >
          <v-card-title style="padding: 0; display: flex" class="flex-m">
            <div
              @click="navigateDetail(data)"
              :title="data.Title"
              class="title w-full my-font"
              style="font-size: 14px !important; font-weight: bold"
            >
              {{ data.Title }}
            </div>
            <div
              class="pos-absolute"
              style="top: 8px; right: 12px"
              @click="toggleFavourite"
              :class="{ disable: isAdmin }"
              v-show="!isManage"
            >
              <v-icon class="icon" small color="#4caf50">{{
                data.IsFavourite ? "mdi-heart" : "mdi-heart-outline"
              }}</v-icon>
            </div>
            <!-- top: 28px; right: 12px;  -->
            <div
              class="pos-absolute"
              style="
                display: flex;
                flex-direction: column;
                right: 12px;
                top: 15px;
              "
              :class="{ disable: !isAdmin }"
            >
              <div style="display: flex">
                <div
                  v-show="data.Status == 0"
                  style="color: #4caf50; font-size: 14px; padding-right: 14px"
                >
                  Đã duyệt
                </div>
                <div
                  v-show="data.Status == 1"
                  style="color: red; font-size: 14px; padding-right: 14px"
                >
                  Chưa duyệt
                </div>
                <v-btn
                  outlined
                  color="success"
                  style="margin-right: 14px"
                  class="font-family-app text-none"
                  small
                  @click="editPost(data)"
                  >Sửa</v-btn
                >
                <v-btn
                  color="error"
                  class="font-family-app text-none"
                  small
                  @click="confimDelete"
                  >Xóa</v-btn
                >
              </div>

              <div
                v-show="isShowDate"
                style="
                  font-size: 12px;
                  margin-top: 4px;
                  text-align: right;
                  color: #797272;
                "
              >
                <span>Còn </span> <span>{{ driffDate }}</span>
                <span> ngày</span>
              </div>
              <div
                v-show="!isShowDate"
                style="
                  font-size: 12px;
                  margin-top: 4px;
                  text-align: right;
                  color: red;
                "
              >
                Đã hết hạn
              </div>
            </div>

            <div
              v-show="isManage"
              class="pos-absolute"
              style="
                display: flex;
                flex-direction: column;
                right: 12px;
                top: 15px;
              "
            >
              <div style="display: flex">
                <v-btn
                  outlined
                  color="success"
                  class="font-family-app text-none"
                  style="margin-right: 14px"
                  small
                  @click="acceptPost(data)"
                  :loading="loadingAccept"
                  >Duyệt</v-btn
                >
                <v-btn
                  color="error"
                  class="font-family-app text-none"
                  small
                  @click="confimDelete"
                  >Xóa</v-btn
                >
              </div>
              <div
                v-show="isShowDate"
                style="
                  font-size: 12px;
                  margin-top: 4px;
                  text-align: right;
                  color: #797272;
                "
              >
                <span>Còn </span> <span>{{ driffDate }}</span>
                <span> ngày</span>
              </div>
              <div
                v-show="!isShowDate"
                style="
                  font-size: 12px;
                  margin-top: 4px;
                  text-align: right;
                  color: red;
                "
              >
                Đã hết hạn
              </div>
            </div>
          </v-card-title>
          <v-card-subtitle
            @click="navigateCompany(data)"
            :title="data.CompanyName"
            class="sub-title my-font"
            style="padding: 12px 0 0 0; font-size: 12px"
          >
            {{ data.CompanyName }}</v-card-subtitle
          >
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import JobItemModel from "@/models/job-item.js";
import axios from "axios";
export default {
  name: "JobItem",
  data() {
    return {
      loadingAccept: false,
      dialog: false,
      loadingDelete: false,
      driffDate: null,
      nowDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      isShowDate: true,
    };
  },
  props: {
    data: {
      type: JobItemModel,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isManage: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  watch: {},
  created() {
    // console.log(this.nowDate);
    this.driffDate = Math.floor(
      (Date.parse(this.formatDateDriff(this.data.ExpireDate)) -
        Date.parse(this.nowDate)) /
        86400000
    );
    if (parseInt(this.driffDate) <= 0) {
      this.isShowDate = false;
    } else {
      this.isShowDate = true;
    }
  },
  methods: {
    formatDateDriff(date) {
      if (!date) return null;
      const dateobj = date.split("T");
      return dateobj[0];
    },
    toggleFavourite() {
      this.data.IsFavourite = !this.data.IsFavourite;
      var user = JSON.parse(sessionStorage.getItem("user"));
      var param = {
        UserId: user.id,
        PostId: this.data.PostId,
      };
      axios
        .post("JobCare/updatejobcare", param)
        .then(() => {
          this.$emit("emit-alert", "success", "Thành công");
        })
        .catch(() => {
          // this.showAlert("error", "thêm công việc quan tâm thất bại");
          this.$emit("emit-alert", "error", "Thất bại");
        });
    },
    navigateDetail(data) {
      this.$router.push({ name: "job-detail", params: { jobID: data.PostId } });
    },
    navigateCompany(data) {
      this.$router.push({
        name: "company-detail",
        params: { companyID: data.CompanyId },
      });
    },
    editPost(data) {
      this.$router.push({
        name: "recruit-edit",
        params: { PostID: data.PostId },
      });
    },
    acceptPost(data) {
      this.loadingAccept = true;
      axios
        .post("Post/updatestatus?postID=" + data.PostId)
        .then(() => {
          this.loadingAccept = false;
          this.$emit("emit-alert", "success", "Thành công");
          this.$emit("load-page");
        })
        .catch(() => {
          this.loadingAccept = false;
          // this.showAlert("error", "thêm công việc quan tâm thất bại");
          this.$emit("emit-alert", "error", "Thất bại");
        });
    },
    confimDelete() {
      this.dialog = true;
    },
    deletePost(data) {
      axios
        .post("Post/deletepost?postID=" + data.PostId)
        .then(() => {
          this.loadingDelete = false;
          this.dialog = false;
          this.$emit("emit-alert", "success", "Xóa bài đăng thành công");
          this.$emit("load-page");
        })
        .catch(() => {
          this.loadingDelete = false;
          // this.showAlert("error", "thêm công việc quan tâm thất bại");
          this.$emit("emit-alert", "error", "Thất bại");
        });
    },
  },
  mounted() {
    // console.log(this.data);
  },
};
</script>

<style lang="scss" scoped>
.h-item {
  height: 86px;
  margin: 0 0 8px 0;
  transition: box-shadow 0.2s;
  box-shadow: 2px 2px 12px rgb(33 47 63 / 10%);
}

.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    text-decoration: underline;
  }
}
.sub-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #999;
  &:hover {
    text-decoration: underline;
  }
}
.wrap {
  padding: 12px;
  &:hover {
    background-color: #f6f6f6;
  }
}
.image {
  width: 42px;
  height: 42px;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 7px;
  border: 0.25px solid #f7f7f7;
}
img {
  max-width: 100%;
  width: 42px;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  -o-object-fit: contain;
  object-fit: contain;
}
.icon {
  &:hover {
    color: green;
  }
}
.my-font {
  font-family: Arial, Helvetica, sans-serif;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
.disable {
  display: none !important;
}
.w-item {
  width: calc(100% - 100px);
}
.w-item-company {
  width: calc(100% - 250px);
}
</style>