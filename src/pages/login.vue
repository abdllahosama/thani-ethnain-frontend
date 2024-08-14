<template>
    <div class="row">
        <div class="col-md-7">
            <div class="login-background">
                <div class="login-overlay">
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="justify-content-center">
                <div class="login-form">
                    <img src="accounting/img/logo.png" class="login-logo">
                    <h1 class="display-4 text-center mb-3">
                        تسجيل الدخول
                    </h1>
                    <p class="text-muted text-center mb-5">
                        سجل الدخول الي نظام المحاسبات.
                    </p>
                    <div class="old-users" v-if="$users.length > 0">
                        <div class="users-container">
                            <div class="old-user-container" v-for="(user, index) in $users" :key="index">
                                <div class="old-user-remove" @click="$removeUser(user.id)"><i class="fas fa-times"></i></div>
                                <div class="old-user-img" @click="softLogin(user.id)">
                                    <div class="dummy"></div>
                                    <div class="image"></div>
                                </div>
                                <div class="old-user-name" @click="softLogin(user.id)">{{user.name}}</div>
                            </div>
                        </div>
                        <hr/>
                    </div>

                    <div class=" alert-container" v-if="error">
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>×</strong>
                            <strong>{{errorMessage}}</strong>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>اسم المستخدم</label>
                        <input type="email" class="form-control" v-model="user.email" placeholder="ادخل اسم المستخدم">
                    </div>
                    <div class="form-group">
                        <label>كلمة السر</label>
                        <input type="password" v-model="user.password" class="form-control" placeholder="ادخل كلمة السر">
                    </div>
                    <div class="form-group">
                        <input type="checkbox" v-model="user.save_me" class="ml-2" id="rememberMe">
                        <label for="rememberMe">تذكر حسابي</label>
                    </div>
                    <button class="btn btn-lg btn-block btn-primary mb-3" @click="login">
                        تسجيل الدخول
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                    save_me: false
                },
                link: 'system',
                error: false,
                errorMessage: ''
            }
        },
        methods: {
            login() {
                axios.post('http://system.salami.live' + '/api/login', {
                    email: this.user.email.toLowerCase(),
                    password: this.user.password
                })
                    .then(response => {
                        if (response.data.status == 'success') {
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('company', response.data.company);
                            localStorage.setItem('subdomain', this.link.toLowerCase());
                            localStorage.setItem('auth', '?token=' + response.data.token + '&company=' + response.data.company);
                            localStorage.setItem('site', 'http://system.salami.live');
                            this.$router.push('/');
                            if (this.user.save_me) {
                                localStorage.setItem('softLogout', 1);
                            } else {
                                localStorage.setItem('softLogout', 0);
                            }
                        } else {
                            this.error = true;
                            this.errorMessage = response.data.error;
                            setTimeout(() => {
                                this.error = false;
                                this.errorMessage = '';
                            }, 4000);
                        }
                    }).catch(response => {
                        this.error = true;
                        this.errorMessage = 'مشكلة في الأتصال بالأنترنت او رابط غير صحيح';
                        setTimeout(() => {
                            this.error = false;
                            this.errorMessage = '';
                        }, 4000);
                        return response;
                    });
            },
            softLogin (id) {
                let user = this.$getOflineUser(id)
                localStorage.setItem('token', user.token);
                localStorage.setItem('company', user.company);
                localStorage.setItem('subdomain', user.subdomain);
                localStorage.setItem('auth', user.auth);
                localStorage.setItem('site', user.site);
                localStorage.setItem('companies', user.companies);
                localStorage.setItem('database', user.database);
                localStorage.setItem('user', user.user);
                this.$router.push('/');
            }
        },
        mounted() {
            var token = localStorage.getItem('token');
            if (token) {
                this.$router.push('/');
            }
        }
    };

</script>
