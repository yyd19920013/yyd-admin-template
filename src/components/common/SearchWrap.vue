<template>
    <div class="SearchWrap">
        <el-form ref="form" :model="searchParams" label-width="90px">
            <el-form-item v-for="(item,index) in defineSearch" :key="index" :label="item.label" :label-width="item.width?item.width:'120px'" :class="{[`multiColumn${column}`]:true}">
                <el-input v-model="searchParams[item.model]" v-bind="Object.assign({placeholder:'请输入',clearable:true},item.attrs||{})" v-on="item.methods||{}" v-if="item.type=='input'" />
                <el-select v-model="searchParams[item.model]" v-bind="Object.assign({placeholder:'请选择',clearable:true,filterable:true},item.selectAttrs||{})" v-on="item.selectMethods||{}" v-else-if="item.type=='select'">
                    <el-option v-for="(item1,index1) in item.options" :key="index1" :label="item1[item.optionAttrs?item.optionAttrs.label:'label']" :value="item1[item.optionAttrs?item.optionAttrs.value:'value']">
                    </el-option>
                </el-select>
                <el-cascader v-model="searchParams[item.model]" :options="item.options" v-bind="Object.assign({请选择:'请输入',clearable:true,filterable:true},item.attrs||{})" v-on="item.methods||{}" v-else-if="item.type=='cascader'" />
                <el-time-picker v-model="searchParams[item.model]" :picker-options="item.pickerOptions" v-bind="Object.assign({placeholder:'选择时间',clearable:true},item.attrs||{})" v-on="item.methods||{}" v-else-if="item.type=='timePicker'" />
                <el-date-picker v-model="searchParams[item.model]" :picker-options="item.pickerOptions" v-bind="Object.assign({placeholder:'选择日期',clearable:true},item.attrs||{})" v-on="item.methods||{}" v-else-if="['datePicker','dateRangePicker'].includes(item.type)" />
            </el-form-item>
            <div :class="{handleList:true,[handlerConfig.direction]:true}" v-if="handlerConfig.handleList&&defineSearch.length<column&&['auto','oneLine',undefined].includes(handlerConfig.direction)">
                <el-button v-bind="item.attrs||{}" v-on="item.methods||{}" v-for="(item,index) in handlerConfig.handleList" :key="index">{{item.text}}</el-button>
            </div>
        </el-form>
        <div :class="{handleList:true,[handlerConfig.direction]:true}" v-if="handlerConfig.handleList&&defineSearch.length>=column&&handlerConfig.direction!='oneLine'">
            <el-button v-bind="item.attrs||{}" v-on="item.methods||{}" v-for="(item,index) in handlerConfig.handleList" :key="index">{{item.text}}</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },

    /*
        <SearchWrap :defineSearch="defineSearch" :searchParams="requestParams" :handlerConfig="handlerConfig" />
    */

    props: {
        defineSearch: { //搜索定义
            required: true,
            type: Array,
            default () {
                return [];
            },
        },
        searchParams: { //搜索参数
            type: Object,
            default () {
                return {};
            },
        },
        handlerConfig: { //操作配置
            type: Object,
            default () {
                return {};
            },
        },
    },

    computed: {
        column() {
            let { column = 3 } = this.handlerConfig || {};

            return column;
        },
    },

    methods: {

    },
}

</script>
<style lang="scss" scoped>
@import '~styles/public.scss';

.SearchWrap {
    line-height: 40px;
    >span {
        font-size: 16px;
        color: #000;
    }
    ::v-deep {
        .el-form {
            overflow: hidden;
            .el-form-item {
                float: left;
                @for $i from 1 through 10 {
                    &.multiColumn#{$i} {
                        width: percentage(1 / $i);
                    }
                }
                .el-input, .el-select, .el-cascader, .el-date-editor {
                    width: 100%;
                }
            }
        }
    }
    .handleList {
        display: flex;
        justify-content: flex-end;
        padding-bottom: 20px;
        &.left {
            justify-content: flex-start;
        }
        &.center {
            justify-content: center;
        }
        &.right {
            justify-content: flex-end;
        }
    }
}

</style>
