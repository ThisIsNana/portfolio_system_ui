<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';

export default {
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
      },
      content: '<p>ニュース内容を入力しましょう！</p>',
    };
  },
  created() {
  }
};
</script>

<template>
  <div>
    <ckeditor class="ckeditor" :editor="editor" :config="editorConfig" v-model="content"></ckeditor>
  </div>
</template>

<style lang="scss" scoped>
/* 調整高度及寬度 */
// .ck-editor__editable {
//   width: 500px;
//   height: 300px;
// }
</style>
