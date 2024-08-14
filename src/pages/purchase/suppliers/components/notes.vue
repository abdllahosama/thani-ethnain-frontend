<template>
<div class="col-12 col-xl-7">
        <!-- Checklist -->
        <div class="card">
            <div class="card-header">
                <!-- Title -->
                <h4 class="card-header-title">
                    {{$t('suppliers.show.notes')}}
                </h4>
            </div>
            <div class="empty-table" v-if="notes.length == 0">
                <i class="far fa-inbox d-block"></i>
                {{$t('suppliers.show.ThereIsNoNotes')}} !
            </div>
            <div class="card-body notes-container" v-if="notes.length > 0">
                <!-- Checklist -->
                <div class="list-group list-group-flush my-n3">
                    <div v-for="(note, index) in notes" :key="note.id" class="list-group-item">
                        <div class="row">
                            <div class="col-auto">
                                <!-- Avatar -->
                                <div class="avatar avatar-sm">
                                    <div class="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary">
                                        <i class="far fa-clipboard"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col ml-n2">
                                <!-- Heading -->
                                <p class="small mb-0">
                                    {{note.text}}
                                </p>
                                <!-- Time -->
                                <small class="text-muted">
                                    {{note.time}}
                                </small>
                                <div class="delete-note" @click="deleteNote(index)" :class="'btn-btn-success'"><i class="far fa-times"></i></div>
                            </div>
                        </div> <!-- / .row -->
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="row align-items-center">
                    <div class="col">
                        <!-- Input -->
                        <textarea class="form-control form-control-flush form-control-auto" data-toggle="autosize" rows="1" :placeholder="$parent.$t('suppliers.show.addNote')" v-model="note.text"></textarea>
                    </div>
                    <div class="col-auto">
                        <!-- Button -->
                        <button class="btn  btn-sm " :class="note.text == '' ? 'btn-light' : 'btn-success'" @click="createNote()" >
                            {{$t('suppliers.show.add')}}
                        </button>
                    </div>
                </div> <!-- / .row -->
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    
    export default {
        data() {
            return {
                notes: {},
                customerId: this.$route.params.id,
                note: {
                    user_type: 2,
                    user_id: this.$route.params.id,
                    text: '',
                }
            }
        },
        methods: {
            getNotes() {
                axios
                    .get(this.$linkGnirator('/notes/2/' + this.customerId))
                    .then(response => {
                        this.notes = response.data.notes;
                    });
            },
            createNote() {
                if (this.note.text != '') {
                    axios.post(this.$linkGnirator('/notes'), this.note)
                        .then(response => {
                            this.notes.unshift(response.data.note);
                            this.note.text = '';
                        });

                }
            },
            deleteNote(id) {
                axios.post(this.$linkGnirator('/notes/' + this.notes[id].id), {
                    _method: 'DELETE'
                });
                this.notes.splice(id, 1);
            }
        },
        mounted() {
            this.getNotes();
        }
    };

</script>
<style>
</style>
