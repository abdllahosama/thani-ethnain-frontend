<template>
    <div class="container mt-100">
        <br><br><br>
        <br>
        <div class="row align-items-center">
            <div class="col-12 col-md-6 offset-xl-2 offset-md-1 order-md-2 mb-5 mb-md-0">

                <!-- Image -->
                <div class="text-center">
                    <img src="accounting/img/illustrations/lost.svg" alt="..." class="img-fluid">
                </div>

            </div>
            <div class="col-12 col-md-5 col-xl-4 order-md-1 my-5">

                <div class="text-center">

                    <!-- Preheading -->
                    <h6 class="text-uppercase text-muted mb-4">
                        404 خطاء
                    </h6>

                    <!-- Heading -->
                    <h1 class="display-4 mb-3">
                        الصفحة المطلوبة غير موجودة
                    </h1>

                    <!-- Subheading -->
                    <p class="text-muted mb-4">
                        يبدو انك دخلت هنا عن طريق الخطاء
                    </p>

                    <!-- Button -->
                    <router-link :to="'/'" class="btn btn-lg btn-primary">
                        عودة الي الرئيسية
                    </router-link>

                </div>

            </div>
        </div> <!-- / .row -->
    </div> <!-- / .container -->
</template>

<script>
    export default {};

</script>
