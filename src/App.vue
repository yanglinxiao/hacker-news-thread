<template>
  <div id="app" class="detail-page">
    <!-- 顶部 -->
    <header class="header">
      <a href="#" class="logo">Y</a>
      <a href="#" class="name">Hacker News</a>
      <a
        v-for="menu in menuList"
        :key="menu.name"
        :href="menu.link"
        class="menu">{{ menu.name }}
      </a>
    </header>
    <!-- 添加评论区 -->
    <section class="add-comment-section">
      <div class="title-wrapper" @click="handleAddCommentCollapseClick">
        <i class="el-icon-caret-top" :class="{ collaspe: isCollaspe }"></i>
        <span class="title">OKRs from a development team's perspective(zafulabs.com)</span>
      </div>
      <div class="content" :class="{ collaspe: isCollaspe }">
        <p class="tips">
          <span>249 points by thinksocrates 15 hours ago | hide | past | web | favorite | </span>
          <span>{{ totalComments }} comments</span>
        </p>
        <div class="input-wrapper">
          <el-input v-model="value" type="textarea" :rows="5"></el-input>
        </div>
        <el-button @click="handleAddCommentClick" size="mini">add comment</el-button>
      </div>
    </section>
    <!-- 评论列表 -->
    <div class="comment-list" v-if="totalComments">
      <comment
        v-for="item in commentList"
        :key="item.id"
        :comment="item"
        @commentCollapseClick="handleCommentCollapseClick(item)">
      </comment>
    </div>
  </div>
</template>

<script>
import { getLocalStorage, setLocalStorage } from './utils/functions';
import Comment from './model/Comment';

export default {
  name: "App",
  components: {
    Comment: () => import("./components/Comment.vue")
  },
  data() {
    return {
      menuList: [], // 菜单列表
      isCollaspe: false, // 添加评论区折叠
      totalComments: 0, // 所有评论及回复数
      value: "", // 评论内容
      commentList: [] // 评论列表
    };
  },
  watch: {
    // 深度监听评论列表数据的变化
    commentList: {
      handler () {
        this.updateCommentList();
        this.getTotalComments();
      },
      deep: true
    }
  },
  methods: {
    // 初始化菜单列表
    initMenuList() {
      const menuList = ["new", "past", "comments", "ask", "show", "jobs", "submit"].map(item => {
        return {
          name: item,
          link: '#'
        }
      });
      this.menuList = Object.freeze(menuList);
    },
    // 更新评论列表
    updateCommentList() {
      setLocalStorage('commentList', this.commentList);
    },
    // 获取评论列表
    getCommentList() {
      this.commentList = getLocalStorage("commentList") || [];
    },
    // 获取所有评论和回复的数量
    getTotalComments(commentList) {
      if (!commentList) {
        this.totalComments = 0;
        commentList = this.commentList;
      }
      this.totalComments += commentList.length;
      commentList.forEach(comment => {
        const replyList = comment.replyList;
        replyList.length && this.getTotalComments(replyList);
      });
    },
    // 添加评论区折叠
    handleAddCommentCollapseClick () {
      this.isCollaspe = !this.isCollaspe;
    },
    // 添加评论
    handleAddCommentClick() {
      if (this.value === "") {
        this.$message.warning("评论不能为空");
      } else {
        this.commentList.push(new Comment(this.value));
        this.value = "";
      }
    },
    // 评论列表折叠
    handleCommentCollapseClick(item) {
      item.isCollaspe = !item.isCollaspe;
    }
  },
  created() {
    this.initMenuList();
    this.getCommentList();
  },
};
</script>

<style lang="scss">
.detail-page {
  height: 100%;
  min-height: 100vh;
  background-color: #F6F6EE;

  .header {
    background-color: #FD6621;
    height: 30px;
    line-height: 30px;

    a {
      font-size: 16px;
      color: #000;
      text-decoration: none;
    }

    .logo {
      color: #fff;
      border: 1px solid #fff;
      margin-left: 5px;
      padding: 0 5px;
      box-sizing: border-box;
    }

    .name {
      font-size: 16px;
      font-weight: bold;
      margin: 0 10px;
    }

    .menu {
      position: relative;

      &:not(:last-child) {
        margin-right: 16px;

        &::after {
          content: "";
          position: absolute;
          height: 18px;
          width: 1px;
          background: #000;
          right: -6px;
          top: 3px;
        }
      }
    }
  }

  .add-comment-section {
    margin-bottom: 30px;

    .title-wrapper {
      margin: 8px 0 0 8px;

      .el-icon-caret-top {
        color: #999;
        margin: 0 4px;
        font-size: 14px;
        transition: all .3s linear;

        &.collaspe {
          transform: rotate(180deg);
        }
      }
    }

    .content {
      margin-left: 25px;
      transition: all .1s linear;

      &.collaspe {
        height: 0;
        overflow: hidden;
      }

      .tips {
        font-size: 10px;
        color: #999;
      }

      .input-wrapper {
        margin: 10px 0;

        .el-textarea {
          width: 500px;
        }
      }

      .value {
        font-size: 12px;
        color: #000;
      }
    }
  }

  .comment-list{
    margin: 0 0 10px 8px;
  }
}
</style>
