<template>
    <div class="show-iner-contacts">
        <div class="card">
            <div class="card-header">

                <!-- Title -->
                <h4 class="card-header-title">
                    {{$t('customers.show.contacts')}}
                </h4>

                <!-- Button -->
                <button class="btn btn-sm btn-info" @click="showCreate" v-if="$user.admin || $user.role.customers_edit">
                    <i class="fas fa-plus"></i>
                    {{$t('customers.show.addition')}}
                </button>

            </div>
            <div class="table-responsive mb-0  contacts-table">
                <table class="table table-sm table-nowrap table-hover card-table">
                    <thead>
                        <tr>
                            <th>
                                <span class="text-muted list-sort">
                                    {{$t('customers.show.name')}}
                                </span>
                            </th>
                            <th>
                                <span class="text-muted list-sort">
                                    {{$t('customers.show.occupation')}}
                                </span>
                            </th>
                            <th>
                                <span class="text-muted">
                                    {{$t('customers.show.measures')}}
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="list">
                        <tr >
                            <td colspan="3" class="empty-table" v-if="contacts.length == 0">
                                <i class="far fa-inbox d-block"></i>
                                {{$t('customers.show.thereAreNoContacts')}} !
                            </td>
                        </tr>
                        <tr v-for="(contact, index) in contacts" :key="contact.id">
                            <td class="content-title">
                                {{contact.name}}
                            </td>
                            <td class="content-pageviews">
                                {{contact.job}}
                            </td>
                            <td class="text-right  edit-td">

                                <!-- Dropdown -->
                                <a class="btn btn-light" @click="showContact(index)">
                                    <i class="fas fa-search"></i>
                                </a>
                                <a class="btn btn-light" @click="showEdit(index)"  v-if="$user.admin || $user.role.customers_edit">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a class="btn btn-light" @click="deleteContact(index)"  v-if="$user.admin || $user.role.customers_edit">
                                    <i class="fas fa-trash"></i>
                                </a>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <create v-if="create != null"></create>
        <show v-if="show != null"></show>
        <edit v-if="edit != null"></edit>
    </div>
</template>
<script>
    import axios from 'axios';

    import create from "./create.vue";
    import show   from "./show.vue";
    import edit   from "./edit.vue";
    export default {
        data() {
            return {
                contacts: {},
                create: null,
                show: null,
                edit: null,
                customerId: this.$route.params.id
            }
        },
        methods: {
            getContacts() {
                axios
                    .get(this.$linkGnirator('/contacts/1/' + this.customerId))
                    .then(response => {
                        this.contacts = response.data.contacts;
                    });
            },
            deleteContact(id) {
                axios.post(this.$linkGnirator('/contacts/' + this.contacts[id].id), {
                    _method: 'DELETE'
                });
                this.contacts.splice(id, 1);
            },
            showCreate () {
                this.$parent.$parent.model  = 1;
                this.create = 1;
            },
            showContact (id) {
                this.$parent.$parent.model  = 1;
                this.show = id;
            },
            showEdit (id) {
                this.$parent.$parent.model  = 1;
                this.edit = id;
            }
        },
        mounted() {
            this.getContacts();
        },
        components: {
            create,
            show,
            edit
        }
    };

</script>
