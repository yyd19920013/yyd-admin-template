<template>
    <div class="wrapName">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    components: {

    },

    data() {
        return {
            query: this.$route.query,
        }
    },

    mounted() {

    },

    methods: {

    },
}

</script>
<style lang="scss" scoped>
@import '~styles/public.scss';

.wrapName {}

</style>
