<template>
  <v-dialog v-model="dialog" persistent width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        large
        style="height: 36px !important"
        color="success"
        v-on="on"
        v-bind="attrs"
      >
        <v-icon left dark class="m-r-16"> mdi-send </v-icon>
        <span style="font-weight: 500; text-transform: none">Ứng tuyển</span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 my-font" style="font-weight: bold">
        Gửi đơn ứng tuyển
      </v-card-title>
      <!-- <v-card-text style="font-size: 14px" class="my-font"
          >Bạn có chắc chắn xóa bài đăng</v-card-text
        > -->
      <v-card-text>
        <v-form class="px-3">
          <v-text-field
            color="#4caf50"
            class="pl-2 my-font"
            style="font-size: 14px"
            hide-details="true"
            label="Họ và tên"
            v-model="userName"
            :error="isCheckName"
            @click="isCheckName = false"
          ></v-text-field>
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
                v-bind="attrs"
                v-on="on"
                class="pl-2 pt-6"
                style="font-size: 14px"
                color="#4caf50"
                hide-details="true"
                label="Ngày sinh"
                dense
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
          <v-text-field
            color="#4caf50"
            class="pl-2 my-font pt6"
            style="font-size: 14px"
            hide-details="true"
            label="vị trí ứng tuyển"
            v-model="jobPosition"
            :error="isCheckPosition"
            @click="isCheckPosition = false"
          ></v-text-field>
          <input
            type="file"
            label="File input"
            style="display: none"
            ref="inputAvatar"
            @change="onPickFile"
          />
          <v-btn
            block
            large
            style="height: 36px !important"
            color="success"
            class="mt-8 text-none"
            @click="upCV"
          >
            Đính kèm file CV
          </v-btn>
          <div v-show="fileName" style="font-size: 14px; margin-top: 7px">
            {{ fileName }}
          </div>
          <div
            v-show="!fileName"
            style="color: red; font-size: 14px; margin-top: 7px"
          >
            <i>chưa đính kèm CV</i>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="my-font text-none"
          style="font-weight: bold"
          color="success"
          text
          @click="SendCV"
          :loading="isLoading"
        >
          Gửi
        </v-btn>
        <v-btn
          class="my-font text-none"
          style="font-weight: bold"
          color="red darken-1"
          text
          @click="dialog = false"
        >
          Hủy bỏ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { fb } from "./firebase";
import axios from "axios";
export default {
  name: "Popup",
  data() {
    return {
      dialog: false,
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
      userName: null,
      fileCV: null,
      fileName: "",
      jobPosition: null,
      linkFileCV: null,
      isHaveCV: false,
      computedDateFormatted: null,
      isCheckPosition: false,
      isCheckName: false,
      isLoading: false,
    };
  },
  props: {
    PostId: {
      type: Number,
      default: null,
    },
    CompanyId: {
      type: Number,
      default: null,
    },
  },
  computed: {
    // computedDateFormatted() {
    //   return this.formatDate(this.date);
    // },
  },
  watch: {
    date(val) {
      this.computedDateFormatted = this.formatDate(val);
    },
  },
  created() {
    this.computedDateFormatted = this.formatDate(this.date);
  },
  methods: {
    SendCV() {
      this.isLoading = true;
      var check = this.validateProfile();
      if (check) {
        this.isCheckPosition = false;
        this.isCheckName = false;
        var storageRef = fb
          .storage()
          .ref("profiles/" + Math.random() + "_" + this.fileCV.name);

        let uploadTask = storageRef.put(this.fileCV);

        uploadTask.on(
          "state_changed",
          () => {},
          () => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...

            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              // console.log(downloadURL);
              // var user = JSON.parse(sessionStorage.getItem("user"));
              var param = {
                CompanyId: this.CompanyId,
                PostId: this.PostId,
                Name: this.userName,
                JobPosition: this.jobPosition,
                NameFileCV: this.fileName,
                LinkFileCV: downloadURL,
                BirthDay: this.parseDate(this.computedDateFormatted),
              };
              axios
                .post("Profiles/createprofile", param)
                .then(() => {
                  this.$emit("emit-alert", "success", "Thành công");
                  this.isLoading = false;
                  this.dialog = false;
                  this.fileCV = null;
                  this.userName = null;
                  this.jobPosition = null;
                  this.fileName = null;
                  this.date = new Date(
                    Date.now() - new Date().getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .substr(0, 10);
                })
                .catch(() => {
                  // this.showAlert("error", "thêm công việc quan tâm thất bại");
                  this.$emit("emit-alert", "error", "Thất bại");
                  this.isLoading = false;
                });
            });
          }
        );
      } else {
        this.isLoading = false;
      }
    },
    validateProfile() {
      var check = true;
      if (this.userName == null || !this.userName.trim()) {
        check = false;
        this.isCheckName = true;
      }
      if (this.jobPosition == null || !this.jobPosition.trim()) {
        check = false;
        this.isCheckPosition = true;
      }
      if (this.fileCV == null) {
        check = false;
      }
      return check;
    },
    upCV() {
      this.$refs.inputAvatar.click();
    },
    onPickFile(e) {
      console.log(e.target.files[0]);
      this.fileCV = e.target.files[0];
      this.fileName = this.fileCV.name;
    },
    saveFileFB(file) {
      var storageRef = fb
        .storage()
        .ref("profiles/" + Math.random() + "_" + file.name);

      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        () => {},
        () => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...

          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
          });
        }
      );
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    parseDate(date) {
      const [day, month, year] = date.split("/");
      return `${year}-${month}-${day}`;
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
  font-family: Arial, Helvetica, sans-serif !important;
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
.v-text-field input {
  font-size: 14px !important;
}
</style>