<template>
    <div class="home">
        <div>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark indroduce">账户概况</div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg account" justify="left">
                <el-col :span="3">
                    <div class="grid-content bg-purple dsp-center">今日消费 /元</div>
                    <div class="grid-content bg-purple dsp-center">1</div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content bg-purple dsp-center">账户余额 /元</div>
                    <div class="grid-content bg-purple dsp-center">1</div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content bg-purple dsp-center">可用余额 /元</div>
                    <div class="grid-content bg-purple dsp-center">1</div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content bg-purple dsp-center">冻结金额 /元</div>
                    <div class="grid-content bg-purple dsp-center">1</div>
                </el-col>
                <el-col :span="9">
                </el-col>
                <el-col :span="3">
                    <div class="grid-content bg-purple dsp-center">未通过广告</div>
                    <div class="grid-content bg-purple dsp-center">1</div>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-row>
                <el-col :span="3">
                    <div class="grid-content bg-purple-dark indroduce">数据概况</div>
                </el-col>
                <el-col :span="21">
                    <div class="grid-content bg-purple-dark dsp-select">
                        <el-select v-model="time" filterable placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() { 
        return { 
            options: [
                {
                    value: '1',
                    label: '过去7天'
                },
                {
                    value: '2',
                    label: '过去30天'
                },
                {
                    value: '3',
                    label: '昨天'
                },
                {
                    value: '4',
                    label: '今天'
                }
            ],
            time: ''
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/style/color.scss';
    
    .home {
        .el-row {
            &:last-child {
              margin-bottom: 0;
            }
        }

        .el-col {
            border-radius: 4px;
        }

        .grid-content {
            border-radius: 4px;
            min-height: 36px;
        }

        .row-bg {
            padding: 10px 0;
            background-color: $background-color;
        }

        .indroduce {
            height: 65px;
            line-height: 65px;
            font-size: 20px;
        }
        .dsp-select {
            height: 65px;
            line-height: 65px;
        }

        .account {
            height: 80px;
        }

        .dsp-center {
            text-align: center;
            &:last-child {
                color: #00F;
            }
        }
    }
</style>