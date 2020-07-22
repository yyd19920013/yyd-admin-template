<template>
    <div class="tenantManagement">
        <div class="title">
            <div class="left">
                <el-form ref="form" :model="params" label-width="90px">
                    <el-form-item label="租户名称：">
                        <el-input v-model="params.a"></el-input>
                    </el-form-item>
                    <el-form-item label="租户类型：">
                        <el-select v-model="params.b" placeholder="请选择租户类型">
                            <el-option label="全部" value="all"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" label-width="auto">
                        <el-button type="primary">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="right">
                <el-button type="primary" plain>新增租户</el-button>
            </div>
        </div>
        <div class="main">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column v-for="(item,index) in defineTable" :key="index" :prop="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope">
                        <template v-if="index==3">
                            <el-switch v-model="scope.row.f"></el-switch>
                            <div class="switchMask" @click="switchStatus(scope.row)"></div>
                        </template>
                        <template v-else-if="index==defineTable.length-1">
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                        <template v-else>
                            {{scope.row[item.prop]}}
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="end">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50]" :current-page="params.pageNo" :page-size="params.pageSize" :total="params.total" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            query: this.$route.query,
            params: {
                a: '',
                b: 'all',
                pageNo: 1,
                pageSize: 10,
                total: 100,
            },
            defineTable: [{
                    prop: 'a',
                    label: '租户标识',
                },
                {
                    prop: 'b',
                    label: '租户名称',
                },
                {
                    prop: 'c',
                    label: '租户类型',
                },
                {
                    label: '启用状态',
                },
                {
                    label: '操作',
                },
            ],
            tableData: [{
                    a: 'hcn.a',
                    b: '佛山市南海区互联网医院',
                    c: '单体互联网医院 ',
                    d: '',
                    e: '',
                    f: false,
                },
                {
                    a: 'hcn.a',
                    b: '佛山市南海区互联网医院',
                    c: '单体互联网医院 ',
                    d: '',
                    e: '',
                    f: true,
                },
                {
                    a: 'hcn.a',
                    b: '佛山市南海区互联网医院',
                    c: '单体互联网医院 ',
                    d: '',
                    e: '',
                    f: true,
                },
            ],
        }
    },

    mounted() {

    },

    methods: {
        handleSizeChange(val) {
            this.params.pageSize = val;
            this.getTableList()
        },
        handleCurrentChange(val) {
            this.params.pageNo = val;
            this.getTableList()
        },
        getTableList() {

        },
        isConfirm(isDisabled) {
            return new Promise((resolve, reject) => {
                this.$msgbox({
                    title: '提示',
                    message: `是否${isDisabled?'禁用':'启用'}该租户？`,
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    return resolve(true);
                }).catch(() => {
                    return resolve(false);
                });
            });
        },
        async switchStatus(row) {
            let res = await this.isConfirm(row.f);

            if (res) {
                row.f = !row.f;
            }
        },
    },

    components: {

    },
}

</script>
<style lang="scss" scoped>
@import '~styles/public.scss';

.tenantManagement {
    .title {
        display: flex;
        justify-content: space-between;
        .left {
            .el-form {
                display: flex;
                align-items: center;
                .el-form-item {
                    margin-right: 20px;
                }
            }
        }
    }
    .main {
        ::v-deep .el-table {
            .cell {
                text-align: center;
            }
            .has-gutter {
                th {
                    background-color: #E4E4E4;
                    color: #333;
                    &.gutter {
                        display: table-cell !important;
                    }
                }
            }
            th, td {
                border-right-color: transparent;
            }
            &::before, .el-table--border::after, .el-table--group::after {
                display: none;
            }
            .switchMask {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 10;
            }
        }
    }
    .end {
        display: flex;
        justify-content: flex-end;
        padding-top: 80px;
    }
}

</style>
