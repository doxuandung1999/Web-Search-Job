<template>
  <div class="w-full">
    <v-card class="hov-pointer pos-relative">
      <div class="flex-m wrap h-item">
        <div class="image">
          <img v-bind:src="data.CompanyAvatar" alt="" />
        </div>
        <div style="width: calc(100% - 100px); padding-left: 12px">
          <v-card-title style="padding: 0; display: flex" class="flex-m">
            <div  @click="navigateDetail(data)" :title="data.Title" class="title w-full my-font" style="font-size:14px !important;font-weight:bold">
              {{ data.Title }}
            </div>
            <div
              class="pos-absolute"
              style="top: 8px; right: 12px"
              @click="toggleFavourite"
            >
              <v-icon class="icon" small color="#4caf50">{{
                data.IsFavourite ? "mdi-heart" : "mdi-heart-outline"
              }}</v-icon>
            </div>
          </v-card-title>
          <v-card-subtitle :title="data.CompanyName" class="sub-title my-font" style="padding: 12px 0 0 0; font-size:12px">
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
  props: {
    data: {
      type: JobItemModel,
      default: null,
    },
  },
  computed: {},
  watch: {},
  methods: {
    toggleFavourite() {
      this.data.IsFavourite = !this.data.IsFavourite;
      var user = JSON.parse(sessionStorage.getItem("user"));
      var param = {
        UserId : user.id,
        PostId : this.data.PostId
      }
      axios
        .post("JobCare/updatejobcare", param)
        .then(() => {
          this.$emit('emit-alert', "success" , "Thành công");
        })
        .catch(() => {
          // this.showAlert("error", "thêm công việc quan tâm thất bại");
          this.$emit('emit-alert', "error" , "Thất bại");
        });
    },
    navigateDetail(data) {
      this.$router.push({ name: "job-detail", params: { jobID: data.PostId } });
    },
  },
  mounted() {
    // console.log(this.data);
  },
};
</script>

<style lang="scss" scoped>
.h-item{
  height: 86px;
  margin: 0 0 8px 0;
  transition: box-shadow .2s;
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
.my-font{
   font-family: Arial, Helvetica, sans-serif;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
</style>