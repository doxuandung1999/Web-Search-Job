<template>
  <v-container>
    <v-row class="d-flex align-center">
      <div class="box-white box-detail-job">
        <div class="logo"></div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "JobPageDetail",
};
</script>

<style lang="scss" scoped>
.box-white {
  background: white;
  border-radius: 3px;
  display: flex;
  align-items: center;
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
  }
}
</style>