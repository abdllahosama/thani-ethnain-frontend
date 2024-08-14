<template>
    <li class="nav-item">
        <router-link :to="'/' + to" class="nav-link ">
            <i :class="icon"></i> {{headname}} 
        </router-link>
    </li>
</template>
<script>
    export default {
      props: ['icon', 'headname', 'to']  
    };
</script>
