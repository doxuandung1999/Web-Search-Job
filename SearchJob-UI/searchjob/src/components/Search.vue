
<template>
  <v-container style="max-width: 100% !important">
    <v-row class="border-search d-flex justify-center align-center my-font p-10" style="height:70px">
     <v-col cols="10" class="d-flex justify-center align-center my-font">
        <v-text-field
          outlined
          hide-details="true"
          dense
          height="36px"
          class="text-none"
          placeholder="Tên công việc, vị trí bạn muốn ứng tuyển"
          v-model="jobNameSearch"
        ></v-text-field>
    
      
        <v-autocomplete
           v-model="careerSelected"
          :items="careers"
          item-text="name"
          outlined
          dense
          return-object
          hide-details="true"
          color="#4caf50"
          class="my-font pl-2"
          prepend-inner-icon="mdi-clipboard-minus"
        ></v-autocomplete>
      
      
        <v-autocomplete
          v-model="locationSelected"
          :items="locations"
          item-text="name"
          dense
          outlined
          auto-select-first
          return-object
          hide-details="true"
          color="#4caf50"
          class="pl-2"
          prepend-inner-icon="mdi-map-marker"
        ></v-autocomplete>
         <v-btn
          style="background-color: #4caf50 !important"
          class="font-family-app ml-2 text-none"
          color="white--text"
          @click="search"
        >
          <v-icon left> mdi-magnify </v-icon>
          Tìm kiếm</v-btn
        >
      </v-col>
       
     
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "search",

  data: () => ({
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
    jobNameSearch: "",
 
  }),

  methods: {
    search(){
       this.$router.push({ name: "job", query: { jobName: this.jobNameSearch, career : this.careerSelected.value , location : this.locationSelected.value} });
      // this.$router.replace({ name: "job", params: { jobName: this.jobNameSearch, career : this.careerSelected.value} });
    },
  },

  watch: {
    $route(to,from) {
      if (to.query.location == null && from.query.location >= 0){
        this.careerSelected = this.careers[0];
        this.locationSelected = this.locations[0];
        this.jobNameSearch = "";
      }else if(to.query.location >= 0 && from.query.location == null){
        this.careerSelected = this.careers[to.query.career];
        this.locationSelected = this.locations[to.query.location];
        this.jobNameSearch = to.query.jobName;
      }
    },
  }

  

};
</script>

<style scoped>
.border-search {
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}
.hidden-sm-and-down .v-icon {
    color: #4caf50 !important;
}

.v-text-field--outlined >>> fieldset {
  border-color: #eee !important;
}

.v-text-field >>> input {
    font-size: 0.8em;
    font-weight: 100;
    text-transform: capitalize;
}
.v-text-field >>> label {
    font-size: 0.8em;
}
.v-text-field--outlined.v-input--dense.v-text-field--outlined.v-text-field--filled > .v-input__control > .v-input__slot {
  min-height: 36px !important;
}

.v-label{
  font-size: 10px;
}

.my-font{
  font-family: Arial, Helvetica, sans-serif;
}
</style>
