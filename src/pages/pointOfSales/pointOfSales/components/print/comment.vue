<template>
    <div class="print-model">
        <div :id="'commentPrint' + comment.random" ref="commentPrint">
            <p class="comment-print text-center" style="font-size:22px; font-weight: 900;padding:18px;color:black">{{comment.comment}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
          'comment',
        ],
    }

</script>
