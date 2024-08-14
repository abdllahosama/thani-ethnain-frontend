<template>
  <div>
    <mc-wysiwyg v-model="editorContent"></mc-wysiwyg>
  </div>
</template>

<script>
import VueWysiwyg from "@mycure/wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";

export default {
  components: {
    McWysiwyg,
  },
  data() {
    return {
      editorContent: "",
    };
  },
};
</script>
