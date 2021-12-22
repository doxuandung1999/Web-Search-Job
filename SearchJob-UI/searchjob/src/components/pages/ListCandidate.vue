<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    hide-default-footer

    class="elevation-1"
  >
    <template v-slot:item.filecv="{ item }">
      <a
      v-bind:href="item.filecv" target="_blank"
      >
        {{ item.filecv }}
      </a>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    desserts: [
      {
        name: "Frozen Yogurt",
        birth: "20/02/2021",
        position: "Dev",
        filecv: 'https://vuetifyjs.com/en/components/data-tables/#item',
      }
    ],
    headers: [
      {
        text: "Họ và tên",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Ngày sinh", value: "birth" },
      { text: "Vị trí ứng tuyển", value: "position" },
      { text: "File CV", value: "filecv" },
    ],
  }),
};
</script>

<style>
</style>