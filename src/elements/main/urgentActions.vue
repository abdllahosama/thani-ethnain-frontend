<template>
    <div>
        <div class="row mh-100">
            <div class="col-md-7">
                <div class="card urgent-actions">
                    <div class="card-header">

                        <!-- Title -->
                        <h4 class="card-header-title">
                            <i class="fas fa-rocket"></i>
                            {{$t('main.quickActions')}}
                        </h4>

                    </div>
                    <div class="card-body">
                        <div >
                            <div class="row" v-if="$user.admin">
                                <router-link :to="action.link" class="col-lg-4 col-6" v-for="(action, index) in $option.main_actions" :key="index">
                                    <a>
                                        <i :class="'fas fa-' + action.icon"></i>
                                        {{action.name}}
                                    </a>
                                </router-link>
                            </div>
                            <div class="row" v-if="!$user.admin">
                                <router-link :to="action.link" class="col-lg-4 col-6" v-for="(action, index) in $user.role.main_actions" :key="index">
                                    <a>
                                        <i :class="'fas fa-' + action.icon"></i>
                                        {{action.name}}
                                    </a>
                                </router-link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <div class="card urgent-actions">
                    <div class="card-header">

                        <!-- Title -->
                        <h4 class="card-header-title">
                            <i class="fas fa-file-signature"></i>
                            {{$t('main.quickReports')}}
                        </h4>

                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled  p-1" v-if="$user.admin">
                            <li v-for="(report ,index) in $option.main_reports" :key="index">
                                <router-link :to="'/' + report.link">
                                    <i class="fas fa-file-chart-pie"></i> {{report.name}}
                                </router-link>
                            </li>
                        </ul>
                        <ul class="list-unstyled  p-1" v-if="$user.role.reports_show">
                            <li v-for="(report ,index) in $user.role.main_reports"  :key="index">
                                <router-link :to="'/' + report.link">
                                    <i class="fas fa-file-chart-pie"></i> {{report.name}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>    
            </div>
        </div>
    </div>
</template>
</template>
<script>
    export default {
        methods: {
        }

    };

</script>
