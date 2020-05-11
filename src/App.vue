<template>
  <div id="app">
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="时间区间">
        <el-date-picker
          v-model="params.daterange"
          @input="daterangechange"
          type="daterange"
          format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="甘特图类型">
        <el-select v-model="params.gantttype" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="格子宽度">
        <el-slider v-model="params.cellwidth" :min="40" :max="200" style="width:200px"></el-slider>
      </el-form-item>
    </el-form>

    <div class="wn-gantt-demo">
      <wnGantt
        ref="wn-gantt-demo"
        :data="data"
        lazy 
        use-real-time
        use-check-column
        use-index-column
        default-expand-all
        usePreColumn
        :date-type="params.gantttype"
        :start-date="params.startdate"
        :end-date="params.enddate"
        :cellwidth="params.cellwidth"
        @timeChange="timeChange"
        @preChange="preChange"
        @expand-change="expandChange"
        @selection-change="selectionChange"
        @taskRemove="taskRemove"
        @taskAdd="taskAdd"
      ></wnGantt>
    </div>
  </div>
</template>

<script>
import wnGantt from "@/pages/wn-gantt";
const ntspan = Date.now() + 30*24*60*60*1000
const daterange = [new Date(),new Date(ntspan)]
const start = daterange[0].toLocaleDateString().replace(/\//g,'-')
const end = daterange[1].toLocaleDateString().replace(/\//g,'-')

export default {
  name: "app",
  data() {
    return {
      params:{
        daterange,
        // startdate:start,
        // enddate:end,
        startdate:'2019-09-06',
        enddate:'2019-11-07',
        gantttype:'monthAndDay',
        cellwidth:80
      },
      options:[
        {label:'月日尺度',value:'monthAndDay'},
        {label:'日时尺度',value:'dayAndHour'},
      ],
      data: [
        {
          id: "1",
          pid: "0",
          name: "旅行",
          startDate: "2019-09-07 08:23:56",
          realStartDate: "2019-09-10 09:34:34",
          endDate: "2019-10-31 09:23:45",
          realEndDate: "2019-10-19 03:34:45",
          children: [
            {
              id: "1-1",
              pid: "1",
              name: "云台之间",
              startDate: "2019-09-10 00:00:00",
              endDate: "2019-09-13 00:00:00",
              children: [
                {
                  id: "1-1-1",
                  pid: "1-1",
                  name: "日落云巅",
                  startDate: "2019-09-10 00:00:00",
                  endDate: "2019-09-13 00:00:00"
                }
              ]
            },
            {
              id: "1-2",
              pid: "1",
              name: "天空之镜",
              startDate: "2019-09-17 00:00:00",
              endDate: "2019-09-22 00:00:00"
            },
            {
              id: "1-3",
              name: "蓬莱之岛",
              pid: "1",
              startDate: "2019-09-25 00:00:00",
              endDate: "2019-09-30 00:00:00"
            },
            {
              id: "1-4",
              pid: "1",
              name: "西塘之南",
              startDate: "2019-10-03 00:00:00",
              endDate: "2019-10-07 00:00:00"
            },
            {
              pid: "1",
              id: "1-5",
              name: "凤凰之缘",
              startDate: "2019-10-11",
              endDate: "2019-10-19"
            }
          ]
        },
        {
          id: "2",
          name: "租房子",
          startDate: "2019-09-20",
          endDate: "2019-10-31"
        }
      ], // 数据
      selected: [] // 选中数据
    };
  },
  methods: {
    daterangechange(range){
      // 显示事件范围变更需要，重新去获取数据
      const [start,end] = range
      this.params.startdate = start.toLocaleDateString().replace(/\//g,'-')
      this.params.enddate = end.toLocaleDateString().replace(/\//g,'-')
      console.log(this.params)
    },
    /**
     * 时间发生更改
     * row: Object 当前行数据c
     */
    timeChange(row) {
      console.log("时间修改:", row);
    },
    //
    /**
     * 前置任务发生更改
     * row: Object 当前行数据
     * oldval: [String, Array] 前置修改前的旧数据
     * handle: Boolean 是否用户编辑产生的改变
     */
    preChange(row, oldval, handle) {
      console.log("前置修改:", row, oldval, handle);
    },
    // 数表展开行
    expandChange(row, expanded) {
      console.log("展开行:", row, expanded);
    },
    // 多选选择
    selectionChange(val) {
      console.log("多选：", val);
    },
    // 删除任务
    taskRemove(item) {
      console.log("删除任务：", item);
    },
    // 添加任务
    taskAdd(item) {
      console.log("添加任务：", item);
      this.$refs["wn-gantt-demo"].loadTreeAdd(item.id, {
        pid: item.id,
        id: "###",
        name: "一轮新月",
        startDate: "2019-10-11",
        endDate: "2019-10-19"
      });
    },
    // 懒加载
    lazyLoad(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: "1-1-1",
            pid: tree.id,
            name: "日落云巅",
            startDate: "2019-09-10",
            endDate: "2019-09-13"
          }
        ]);
      }, 1000);
    }
  },
  components: {
    wnGantt
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px 25px 0;
}
.slide{
  width: 300px;
}
.wn-gantt-demo {
  margin: 40px auto;
  // width: 800px;
}
</style>
