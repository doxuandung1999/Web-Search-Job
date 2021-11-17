<template>
  <v-container style="max-width: 100% !important">
    <v-row
      class="d-flex justify-center align-center pb-10"
      style="background-color: #f0f0f0; padding: 20px 0 0"
    >
      <v-col cols="10" class="pt-0 content">
        <v-file-input
          accept="image/*"
          label="File input"
          v-model="filestest"
        ></v-file-input>
        <v-btn color="primary" @click="submitFiles">test</v-btn>
        <editor
          v-model="hihi"
          :resizable-content="true"
          :resizable-toolbar="true"
          style="height: 280px"
          rows="10"
          cols="30"
        >
        </editor>
        <v-btn> click </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Editor } from "@progress/kendo-editor-vue-wrapper";

export default {
  name: "company",
  components: {
    Editor,
  },

  data: () => ({
    hihi: "Anh <strong>l&agrave; Dũng</strong>",
    filestest: null,
    htmlText: `<p>
                The Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.<br />
                In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists,
                and image handling. The widget <strong>outputs identical HTML</strong> across all major browsers, follows
                accessibility standards, and provides API for content manipulation.
            </p>
            <p>Features include:</p>
            <ul>
                    <li>Text formatting & alignment</li>
                    <li>Bulleted and numbered lists</li>
                    <li>Hyperlink and image dialogs</li>
                    <li>Cross-browser support</li>
                    <li>Identical HTML output across browsers</li>
                    <li>Gracefully degrades to a <code>textarea</code> when JavaScript is turned off</li>
            </ul>`,
  }),

  methods: {
    submitFiles() {
      const reader = new FileReader();
      let rawImg;
      reader.readAsDataURL(this.filestest);
      reader.onloadend = () => {
        rawImg = reader.result;
        // var test = rawImg.split(",");
        console.log(rawImg);
      };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   


    },
  },
};
</script>

<style scoped>
.content {
  background-color: #fff;
  border-radius: 4px;
}
</style>
