<template>
  <v-container style="max-width: 100% !important">
    <v-row
      class="d-flex justify-center align-center pb-10"
      style="background-color: #f0f0f0; padding: 20px 0 0"
    >
      <v-alert class="s-alert" :type="typeAlert" v-show="isShowAddler">{{
        messageAlert
      }}</v-alert>
      <v-col cols="11" class="pt-0 content">
        <v-row style="background-color: #f0f0f0" class="d-flex align-center">
          <v-col class="pl-0" cols="2">
            <div style="font-size: 18px; font-weight: bold">
              Thông tin chung
            </div>
          </v-col>
          <v-col cols="10">
            <v-btn
              outlined
              color="success"
              class="font-family-app text-none"
              style="background-color: #fff"
              :loading="isLoadingPost"
              @click="pushPost"
              >Đăng tuyển</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="d-flex">
          <v-col cols="6" class="recruit-left p-12">
            <v-row
              class="d-flex align-center m-0"
              style="margin: 12px !important; height: 36px"
            >
              <v-col cols="3" style="padding: 0 !important; font-weight: bold">
                Tên công việc
              </v-col>
              <v-col cols="9" style="padding: 0 !important">
                <v-text-field
                  color="#4caf50"
                  class="my-font pl-4"
                  style="font-size: 14px"
                  hide-details="true"
                  height="36px"
                  dense
                  v-model="jobPost.Title"
                  :error="isCheckTitle"
                  @click="isCheckTitle = false"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- ngành nghề -->
            <v-row
              class="d-flex align-center m-0"
              style="margin: 12px !important; height: 36px"
            >
              <v-col cols="3" style="padding: 0 !important; font-weight: bold">
                Ngành nghề
              </v-col>
              <v-col cols="9" style="padding: 0 !important">
                <v-autocomplete
                  v-model="careerSelected"
                  :items="careers"
                  item-text="name"
                  dense
                  return-object
                  hide-details="true"
                  color="#4caf50"
                  class="my-font pl-4"
                  style="font-size: 14px"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <!-- địa điểm -->
            <v-row
              class="d-flex align-center m-0"
              style="margin: 12px !important; height: 36px"
            >
              <v-col cols="3" style="padding: 0 !important; font-weight: bold">
                Địa điểm
              </v-col>
              <v-col cols="9" style="padding: 0 !important">
                <v-autocomplete
                  v-model="locationSelected"
                  :items="locations"
                  item-text="name"
                  dense
                  return-object
                  hide-details="true"
                  color="#4caf50"
                  class="my-font pl-4"
                  style="font-size: 14px"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <!-- hạn nộp hồ sơ -->
            <v-row
              class="d-flex align-center m-0"
              style="margin: 12px !important; height: 36px"
            >
              <v-col cols="3" style="padding: 0 !important; font-weight: bold">
                Hạn nộp hồ sơ
              </v-col>
              <v-col cols="9" style="padding: 0 !important;he">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="computedDateFormatted"
                      persistent-hint
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      class="pl-4"
                      style="font-size: 14px"
                      color="#4caf50"
                      hide-details="true"
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <!-- số lượng tuyển -->
            <v-row
              class="d-flex align-center m-0"
              style="margin: 12px !important; height: 36px"
            >
              <v-col cols="3" style="padding: 0 !important; font-weight: bold">
                Số lượng tuyển
              </v-col>
              <v-col cols="9" style="padding: 0 !important">
                <v-text-field
                  color="#4caf50"
                  class="my-font pl-4"
                  style="font-size: 14px"
                  hide-details="true"
                  height="36px"
                  type="number"
                  dense
                  v-model="jobPost.Quantity"
                  :error="isCheckQuantity"
                  @click="isCheckQuantity = false"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6" class="recruit-right">
            <!-- Mức lương -->
            <v-row
              class="d-flex align-center m-0"
              style="margin: 12px !important; height: 36px"
            >
              <v-col cols="3" style="padding: 0 !important; font-weight: bold">
                Mức lương
              </v-col>
              <v-col cols="9" style="padding: 0 !important">
                <v-text-field
                  color="#4caf50"
                  class="my-font pl-4"
                  style="font-size: 14px"
                  hide-details="true"
                  height="36px"
                  dense
                  v-model="jobPost.Salary"
                  :error="isCheckSalary"
                  @click="isCheckSalary = false"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- hình thức làm việc -->
            <v-row
              class="d-flex align-center m-0"
              style="margin: 12px !important; height: 36px"
            >
              <v-col cols="3" style="padding: 0 !important; font-weight: bold">
                Hình thức làm việc
              </v-col>
              <v-col cols="9" style="padding: 0 !important">
                <v-autocomplete
                  v-model="typeJobSelected"
                  :items="typeJobs"
                  item-text="name"
                  dense
                  return-object
                  hide-details="true"
                  color="#4caf50"
                  class="my-font pl-4"
                  style="font-size: 14px"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <!-- giới tính -->
            <v-row
              class="d-flex align-center m-0"
              style="margin: 12px !important; height: 36px"
            >
              <v-col cols="3" style="padding: 0 !important; font-weight: bold">
                Yêu cầu giới tính
              </v-col>
              <v-col cols="9" style="padding: 0 !important">
                <v-autocomplete
                  v-model="sexSelected"
                  :items="sexs"
                  item-text="name"
                  dense
                  return-object
                  hide-details="true"
                  color="#4caf50"
                  class="my-font pl-4"
                  style="font-size: 14px"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <!-- kinh nghiệm -->
            <v-row
              class="d-flex align-center m-0"
              style="margin: 12px !important; height: 36px"
            >
              <v-col cols="3" style="padding: 0 !important; font-weight: bold">
                Kinh nghiệm
              </v-col>
              <v-col cols="9" style="padding: 0 !important">
                <v-text-field
                  color="#4caf50"
                  class="my-font pl-4"
                  style="font-size: 14px"
                  hide-details="true"
                  height="36px"
                  dense
                  v-model="jobPost.Experience"
                  :error="isCheckExperience"
                  @click="isCheckExperience = false"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- địa điểm làm việc -->
            <v-row
              class="d-flex align-center m-0"
              style="margin: 12px !important; height: 36px"
            >
              <v-col cols="3" style="padding: 0 !important; font-weight: bold">
                Địa điểm làm việc
              </v-col>
              <v-col cols="9" style="padding: 0 !important">
                <v-text-field
                  color="#4caf50"
                  class="my-font pl-4"
                  style="font-size: 14px"
                  hide-details="true"
                  height="36px"
                  dense
                  v-model="jobPost.JobAddress"
                  :error="isCheckAddress"
                  @click="isCheckAddress = false"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- mô tả công việc -->
        <v-row style="background-color: #f0f0f0">
          <v-col class="pl-0">
            <div style="font-size: 18px; font-weight: bold">
              Mô tả công việc
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <editor
              v-model="jobDescriber"
              :resizable-content="true"
              :resizable-toolbar="true"
              rows="10"
              cols="30"
            >
            </editor>
          </v-col>
        </v-row>
        <!-- yêu cầu  -->
        <v-row style="background-color: #f0f0f0">
          <v-col class="pl-0">
            <div style="font-size: 18px; font-weight: bold">
              Yêu cầu ứng viên
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <editor
              v-model="requestRecruit"
              :resizable-content="true"
              :resizable-toolbar="true"
              rows="10"
              cols="30"
            >
            </editor>
          </v-col>
        </v-row>
        <!-- Quyền lợi  -->
        <v-row style="background-color: #f0f0f0">
          <v-col class="pl-0">
            <div style="font-size: 18px; font-weight: bold">Quyền lợi</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <editor
              v-model="jobBenefit"
              :resizable-content="true"
              :resizable-toolbar="true"
              rows="10"
              cols="30"
            >
            </editor>
          </v-col>
        </v-row>
        <!-- Cách thức ứng tuyển  -->
        <v-row style="background-color: #f0f0f0">
          <v-col class="pl-0">
            <div style="font-size: 18px; font-weight: bold">
              Cách thức ứng tuyển
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <editor
              v-model="wayApply"
              :resizable-content="true"
              :resizable-toolbar="true"
              rows="10"
              cols="30"
            >
            </editor>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Editor } from "@progress/kendo-editor-vue-wrapper";
