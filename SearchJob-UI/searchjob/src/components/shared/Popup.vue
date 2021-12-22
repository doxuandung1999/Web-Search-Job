<template>
  <v-dialog v-model="dialog" persistent width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        large
        class="ma-2 m-t-32"
        style="height: 36px !important"
        color="success"
        v-on="on"
        v-bind="attrs"
      >
        <v-icon left dark class="m-r-16"> mdi-heart-outline </v-icon>
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
            style="font-size: 18px"
            hide-details="true"
            label="Họ và tên"
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
                readonly
                v-bind="attrs"
                v-on="on"
                class="pl-2 pt-6"
                style="font-size: 14px"
                color="#4caf50"
                hide-details="true"
                label="Năm sinh"
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
            style="font-size: 18px"
            hide-details="true"
            label="vị trí ứng tuyển"
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
            class="mt-8"
            @click="upCV"
          >
            Đính kèm file CV
          </v-btn>
          <div v-show="fileName" style="font-size: 14px; margin-top: 7px">{{fileName}}</div>
          <div v-show="!fileName" style="color:red;font-size: 14px; margin-top: 7px"><i>chưa đính kèm CV</i></div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="my-font"
          style="font-weight: bold"
          color="success"
          text
          @click="SendCV"
        >
          Gửi
        </v-btn>
        <v-btn
          class="my-font"
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
      fileCV: null,
      fileName: "",
      isHaveCV: false
    };
  },
  props: {},
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {},
  created() {},
  methods: {
    SendCV() {},
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
</style>