<template>
    <div class="form-group row offset" :class="col != null ? col : 'col-md-6'">
        <label class="col-md-4">{{title}}</label>
        <div class="col-md-7 b-0">
            <div class="sup-file-uploader" >
                <input type="file" id="file" ref="file" @change="handleFileUpload()" v-if="!uploadLoader">
                <input class="form-control" :value="shownImage">
            </div>
            <input type="hidden" @input="$emit('input', $event.target.value)" @change="shownError = false">
            <div class="invalid-feedback">
                {{error}}
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                subdomain: localStorage.getItem('subdomain'),
                files: '',
                uploadLoader: false,
                shownImage: '',
                shownError: ''
            }
        },
        methods: {
            submitFile() {
                this.shownImage = '';
                this.uploadLoader = true;
                let formData = new FormData();
                formData.append('file', this.files);
                this.$parent.uploading = this.$parent.uploading + 1;
                axios.post(this.$linkGnirator('/files/files'),
                    formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(response => {
                    this.shownImage = response.data;
                    this.$emit("input", response.data);
                    this.uploadLoader = false;
                    this.$parent.uploading = this.$parent.uploading - 1;
                });
            },
            handleFileUpload() {
                this.files = this.$refs.file.files[0];
                if (this.files.type.split('/')[0] == 'image' || this.files.type == 'application/pdf') {
                    this.shownError = false;
                    this.submitFile();
                } else {
                    this.shownError = true;
                }
            }
        },
        mounted() {
            if (this.file != undefined) {
                this.shownImage = this.file;
            }
        },
        watch: {
            file: function(val) {
                if (this.file != undefined) {
                    this.shownImage = this.file;
                }
            },
            hasErorr: function(val) {
                this.shownError = val;
            }
        },
        props: ['title', 'path', 'file', 'col', 'error', 'hasErorr']
    };

</script>
