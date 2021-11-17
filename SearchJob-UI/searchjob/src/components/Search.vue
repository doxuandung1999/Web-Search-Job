
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
        ></v-text-field>
    
      
        <v-autocomplete
           v-model="jobSelected"
          :items="jobs"
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
          v-model="jobSelected"
          :items="jobs"
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
          @click="test"
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
    jobSelected: {
      name: "Học sinh",
      value: 0,
    },
    jobs: [
      {
        name: "Học sinh",
        value: 0,
      },
      {
        name: "Thầy giáo",
        value: 1,
      },
    ],
    searchTerm: "",
    fruitsCopy: [],
    selectedFruits: [],
  }),

  methods: {
    test(){
      console.log(this.jobSelected.value);
    }
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
