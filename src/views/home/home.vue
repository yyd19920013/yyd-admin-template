<template>
    <div class="home">
        <div class="time">
            时间格式化：{{'2020/5/28'|date}}
        </div>
        <el-button type="primary" @click="confirm">弹出确定按钮</el-button>
        <el-button type="primary" @click="getList">请求接口数据</el-button>
    </div>
</template>
<script>
export default {
    components: {

    },

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {
        async confirm() {
            let res = await this.isConfirm('是否确定？');
            if (!res) return;

            console.log('确定');
        },
        async getList() {
            let res = await this.$services.testAxios({ pageIndex: 1, pageSize: 10 });

            console.log(res);
        },
    },
}

</script>
<style lang="scss" scoped>
@import '~styles/public.scss';

.home {}

</style>
