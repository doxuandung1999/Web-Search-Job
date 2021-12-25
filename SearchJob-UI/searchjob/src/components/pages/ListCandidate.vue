<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    hide-default-footer
    no-data-text="Chưa có hồ sơ"
    class="elevation-1"
    style="min-height:150px"
  >
    <template v-slot:item.nameFileCV="{ item }">
      <a v-bind:href="item.linkFileCV" target="_blank">
        {{ item.nameFileCV }}
      </a>
    </template>
  </v-data-table>
</template>

<script>

import axios from "axios";
export default {
  data: () => ({
    desserts: [
      {
        name: "Frozen Yogurt",
        birth: "20/02/2021",
        position: "Dev",
        filecv: "https://vuetifyjs.com/en/components/data-tables/#item",
      },
    ],
    headers: [
      {
        text: "Họ và tên",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Ngày sinh", value: "birthDay" },
      { text: "Vị trí ứng tuyển", value: "jobPosition" },
      { text: "File CV", value: "nameFileCV" },
    ],
  }),

  props: {
    PostId: {
      type: Number,
      default: null,
    },
  },

  created(){
    this.initData();
  },

  methods: {
    initData() {
      axios
        .get("Profiles/getprofile?postID=" + this.$route.params.jobID)
        .then((res) => {
          this.desserts = res.data.result;
          this.desserts.forEach((item) => {
            item.birthDay = this.formatDate(item.birthDay);
          })
          
        })
        .catch(() => {
          // this.showAlert("error", "thêm công việc quan tâm thất bại");
          this.$emit("emit-alert", "error", "Thất bại");
          this.isLoading = false;
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

<style>
</style>