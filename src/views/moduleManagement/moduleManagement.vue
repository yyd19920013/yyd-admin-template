<template>
    <div class="wrapName">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            query: this.$route.query,
        }
    },

    mounted() {

    },

    methods: {

    },

    components: {

    },
}

</script>
<style lang="scss" scoped>
@import '~styles/public.scss';

.wrapName {}

</style>
