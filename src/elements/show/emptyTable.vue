<template>
    <tr>
        <td colspan="7" class="empty-table">
            <i class="fas fa-inbox d-block"></i>
            {{text}}
            <p>{{$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')}}</p>
        </td>
    </tr>
</template>
<script>
    export default {
        props: ['text']
    };
</script>
