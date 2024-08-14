<template>
    <div class="form-group row offset" :class="col != null ? col : 'col-md-6'">
        <label class="col-md-2 col-4">{{title}}</label>
        <div class="col-7 b-0">
            <div class="file-uploader" :class="{ 'is-invalid' : shownError, 'has-image' : shownImage}" :style="{'background-image': shownImage}">
                <input type="file" id="file" ref="file" @change="handleFileUpload()" v-if="!uploadLoader">
                <div class="file-overlay">
                    <i class="fas fa-cloud-upload-alt" v-if="!uploadLoader"></i>
                    <i class="fas fa-spinner fa-spin" v-if="uploadLoader"></i>
                    <p v-if="!uploadLoader">{{$t('popup.ClickToUploadOrDropAFile')}}</p>
                    <p v-if="uploadLoader">{{$t('popup.Uploading')}}</p>
                </div>
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
                file: '',
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
                formData.append('file', this.file);
                this.$parent.uploading = this.$parent.uploading + 1;
                axios.post(this.$linkGnirator('/files/' + this.path),
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
                this.file = this.$refs.file.files[0];
                if (this.file.type.split('/')[0] == 'image') {
                    this.shownError = false;
                    this.submitFile();
                } else {
                    this.shownError = true;
                }
            }
        },
        mounted() {
            if (this.image != undefined) {
                this.shownImage = this.$linkGnirator('/companiesUploads/' + this.subdomain + '/' + this.path + '/' + this.image, true);
            }
        },
        watch: {
            image: function(val) {
                if (this.image != undefined) {
                    this.shownImage = 'url("' + this.$linkGnirator('/companiesUploads/' + this.subdomain + '/' + this.path + '/' + val, true) + '")';
                }
            },
            hasErorr: function(val) {
                this.shownError = val;
            }
        },
        props: ['title', 'path', 'image', 'col', 'error', 'hasErorr']
    };

</script>
