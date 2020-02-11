<template>
  <div>
    <a-menu mode="horizontal">
      <a-menu-item key="all" @click="initCourses()">全部</a-menu-item>
      <a-sub-menu v-for="faculty in faculties" :key="faculty.id">
        <span slot="title" class="submenu-title-wrapper">
          {{ faculty.name }}
        </span>
        <a-menu-item
          v-for="major in faculty.majors"
          :key="major.id"
          @click="getCourses(major.id)"
        >
          {{ major.name }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>

    <div id="box">
      <b-container class="container">
        <ul>
          <li v-for="course in courses" :key="course.id">
            <a-card hoverable>
              <img alt="example" :src="course.cover" />
              <h5 class="courseName" align="center">{{ course.name }}</h5>
            </a-card>
          </li>
        </ul>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "home",
  data: function() {
    return {
      faculties: [],
      courses: []
    };
  },
  methods: {
    initFaculty() {
      axios
        .get("http://localhost:8888/faculty/getAllWithMajor")
        .then(res => {
          this.faculties = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    initCourses() {
      axios
        .get("http://localhost:8888/course/withoutMajor?pageNum=1&pageSize=10")
        .then(res => {
          console.log(res.data);
          this.courses = res.data.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCourses(majorId) {
      axios({
        method: "get",
        url:
          "http://localhost:8888/course/byMajorId/" +
          majorId +
          "?pageNum=1&pageSize=10"
      })
        .then(res => {
          console.log(res.data);
          this.courses = res.data.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.initFaculty();
    this.initCourses();
  }
};
</script>
<style lang="less" scoped>
.showInline {
  display: inline;
}
#box ul {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
}
#box li {
  padding-top: 10px;
  list-style: none;
  margin-right: 15px;
  width: 200px;
}
#box img {
  width: 190px;
  height: 240px;
  object-fit: cover;
  margin: -23px;
}
.courseName {
  color: #2b333b;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  max-height: 48px;
  margin-top: 30px;
  margin-bottom: -12px;
}
.container {
  width: 966px;
  margin-bottom: -16px;
  background: rgba(255, 255, 255, 0.413);
}
</style>
