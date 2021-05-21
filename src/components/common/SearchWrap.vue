<template>
    <div class="SearchWrap
">
        <el-form ref="form" :model="searchParams" label-width="90px">
            <el-form-item v-for="(item,index) in defineSearch" :key="index" :label="item.label" :label-width="item.width?item.width:'120px'">
                <el-input v-model="searchParams[item.model]" v-bind="Object.assign({placeholder:'请输入',clearable:true},item.attrs||{})" v-on="item.methods||{}" v-if="item.type=='input'" />
                <el-select v-model="searchParams[item.model]" v-bind="Object.assign({placeholder:'请选择',clearable:true,filterable:true},item.selectAttrs||{})" v-on="item.selectMethods||{}" v-else-if="item.type=='select'">
                    <el-option v-for="(item1,index1) in item.options" :key="index1" :label="item1[item.optionAttrs?item.optionAttrs.label:'label']" :value="item1[item.optionAttrs?item.optionAttrs.value:'value']">
                    </el-option>
                </el-select>
                <el-cascader v-model="searchParams[item.model]" :options="item.options" v-bind="Object.assign({请选择:'请输入',clearable:true,filterable:true},item.attrs||{})" v-on="item.methods||{}" v-else-if="item.type=='cascader'" />
                <el-time-picker v-model="searchParams[item.model]" :picker-options="item.pickerOptions" v-bind="Object.assign({placeholder:'选择时间',clearable:true},item.attrs||{})" v-on="item.methods||{}" v-else-if="item.type=='timePicker'" />
                <el-date-picker v-model="searchParams[item.model]" :picker-options="item.pickerOptions" v-bind="Object.assign({placeholder:'选择日期',clearable:true},item.attrs||{})" v-on="item.methods||{}" v-else-if="item.type=='datePicker'" />
            </el-form-item>
            <div :class="{handleList:true,[handlerConfig.direction]:true}" v-if="handlerConfig.handleList&&defineSearch.length<3&&['auto','oneLine',undefined].includes(handlerConfig.direction)">
                <el-button v-bind="item.attrs||{}" v-on="item.methods||{}" v-for="(item,index) in handlerConfig.handleList" :key="index">{{item.text}}</el-button>
            </div>
        </el-form>
        <div :class="{handleList:true,[handlerConfig.direction]:true}" v-if="handlerConfig.handleList&&defineSearch.length>=3&&handlerConfig.direction!='oneLine'">
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
                /*
                    defineSearch: [ //搜索定义
                        { //定义为输入框
                            type: 'input',
                            model: 'input',
                            label: '输入框：',
                            attrs: {
                                placeholder: '请输入内容',
                            },
                            methods: {
                                input: (val) => {
                                    console.log('输入内容', val);
                                },
                            },
                        },
                        { //定义为选择器
                            type: 'select',
                            model: 'select',
                            label: '选择器：',
                            options: [{
                                    label: '选项1',
                                    value: '1',
                                },
                                {
                                    label: '选项2',
                                    value: '2',
                                },
                            ],
                            selectAttrs: {
                                placeholder: '请选择内容',
                            },
                            selectMethods: {
                                change: (val) => {
                                    console.log('内容改变', val);
                                },
                            },
                            optionAttrs: {
                                label: 'label',
                                value: 'value',
                            },
                        },
                        { //定义为级联选择器
                            type: 'cascader',
                            model: 'cascader',
                            label: '级联选择器：',
                            options: [{
                                value: 'zhinan',
                                label: '指南',
                                children: [{
                                    value: 'shejiyuanze',
                                    label: '设计原则',
                                    children: [{
                                        value: 'yizhi',
                                        label: '一致'
                                    }, {
                                        value: 'fankui',
                                        label: '反馈'
                                    }]
                                }, {
                                    value: 'daohang',
                                    label: '导航',
                                    children: [{
                                        value: 'cexiangdaohang',
                                        label: '侧向导航'
                                    }, {
                                        value: 'dingbudaohang',
                                        label: '顶部导航'
                                    }]
                                }]
                            }],
                            attrs: {
                                placeholder: '请选择内容',
                            },
                            methods: {
                                change: (val) => {
                                    console.log('级联内容', val);
                                },
                            },
                        },
                        { //定义为时间选择器
                            type: 'timePicker',
                            model: 'timePicker',
                            label: '时间选择器：',
                            pickerOptions: {
                                selectableRange: '18:30:00 - 20:30:00'
                            },
                            attrs: {
                                placeholder: '请选择时间',
                                format: 'HH:mm:ss',
                                'value-format': 'HH:mm:ss',
                            },
                            methods: {
                                change: (val) => {
                                    console.log('选择时间', val);
                                },
                            },
                        },
                        { //定义为日期选择器
                            type: 'datePicker',
                            model: 'datePicker',
                            label: '日期选择器：',
                            pickerOptions: {
                                disabledDate(time) {
                                    return time.getTime() > Date.now();
                                },
                                shortcuts: [{
                                    text: '今天',
                                    onClick(picker) {
                                        picker.$emit('pick', new Date());
                                    }
                                }, {
                                    text: '昨天',
                                    onClick(picker) {
                                        const date = new Date();
                                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                                        picker.$emit('pick', date);
                                    }
                                }, {
                                    text: '一周前',
                                    onClick(picker) {
                                        const date = new Date();
                                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                        picker.$emit('pick', date);
                                    }
                                }]
                            },
                            attrs: {
                                placeholder: '请选择日期',
                                format: 'yyyy-MM-dd',
                                'value-format': 'yyyy-MM-dd',
                            },
                            methods: {
                                change: (val) => {
                                    console.log('选择日期', val);
                                },
                            },
                        },
                        { //定义为日期范围选择器
                            type: 'datePicker',
                            model: 'dateRangePicker',
                            label: '范围选择器：',
                            pickerOptions: {
                                shortcuts: [{
                                    text: '最近一周',
                                    onClick(picker) {
                                        const end = new Date();
                                        const start = new Date();
                                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                        picker.$emit('pick', [start, end]);
                                    }
                                }, {
                                    text: '最近一个月',
                                    onClick(picker) {
                                        const end = new Date();
                                        const start = new Date();
                                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                        picker.$emit('pick', [start, end]);
                                    }
                                }, {
                                    text: '最近三个月',
                                    onClick(picker) {
                                        const end = new Date();
                                        const start = new Date();
                                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                        picker.$emit('pick', [start, end]);
                                    }
                                }]
                            },
                            attrs: {
                                type: 'datetimerange',
                                format: 'yyyy-MM-dd',
                                'value-format': 'yyyy-MM-dd',
                                'range-separator': '至',
                                'start-placeholder': '开始日期',
                                'end-placeholder': '结束日期',
                                'align': 'right',
                            },
                            methods: {
                                change: (val) => {
                                    console.log('选择日期', val);
                                },
                            },
                        },
                    ],
                */
            },
        },
        searchParams: { //搜索参数
            type: Object,
            default () {
                return {};
                /*
                    requestParams: { //请求参数
                        pageNum: 1,
                        pageSize: 10,
                        input: '',
                        select: '',
                        cascader: '',
                        timePicker: '',
                        datePicker: '',
                        dateRangePicker: '',
                    },
                */
            },
        },
        handlerConfig: { //操作配置
            type: Object,
            default () {
                return {};
                /*
                    handlerConfig: { //操作配置
                        direction: 'right',
                        handleList: [{
                                text: '搜索',
                                attrs: {
                                    type: 'primary',
                                },
                                methods: {
                                    click: () => {
                                        console.log('搜索');
                                        let { getTableData } = this.$refs.tableWrap;

                                        getTableData();
                                    },
                                },
                            },
                            {
                                text: '重置',
                                attrs: {
                                    plain: true,
                                },
                                methods: {
                                    click: () => {
                                        console.log('重置');
                                        let { resetParams, getTableData } = this.$refs.tableWrap;

                                        resetParams();
                                        getTableData();
                                    },
                                },
                            },
                        ],
                    },
                */
            },
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
                width: 33.3333%;
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
