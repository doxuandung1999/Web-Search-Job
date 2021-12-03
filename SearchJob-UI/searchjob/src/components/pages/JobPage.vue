<template>
  <v-container>
    <v-row class="d-flex justify-center align-center">
      <v-col>
        <div class="fs-20 bold flex-m">
          <v-icon class="m-r-4" color="green darken-2">mdi-star</v-icon
          ><span style="line-height: 25px"
            >TIN TUYỂN DỤNG, VIỆC LÀM TỐT NHẤT</span
          >
        </div>
      </v-col>

      <v-carousel
        v-model="model"
        show-arrows-on-hover
        :height="'auto'"
        hide-delimiter-background
        progress-color="grey"
      >
        <v-carousel-item v-for="color in colors" :key="color">
          <v-row
            class="
              d-flex
              justify-center
              align-center
              p-b-52 p-t-8 p-l-8 p-r-8 p-t-16
            "
          >
            <v-col
              v-for="jobItem in listJobItem"
              :key="jobItem.JobID"
              lg="4"
              md="6"
              sm="6"
              xs="12"
              class="pt-0 content"
            >
              <job-item :data="jobItem"></job-item>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-row>
  </v-container>
</template>

<script>
import JobItem from "../shared/JobItem.vue";
import JobItemModel from "@/models/job-item.js";
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
    };
  },
  methods: {
    initData() {
      this.listJobItem = new Array(
        new JobItemModel(
          "Chuyên Viên Tư Vấn Tài Chính Cấp Cao - Dự Án Hợp Tác Ngân Hàng (Bắc Ninh - Hải Phòng - Hải Dương)",
          "CÔNG TY TNHH RYON",
          "https://cdn.topcv.vn/140/company_logos/cong-ty-tnhh-ryon-61a5d0504bc17.jpg",
          null,
          true,
          null,
          1
        ),
        new JobItemModel(
          "Sale Marketing (Lương >35 Triệu) Làm Việc Tại Philippines",
          "DOUBLE DRAGON",
          "https://cdn.topcv.vn/80/company_logos/64959bdddd1eb3d04aa0958133ba16b6-5e1d3ac405e7d.jpg",
          null,
          false,
          null,
          2
        ),
        new JobItemModel(
          "Giảng Viên Dạy Tiếng Anh (Ielts & Giao Tiếp) - Thu Nhập Hấp Dẫn - Toàn Quốc",
          "Công ty Cổ Phần Đầu tư Giáo dục Và Phát triển Nguồn Lực Quốc Tế Pasal ",
          "https://cdn.topcv.vn/80/company_logos/cong-ty-co-phan-dau-tu-giao-duc-va-phat-trien-nguon-luc-quoc-te-pasal-5ad4093c6754b_rs.jpg",
          null,
          false,
          null,
          3
        ),
      );
    },
  },
  mounted() {
    this.initData();
  },
};
</script>

<style scoped>
.content {
  background-color: #fff;
  border-radius: 4px;
}
</style>
s