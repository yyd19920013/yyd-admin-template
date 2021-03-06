<template>
    <div class="TableWrap">
        <div class="table">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column v-for="(item,index) in defineTable" :key="index" :label="item.label" :prop="item.prop" :width="item.width">
                    <template v-slot="scope">
                        <template v-if="item.handleList">
                            <div v-for="(item1,index1) in item.handleList" class="handleItem">
                                <el-button type="text" size="small" @click="item1.click&&item1.click({row:scope.row,index:scope.$index})" v-if="item1.type=='button'">{{item1.text}}</el-button>
                                <div v-else-if="item1.type=='switch'" class="switchWrap">
                                    <el-switch v-model="scope.row[item1.model]"></el-switch>
                                    <div class="switchMask" @click="item1.click&&item1.click({row:scope.row,index:scope.$index})"></div>
                                </div>
                            </div>
                        </template>
                        <template v-else-if="item.type">
                            <el-button type="text" size="small" @click="item.click&&item.click({row:scope.row,index:scope.$index})" v-if="item.type=='button'">{{item.text}}</el-button>
                            <div v-else-if="item.type=='switch'" class="switchWrap">
                                <el-switch v-model="scope.row[item.model]"></el-switch>
                                <div class="switchMask" @click="item.click&&item.click({row:scope.row,index:scope.$index})"></div>
                            </div>
                            <div class="preWrap" v-else-if="item.type=='pre'">
                                <pre>{{scope.row[item.prop]}}</pre>
                            </div>
                        </template>
                        <template v-else-if="item.custom">
                            {{item.custom({row:scope.row,index:scope.$index,filters:filters})}}
                        </template>
                        <template v-else>
                            {{scope.row[item.prop]}}
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paginationWrap" v-if="pagingShow">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="pageSizes" :page-size="requestParams[pageSize]" :current-page="requestParams[pageNum]" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import * as filters from '@/filters';
import { copyJson } from 'utils/utils';

export default {
    data() {
        return {
            initParams: {},
            detail: {},
            filters,
        }
    },

    /*
        <TableWrap :defineTable="defineTable" :tableData.sync="tableData" :requestParams.sync="requestParams" :requestConfig="requestConfig" :pagingConfig="pagingConfig" ref="tableWrap" />
    */

    props: {
        defineTable: { //表格定义
            required: true,
            type: Array,
            default () {
                return [];
            },
        },
        tableData: { //表格数据
            type: Array,
            default () {
                return [];
            },
        },
        requestParams: { //请求接口参数
            type: Object,
            default () {
                return null;
            },
        },
        requestConfig: { //请求接口配置
            type: Object,
            default () {
                return null;
            },
        },
        pagingConfig: { //分页配置
            type: Object,
            default () {
                return {};
            },
        },
    },

    computed: {
        pagingShow() { //是否显示分页
            let { pagingShow = true } = this.pagingConfig;

            return pagingShow;
        },
        pageSizes() { //分页大小选择
            let { pageSizes = [10, 20, 50] } = this.pagingConfig;

            return pageSizes;
        },
        pageSize() { //分页大小的key，根据requestParams
            let { pageSize = 'pageSize' } = this.pagingConfig;

            return pageSize;
        },
        pageNum() { //分页页码的key，根据requestParams
            let { pageNum = 'pageNum' } = this.pagingConfig;

            return pageNum;
        },
        total() { //分页总数
            let { total: totalFn } = this.pagingConfig;
            let { pageInfo = {} } = this.detail;
            let { total = 0 } = pageInfo;

            return totalFn ? totalFn(this.detail) : total;
        },
    },

    created() {
        this.setInitParams();
    },

    mounted() {
        this.getTableData();
    },

    methods: {
        setInitParams() { //只调用一次，请勿再次使用
            let { requestParams } = this;

            this.initParams = copyJson(requestParams);
        },
        resetParams() {
            this.$emit('update:requestParams', copyJson(this.initParams));
        },
        getTableData(currenParams) {
            setTimeout(async () => {
                let { request, render = true, custom, success, fail } = this.requestConfig || {};
                let { requestParams } = this;
                if (!request || !requestParams) return;
                let res = await request(requestParams);
                if (!res.data) return fail && fail(res);

                if (render) {
                    let { list = [] } = res.data;
                    let data = custom ? custom(res) : list;

                    this.$emit('update:tableData', data);
                }
                this.detail = res.data;
                success && success(res);
            });
        },
        handleSizeChange(val) {
            console.log('handleSizeChange', val);
            this.$emit('update:requestParams', Object.assign({}, this.requestParams, {
                [this.pageSize]: val,
            }));
            this.getTableData();
        },
        handleCurrentChange(val) {
            console.log('handleCurrentChange', val);
            this.$emit('update:requestParams', Object.assign({}, this.requestParams, {
                [this.pageNum]: val,
            }));
            this.getTableData();
        },
    },
}

</script>
<style lang="scss" scoped>
@import '~styles/public.scss';

.TableWrap {
    .table {
        border: 1px solid #EBEEF5;
        ::v-deep {
            .el-table {
                border: none;
                th, td {
                    padding: 10px 5px;
                }
            }
            .el-table--border::after, .el-table--group::after, .el-table::before {
                display: none !important;
            }
            .el-table__body {
                border-right: none;
                tr {
                    &:last-of-type {
                        td {
                            border-bottom: none;
                        }
                    }
                }
            }
        }
        .handleItem {
            padding: 0 5px;
        }
        .switchWrap {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 30px;
            position: relative;
            .switchMask {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 10;
            }
        }
        .preWrap {
            width: 100%;
            text-align: left;
            overflow: auto;
            pre {
                width: 100%;
            }
        }
    }
    .paginationWrap {
        padding-top: 50px;
        .el-pagination {
            display: flex;
            justify-content: flex-end;
        }
    }
}

</style>
