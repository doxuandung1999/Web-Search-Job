<template v-slot:activator="{ on }">
  <v-container style="max-width: 100% !important">
    <v-row
      class="d-flex justify-center align-center"
      style="background-color: #f0f0f0; padding: 20px 0 0"
    >
     <v-alert class="s-alert" :type="typeAlert" v-show="isShowAddler">{{
        messageAlert
      }}</v-alert>
      <v-col cols="10" class="pt-0 content">
        <v-row class="w-full">
          <div class="box-white flex-m m-t-32 box-detail-job w-full">
            <div class="logo">
              <img
                :src="avatar"
                alt=""
                srcset=""
              />
            </div>
            <div class="box-info-job flex-grow-1 my-font">
              <h1 class="job-title text-highlight bold">
                {{ jobPost.title }}
              </h1>
              <div class="company-title" @click="navigateCompany()">
                <a href="" class="text-dark-blue fs-18 bold">{{
                  jobPost.companyName
                }}</a>
              </div>
              <div class="job-deadline">
                <v-icon class="fs-20">mdi-clock-outline</v-icon>
                <span class="m-t-4 m-l-4">Hạn nộp hồ sơ: {{ expireDate }}</span>
              </div>
            </div>
            <div class="btn-group">
              <popup></popup>
              <v-btn
                block
                large
                outlined
                class="ma-2 m-t-32"
                style="height: 36px !important"
                color="success"
                @click="updateJobCare"
                :hidden="jobPost.isFavourite"
              >
                <v-icon left dark class="m-r-16"> mdi-heart-outline </v-icon>
                <span style="font-weight: 500; text-transform: none"
                  >Lưu tin</span
                >
              </v-btn>

              <div
                @click="updateJobCare"
                style="cursor: pointer"
                :class="{ disable: !jobPost.isFavourite }"
              >
                <v-icon class="icon" size="40px" color="#4caf50">
                  mdi-heart</v-icon
                >
              </div>
            </div>
          </div>
        </v-row>
        <v-row class="w-full">
          <div class="box-white flex-t m-t-32 box-detail-job w-full">
            <v-col style="padding: 0 !important" cols="8">
              <h1 class="box-title">Chi tiết tin tuyển dụng</h1>
              <div class="box-info my-font">
                <p>Thông tin chung</p>
                <div class="box-main">
                  <!-- lương -->
                  <div class="box-item flex-m m-t-16">
                    <img
                      src="https://www.topcv.vn/v4/image/job-detail/icon/1.svg"
                      alt=""
                    />
                    <div class="m-l-16">
                      <strong>Mức lương </strong> <br />
                      <span>
                        {{ jobPost.salary }}
                      </span>
                    </div>
                  </div>
                  <!-- số lượng tuyển -->
                  <div class="box-item flex-m m-t-16">
                    <img
                      src="https://www.topcv.vn/v4/image/job-detail/icon/5.svg"
                      alt=""
                    />
                    <div class="m-l-16">
                      <strong>Số lượng tuyển </strong> <br />
                      <span>
                        {{ jobPost.quantity }}
                      </span>
                      <span> Người </span>
                    </div>
                  </div>
                  <!-- hình thức làm việc -->
                  <div class="box-item flex-m m-t-16">
                    <img
                      src="https://www.topcv.vn/v4/image/job-detail/icon/2.svg"
                      alt=""
                    />
                    <div class="m-l-16">
                      <strong>Hình thức làm việc</strong> <br />
                      <span>
                        {{ typeJob }}
                      </span>
                    </div>
                  </div>
                  <!-- yêu cầu giới tính -->
                  <div class="box-item flex-m m-t-16">
                    <img
                      src="https://www.topcv.vn/v4/image/job-detail/icon/3.svg"
                      alt=""
                    />
                    <div class="m-l-16">
                      <strong>Giới tính</strong> <br />
                      <span>
                        {{ sex }}
                      </span>
                    </div>
                  </div>
                  <!-- kinh nghiệm -->
                  <div class="box-item flex-m m-t-16">
                    <img
                      src="https://www.topcv.vn/v4/image/job-detail/icon/4.svg"
                      alt=""
                    />
                    <div class="m-l-16">
                      <strong>Kinh nghiệm</strong> <br />
                      <span>
                        {{ jobPost.experience }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box-address">
                <p>Địa điểm làm việc</p>
                <div>
                  {{ jobPost.jobAddress }}
                </div>
              </div>

              <!-- mô tả công việc -->
              <div class="box-how-to-apply">
                <div class="title-detail">Mô tả công việc</div>
                <div v-html="jobPost.jobDescribe"></div>
              </div>
              <!-- yêu cầu ứng viêb -->
              <div class="box-how-to-apply">
                <div class="title-detail">Yêu cầu ứng viên</div>
                <div v-html="jobPost.request"></div>
              </div>
              <div class="box-how-to-apply">
                <div class="title-detail">Quyền lợi</div>
                <div v-html="jobPost.benefit"></div>
              </div>

              <div class="box-how-to-apply">
                <div class="title-detail">Cách thức ứng tuyển</div>
                <div v-html="jobPost.methodApply"></div>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="box-share-job">
                <div style="font-size: 16px; font-weight: bold">
                  Chia sẻ tin tuyển dụng
                </div>
                <p style="margin-bottom: 10px; margin-top: 16px">
                  Sao chép đường dẫn
                </p>
                <div class="box-copy">
                  <div class="url-copy">
                    https://www.topcv.vn/viec-lam/nhan-vien-tu-van-website-thuong-mai-dien-tu/515383.html
                  </div>
                  <div class="btn-copy flex-c-m hov-pointer">
                    <v-icon color="#00b14f">mdi-animation</v-icon>
                  </div>
                </div>
              </div>
            </v-col>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Popup from '../shared/Popup.vue';
export default {
  components: { Popup },
  name: "JobPageDetail",
  comments: {
    Popup
  },
  data: () => ({
    jobPost: {},
    expireDate: null,
    avatar: require("../../assets/default_company_logo.png"),
    typeJob : "",
    sex: "",
    careers: [
      {
        name: "Tất cả ngành nghề",
        value: 0,
      },
      {
        name: "Kinh doanh / Bán hàng",
        value: 1,
      },
      {
        name: "Biên / Phiên dịch",
        value: 2,
      },
      {
        name: "Bưu chính - Viễn thông",
        value: 3,
      },
      {
        name: "Bảo hiểm",
        value: 4,
      },
      {
        name: "Bất động sản",
        value: 5,
      },
      {
        name: "Chứng khoán / Vàng / Ngoại tệ",
        value: 6,
      },
      {
        name: "Công nghệ cao",
        value: 7,
      },
      {
        name: "Cơ khí / Chế tạo / Tự động hóa",
        value: 8,
      },
      {
        name: "Du lịch",
        value: 9,
      },
      {
        name: "Dầu khí / hóa chất",
        value: 10,
      },
      {
        name: "Dệt may / Da giầy",
        value: 11,
      },
      {
        name: "Dịch vụ khách hàng",
        value: 12,
      },
      {
        name: "Điện tử viễn thông",
        value: 13,
      },
      {
        name: "Điện / Điện tử / Điện lạnh",
        value: 14,
      },
      {
        name: "Giáo dục / Đào tạo",
        value: 15,
      },
      {
        name: "Hóa học / Sinh học",
        value: 16,
      },
      {
        name: "Hoạch định / Dự án",
        value: 17,
      },
      {
        name: "Hàng gia dụng",
        value: 18,
      },
      {
        name: "Hàng hải",
        value: 19,
      },
      {
        name: "Hàng không",
        value: 20,
      },
      {
        name: "Hành chính / văn phòng",
        value: 21,
      },
      {
        name: "IT Phần cứng / Mạng",
        value: 22,
      },
      {
        name: "IT Phần mềm",
        value: 23,
      },
      {
        name: "Khách sạn / Nhà hàng",
        value: 24,
      },
      {
        name: "Kế toán / kiểm toán",
        value: 25,
      },
      {
        name: "Marketing / Tuyển thông / Quảng cáo",
        value: 26,
      },
    ],
    locations: [
      {
        name: "Tất cả địa điểm",
        value: 0,
      },
      {
        name: "An Giang",
        value: 1,
      },
      {
        name: "Bà Rịa – Vũng Tàu",
        value: 2,
      },
      {
        name: "Bạc Liêu",
        value: 3,
      },
      {
        name: "Bắc Giang",
        value: 4,
      },
      {
        name: "Bắc Kạn",
        value: 5,
      },
      {
        name: "Bắc Ninh",
        value: 6,
      },
      {
        name: "Bến Tre",
        value: 7,
      },
      {
        name: "Bình Dương",
        value: 8,
      },
      {
        name: "Bình Định",
        value: 9,
      },
      {
        name: "Bình Phước",
        value: 10,
      },
      {
        name: "Bình Thuận",
        value: 11,
      },
      {
        name: "Cà Mau",
        value: 12,
      },
      {
        name: "Cao Bằng",
        value: 13,
      },
      {
        name: "Cần Thơ",
        value: 14,
      },
      {
        name: "Đà Nẵng",
        value: 15,
      },
      {
        name: "Đắk Lắk",
        value: 16,
      },
      {
        name: "Đắk Nông",
        value: 17,
      },
      {
        name: "Điện Biên",
        value: 18,
      },
      {
        name: "Đồng Nai",
        value: 19,
      },
      {
        name: "Đồng Tháp",
        value: 20,
      },
      {
        name: "Gia Lai",
        value: 21,
      },
      {
        name: "Hà Giang",
        value: 22,
      },
      {
        name: "Hà Nam",
        value: 23,
      },
      {
        name: "Hà Nội",
        value: 24,
      },
      {
        name: "Hà Tĩnh",
        value: 25,
      },
      {
        name: "Hải Dương",
        value: 26,
      },
      {
        name: "Hải Phòng",
        value: 27,
      },
      {
        name: "Hậu Giang",
        value: 28,
      },
      {
        name: "Hòa Bình",
        value: 29,
      },
      {
        name: "Thành phố Hồ Chí Minh",
        value: 30,
      },
      {
        name: "Hưng Yên",
        value: 31,
      },
      {
        name: "Khánh Hòa",
        value: 32,
      },
      {
        name: "Kiên Giang",
        value: 33,
      },
      {
        name: "Kon Tum",
        value: 34,
      },
      {
        name: "Lai Châu",
        value: 35,
      },
      {
        name: "Lạng Sơn",
        value: 36,
      },
      {
        name: "Lào Cai",
        value: 37,
      },
      {
        name: "Lâm Đồng",
        value: 38,
      },
      {
        name: "Long An",
        value: 39,
      },
      {
        name: "Nam Định",
        value: 40,
      },
      {
        name: "Nghệ An",
        value: 41,
      },
      {
        name: "Ninh Bình",
        value: 42,
      },
      {
        name: "Ninh Thuận",
        value: 43,
      },
      {
        name: "Phú Thọ",
        value: 44,
      },
      {
        name: "Phú Yên",
        value: 45,
      },
      {
        name: "Quảng Bình",
        value: 46,
      },
      {
        name: "Quảng Nam",
        value: 47,
      },
      {
        name: "Quảng Ngãi",
        value: 48,
      },
      {
        name: "Quảng Ninh",
        value: 49,
      },
      {
        name: "Quảng Trị",
        value: 50,
      },
      {
        name: "Sóc Trăng",
        value: 51,
      },
      {
        name: "Sơn La",
        value: 52,
      },
      {
        name: "Tây Ninh",
        value: 53,
      },
      {
        name: "Thái Bình",
        value: 54,
      },
      {
        name: "Thái Nguyên",
        value: 55,
      },
      {
        name: "Thanh Hóa",
        value: 56,
      },
      {
        name: "Thừa Thiên Huế",
        value: 57,
      },
      {
        name: "Tiền Giang",
        value: 58,
      },
      {
        name: "Trà Vinh",
        value: 59,
      },
      {
        name: "Tuyên Quang",
        value: 60,
      },
      {
        name: "Vĩnh Long",
        value: 61,
      },
      {
        name: "Vĩnh Phúc",
        value: 62,
      },
      {
        name: "Yên Bái",
        value: 63,
      },
    ],
    typeJobs: [
      {
        name: "Toàn thời gian",
        value: 0,
      },
      {
        name: "Bán thời gian",
        value: 1,
      },
    ],
    sexs: [
      {
        name: "Không yêu cầu",
        value: 0,
      },
      {
        name: "Nam",
        value: 1,
      },
      {
        name: "Nữ",
        value: 2,
      },
    ],
    typeAlert: "success",
    isShowAddler: false,
    messageAlert: "",
  }),
  created(){
    this.initData();
  },
  methods: {
    initData(){
      var user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        axios
          .get("Post/getpost?postID=" + this.$route.params.jobID + "&userID=" + user.id)
          .then((res) => {
            this.jobPost = res.data.result;
            if(this.jobPost.companyAvatar != null){
              this.avatar = this.jobPost.companyAvatar;
              this.expireDate = this.formatDate(this.jobPost.expireDate);
              this.typeJob = this.typeJobs.filter(x => x.value == this.jobPost.typeJob)[0].name;
              this.sex = this.sexs.filter(x => x.value == this.jobPost.requestSex)[0].name;
            }
          })
          .catch(() => {});
      } else {
        console.log("b");
      }
    },
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
    updateJobCare() {
      this.jobPost.isFavourite = !this.jobPost.isFavourite;
      var user = JSON.parse(sessionStorage.getItem("user"));
      var param = {
        UserId : user.id,
        PostId : this.jobPost.postId
      }
      axios
        .post("JobCare/updatejobcare", param)
        .then(() => {
          this.showAlert(
          "success",
          "Thành công"
        );
        })
        .catch(() => {
          this.showAlert(
          "error",
          "Thất bại"
        );
        this.jobPost.isFavourite = !this.jobPost.isFavourite;
        });
    },

    sendCV(){
      console.log("click");
    },
    navigateCompany() {
      this.$router.push({
        name: "company-detail",
        params: { companyID: this.$route.params.jobID  },
      });
    },
    formatDate(date) {
      if (!date) return null;
      const dateobj = date.split("T");
      const [year, month, day] = dateobj[0].split("-");
      return `${day}/${month}/${year}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.disable {
  display: none;
}
.my-font {
  font-family: Arial, Helvetica, sans-serif;
}
.title-detail {
  font-size: 16px;
  font-weight: bold;
}
a {
  text-decoration: none;
  color: black;
}
.wrap {
  background-color: #f0f0f0;
}
.box-white {
  background: white;
  border-radius: 3px;

  padding: 16px;
  .logo {
    width: 110px;
    height: 110px;
    overflow: hidden;
    display: flex;
    align-items: center;
    border: 2px solid #eee;
    border-radius: 75px;
    padding: 4px;
    background: #fff;
    justify-content: center;
    img {
      max-height: 100% !important;
      -o-object-fit: contain;
      object-fit: contain;
      width: 75%;
    }
  }
  .box-info-job {
    flex-grow: 1;
    padding: 16px;
    border-radius: 3px;
    .job-title {
      font-size: 22px;
      margin-bottom: 16px;
      line-height: 29px;
    }
    .company-title {
      margin-bottom: 8px;
    }
  }
  .btn-group {
    padding: 0 16px;
    display: flex;
    flex-direction: column;
  }

  .box-title {
    color: #333;
    font-size: 22px;
    padding-left: 12px;
    border-left: 7px solid #00b14f;
    font-weight: 700;
    margin: 0 0 16px;
  }
  .box-info {
    background: rgba(0, 177, 79, 0.050980392156862744);
    padding: 16px 16px 0;
    margin-bottom: 8px;
    border-radius: 3px;
    p {
      color: #333;
      -webkit-text-decoration-line: underline;
      text-decoration-line: underline;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .box-main {
      display: grid;
      grid-template-columns: 50% 50%;
      .box-item {
        display: flex;
        margin-bottom: 16px;
      }
    }
  }
  .box-address {
    background: rgba(0, 177, 79, 0.050980392156862744);
    padding: 16px;
    border-radius: 3px;
    p {
      color: #333;
      -webkit-text-decoration-line: underline;
      text-decoration-line: underline;
      font-weight: 700;
      margin-bottom: 16px;
    }
  }
  .box-how-to-apply {
    margin-top: 24px;
    h2 {
      font-size: 18px;
      color: #000;
      font-weight: 700;
    }
  }
  .box-share-job {
    border: 1px solid #eee;
    padding: 16px;
    margin-bottom: 24px;
    margin-top: 36px;
    .box-copy {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      .url-copy {
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        background: #fafafa;
        border-radius: 5px;
        padding: 10px 14px;
        width: 86%;
      }
      .btn-copy {
        width: 11%;
        background: #f2fbf6;
        border-radius: 5px;
        width: 40px;
        height: 40px;
        border: none;
      }
    }
  }
}
.text-highlight {
  color: #00b14f;
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