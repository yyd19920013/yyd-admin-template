export default {
    ASYNC_UPDARA_USERINFO({ commit, state }) {
        setTimeout(() => {
            commit({
                type: 'UPDARA_USERINFO',
                userInfo: { name: '异步改名字' },
            });
        }, 3000);
    },
}
