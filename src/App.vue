<template>
    <div id="app">
        <router-view />
        <Loading :showLoading="isLoading" :showRefreshBt="showRefreshBt" :status="status" />
    </div>
</template>
<script>
import Loading from './components/common/Loading';
import { mapState } from 'vuex';

export default {
    name: 'App',
    computed: {
        ...mapState({
            isLoading(state) {
                return state.isLoading;
            },
            showRefreshBt(state) {
                return state.showRefreshBt;
            },
            status(state) {
                return state.status;
            },
        })
    },
    components: {
        Loading,
    },
}

</script>
