<template>
    <div class="col-md-12 chart-loading">
        <div class="loading-container">
            <div class="loading">
                <div class="loading-1"></div>
                <div class="loading-2"></div>
                <div class="loading-3"></div>
                <div class="loading-4"></div>
            </div>
        </div>
        <p class="text-center">{{$t('main.DataAnalysisIsInProgress')}}<span class="loading-s1">.</span><span class="loading-s2">.</span><span class="loading-s3">.</span></p>
        <h5 class="text-center">{{$t('main.DataAnalysisMayTakeAFewSecondsOrMore')}}</h5>
    </div>
</template>
