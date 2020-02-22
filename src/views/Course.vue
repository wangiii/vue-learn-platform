<template>
  <a-layout id="components-layout-demo-top-side">
    <a-layout-content style="padding: 0 50px">
      <a-layout style="background: #fff;">
        <a-layout-sider width="200" style="background: #fff">
          <a-card hoverable bodyStyle="padding-bottom: 0;">
            <img class="cover" alt="课程封面" :src="course.cover" />
            <h5 style="padding-top:2px;" class="courseName" align="center">
              {{ course.name }}
            </h5>
            <p class="pstyle">学分： {{ course.credit }}</p>
            <p class="pstyle">学时： {{ course.classHour }}</p>
            <p>{{ course.semester }}</p>
          </a-card>
          <a-menu
            mode="inline"
            :defaultSelectedKeys="['1']"
            :defaultOpenKeys="['sub1']"
          >
            <a-menu-item key="1" @click="getCourseResource('VIDEO')">
              <span>教学视频</span>
            </a-menu-item>
            <a-menu-item key="2" @click="getCourseResource('PPT')">
              <span>课件</span>
            </a-menu-item>
            <a-menu-item key="3" @click="getCourseResource('INSTRUCTION')">
              <span>实验指导书</span>
            </a-menu-item>
            <a-menu-item key="4" @click="getCourseResource('CASE')">
              <span>案例库</span>
            </a-menu-item>
            <a-menu-item key="5" @click="getCourseResource('SYLLABUS')">
              <span>课程大纲</span>
            </a-menu-item>
            <a-menu-item key="6" @click="getCourseResource('HOMEWORK')">
              <span>作业</span>
            </a-menu-item>
            <a-menu-item key="7">
              <span>我要申请学分</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content style="padding-right:6px" v-if="type != 'VIDEO'">
          <a-table
            :columns="columns"
            :rowKey="id"
            :dataSource="courseResource"
            :pagination="pagination"
          >
            <template slot="url" slot-scope="index">
              <a @click="download(index)">下载</a>
            </template>
          </a-table>
        </a-layout-content>
        <a-layout-content style="padding-right:6px" v-else>
          <a-table
            :columns="columns"
            :rowKey="id"
            :dataSource="courseResource"
            :pagination="pagination"
          >
            <template slot="url" slot-scope="index">
              <a @click="playVideo(index)">播放</a>
            </template>
          </a-table>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>
<script>
import axios from "axios";

const columns = [
  {
    title: "标题",
    dataIndex: "name",
    width: "40%"
  },
  {
    title: "上传教师",
    dataIndex: "teacher.name",
    width: "20%"
  },
  {
    title: "上传时间",
    dataIndex: "updateTime",
    width: "20%"
  },
  {
    title: "操作",
    key: "url",
    scopedSlots: { customRender: "url" }
  }
];

export default {
  name: "course",
  data: function() {
    return {
      courseId: "",
      course: "",
      courseResource: [],
      type: "",
      columns,
      pagination: {
        total: 0,
        pageSize: 8,
        showTotal: total => `共 ${total} 条`
      }
    };
  },
  methods: {
    playVideo(index) {
      this.$router.push({ name: "video", params: { url: index.url } });
    },
    download(index) {
      console.log(index);
      window.open(index.url);
    },
    initCourse() {
      axios({
        method: "get",
        url: "http://localhost:8888/course/" + this.courseId,
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token")
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.course = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCourseResource(type) {
      this.type = type;
      axios({
        method: "get",
        url:
          "http://localhost:8888/courseResource/course/" +
          this.courseId +
          "?type=" +
          type,
        headers: {
          Authorization: "Bearer " + this.$cookies.get("token")
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.courseResource = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.courseId = this.$route.params.courseId;
    if (this.$cookies.get("token") == null) {
      alert("请先登录！");
      this.$router.replace("/");
    }
    this.initCourse();
    this.getCourseResource("VIDEO");
  }
};
</script>
<style>
.cover {
  width: 150px;
}
.pstyle {
  margin-bottom: 0;
}
</style>
