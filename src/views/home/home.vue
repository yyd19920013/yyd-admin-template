<template>
    <div class="home">
    </div>
</template>
<script>
import { testAxios } from 'services';

export default {
    data() {
        return {
            query: this.$route.query,
        }
    },

    mounted() {
        this.testAxiosFn();
    },

    methods: {
        testAxiosFn() {
            testAxios({ pageIndex: 1, pageSize: 10 }, (res) => {
                console.log(res);
            });
        },
    },

    components: {

    },
}

</script>
<style lang="scss" scoped>
@import '~styles/public.scss';

.home {}

</style>