import axios from "axios";
export default {
  name: "recruit",
  components: {
    Editor,
  },
  data: () => ({
    jobPost: {
      UserId: null,
      CompanyId: null,
      Status: null,
      Title: null,
      ExpireDate: null,
      Salary: null,
      Quantity: null,
      TypeJob: null,
      RequestSex: null,
      Experience: null,
      JobAddress: null,
      JobDescribe: null,
      Request: null,
      Benefit: null,
      MethodApply: null,
      Career: null,
      Location: null,
    },
    jobDescriber: "",
    requestRecruit: "",
    jobBenefit: "",
    wayApply: "",
    isLoadingPost: false,
    isShowAlert: false,
    isShowAlertError: false,
    careerSelected: {
      name: "Tất cả ngành nghề",
      value: 0,
    },
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
    locationSelected: {
      name: "Tất cả địa điểm",
      value: 0,
    },
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
    typeJobSelected: {
      name: "Toàn thời gian",
      value: 0,
    },
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
    sexSelected: {
      name: "Không yêu cầu",
      value: 0,
    },
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

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    // dateFormatted: formatDate(
    //   new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    //     .toISOString()
    //     .substr(0, 10)
    // ),
    menu1: false,
    menu2: false,
    isCheckTitle: false,
    isCheckQuantity: false,
    isCheckSalary: false,
    isCheckExperience: false,
    isCheckAddress: false,
    typeAlert: "success",
    isShowAddler: false,
    messageAlert: "",
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
    // date() {
    //   this.dateFormatted = this.formatDate(this.date);
    // },
  },
  methods: {
    validateForm() {
      var checkAll = true;
      if (this.jobPost.Title == null || !this.jobPost.Title.trim()) {
        this.isCheckTitle = true;
        checkAll = false;
      }
      if (this.jobPost.Quantity == null || !this.jobPost.Quantity.trim()) {
        this.isCheckQuantity = true;
        checkAll = false;
      }
      if (this.jobPost.Salary == null || !this.jobPost.Salary.trim()) {
        this.isCheckSalary = true;
        checkAll = false;
      }
      if (this.jobPost.Experience == null || !this.jobPost.Experience.trim()) {
        this.isCheckExperience = true;
        checkAll = false;
      }
      if (this.jobPost.JobAddress == null || !this.jobPost.JobAddress.trim()) {
        this.isCheckAddress = true;
        checkAll = false;
      }
      if (this.jobDescriber == null || !this.jobDescriber.trim()) {
        checkAll = false;
      }
      if (this.jobBenefit == null || !this.jobBenefit.trim()) {
        checkAll = false;
      }
      if (this.requestRecruit == null || !this.requestRecruit.trim()) {
        checkAll = false;
      }
      if (this.wayApply == null || !this.wayApply.trim()) {
        checkAll = false;
      }
      var user = JSON.parse(sessionStorage.getItem("user"));
      if (
        user.company.companyName == null ||
        !user.company.companyName.trim()
      ) {
        checkAll = false;
      }

      return checkAll;
    },
    // show thông báo
    showAlert(typeAlert, messageAlert) {
      this.typeAlert = typeAlert;
      this.messageAlert = messageAlert;
      this.isShowAddler = true;
      setTimeout(() => {
        this.isShowAddler = false;
      }, 5000);
      // setTimeout(this.isShowAddler = false, 3000);
    },
    // đăng bài
    pushPost() {
      this.isLoadingPost = true;
      var checkPost = this.validateForm();
      if (checkPost) {
        this.jobPost.ExpireDate = this.date;
        this.jobPost.Career = this.careerSelected.value;
        this.jobPost.Location = this.locationSelected.value;
        this.jobPost.TypeJob = this.typeJobSelected.value;
        this.jobPost.RequestSex = this.sexSelected.value;
        this.jobPost.Status = 1;
        this.jobPost.JobDescribe = this.jobDescriber;
        this.jobPost.Benefit = this.jobBenefit;
        this.jobPost.Request = this.requestRecruit;
        this.jobPost.MethodApply = this.wayApply;
        this.jobPost.Quantity = parseInt(this.jobPost.Quantity);

        var user = JSON.parse(sessionStorage.getItem("user"));
        this.jobPost.UserId = user.id;
        this.jobPost.CompanyId = user.company.companyId;

        axios
          .post("Post/createpost", this.jobPost)
          .then(() => {
            this.isLoadingPost = false;
            let setAll = (obj, val) =>
              Object.keys(obj).forEach((k) => (obj[k] = val));
            let setNull = (obj) => setAll(obj, null);
            setNull(this.jobPost);
            this.jobDescriber = "";
            this.jobBenefit = "";
            this.requestRecruit = "";
            this.wayApply = "";
            this.careerSelected = this.careers[0];
            this.locationSelected = this.locations[0];
            this.typeJobSelected = this.typeJobs[0];
            this.sexSelected = this.sexs[0];
            this.date = new Date(
              Date.now() - new Date().getTimezoneOffset() * 60000
            )
              .toISOString()
              .substr(0, 10);
            this.showAlert("info", "Hoàn thành bài đăng và chờ duyệt");
          })
          .catch(() => {});
      } else {
        this.isLoadingPost = false;
        var userstorage = JSON.parse(sessionStorage.getItem("user"));
        if (
          userstorage.company.companyName == null ||
          !userstorage.company.companyName.trim()
        ) {
          this.showAlert(
          "error",
          "Bổ sung thông tin công ty trước khi đăng tuyển"
        );
        }else{
          this.showAlert(
          "error",
          "Bài đăng thiếu một số thông tin , vui lòng kiểm tra lại"
        );
        }
        
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>

<style scoped>
.content {
  background-color: #fff;
  border-radius: 4px;
}
.recruit-left {
  border-right: 10px solid #f0f0f0;
}
.recruit-right {
  border-left: 10px solid #f0f0f0;
}
.v-text-field {
  margin: 0;
}
.my-font {
  font-family: Arial, Helvetica, sans-serif;
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
