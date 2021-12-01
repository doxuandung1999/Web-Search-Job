<template>
  <div class="w-full">
    <v-card class="hov-pointer pos-relative">
      <div class="flex-m wrap">
        <div class="image">
          <img v-bind:src="data.Image" alt="" />
        </div>
        <div style="width: calc(100% - 100px)">
          <v-card-title style="padding-top: 0; display: flex" class="flex-m">
            <div :title="data.Title" class="title w-full">
              {{ data.Title }}
            </div>
            <div
              class="pos-absolute"
              style="top: 8px; right: 12px"
              @click="toggleFavourite"
            >
              <v-icon class="icon" small color="">{{
                data.IsFavourite ? "mdi-heart" : "mdi-heart-outline"
              }}</v-icon>
            </div>
          </v-card-title>
          <v-card-subtitle :title="data.Owner" class="sub-title">
            {{ data.Owner }}</v-card-subtitle
          >
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import JobItemModel from "@/models/job-item.js";
export default {
  name: "JobItem",
  props: {
    data: {
      type: JobItemModel,
      default: null,
    },
  },
  computed: {},
  watch: {},
  methods: {
    toggleFavourite() {
      this.data.IsFavourite = !this.data.IsFavourite;
    },
  },
  mounted() {
    console.log(this.data);
  },
};
</script>

<style lang="scss" scoped>
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
  width: 44px;
  height: 44px;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 7px;
  border: 0.25px solid #f7f7f7;
}
img {
  max-width: 100%;
  width: 44px;
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
</style>