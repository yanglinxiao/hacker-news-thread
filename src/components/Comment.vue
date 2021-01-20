<template>
  <section class="comment-section">
    <!-- 昵称、发表时间 -->
    <div class="text" @click="handleCommentCollaspeClick">
      <i :class="{ collaspe: comment.isCollaspe }" class="el-icon-caret-top"></i>
      <span>{{ comment.nickname }}</span>
      <span>{{ comment.createTime | formatDate("yyyy-MM-dd hh:mm:ss") }} </span>
      <span>[{{ comment.isCollaspe ? '-' : '+' }}]</span>
    </div>
    <!-- 回复区域 -->
    <div class="content" :class="{ collaspe: !comment.isCollaspe }">
      <span class="vote" @click="handleVoteClick(comment)">{{ comment.vote }}</span>
      <div class="value">{{ comment.value }}</div>
      <div class="input-wrapper" v-if="comment.isReply">
        <el-input v-model="value" type="textarea" :rows="5"></el-input>
      </div>
      <el-button
        v-if="!comment.isReply"
        @click="handleReplyClick(comment)"
        type="text">reply
      </el-button>
      <el-button
        v-if="comment.isReply"
        @click.prevent.stop="handleSubmitClick(comment)"
        type="text">submit
      </el-button>
      <el-button
        v-if="comment.isReply"
        @click="handleCancelClick(comment)"
        type="text">cancel
      </el-button>
      <div v-if="comment.replyList.length">
        <comment
          v-for="reply in comment.replyList"
          :key="reply.id"
          :comment="reply"
          @commentCollapseClick="handleReplyCollaspeClick(reply)">
        </comment>
      </div>
    </div>
  </section>
</template>

<script>
import { formatDate } from "../utils/functions";
import Comment from '../model/Comment';
 
export default {
  name: "comment",
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      value: ""
    };
  },
  filters: { formatDate },
  methods: {
    // 评论折叠
    handleCommentCollaspeClick() {
      this.$emit("commentCollapseClick");
    },
    // 回复折叠
    handleReplyCollaspeClick(reply) {
      reply.isCollaspe = !reply.isCollaspe;
    },
    // 投票
    handleVoteClick(comment) {
      comment.vote++;
    },
    // 回复评论
    handleReplyClick(item) {
      item.isReply = !item.isReply;
    },
    // 提交回复
    handleSubmitClick(item) {
      if (this.value === "") {
        this.$message.warning("回复不能为空");
      } else {
        item.replyList.push(new Comment(this.value));
        item.isReply = false;
        this.value = "";
      }
    },
    // 取消回复
    handleCancelClick(item) {
      item.isReply = false;
      this.value = "";
    },
  },
};
</script>

<style lang="scss">
   .comment-section {
    .text {
      font-size: 12px;
      color:#999;
      cursor: pointer;

      .el-icon-caret-top {
        margin: 0 4px;
        font-size: 14px;
        transition: all .3s linear;

        &.collaspe {
          transform: rotate(180deg);
        }
      }
    }

    .content {
      position: relative;
      margin: 6px 25px 6px;
      transition: all .1s linear;

      &.collaspe {
        height: 0;
        overflow: hidden;
      }

       .vote {
        position: absolute;
        left: -20px;
        font-size: 12px;
        color: #999;
        cursor: pointer;
      }

      .input-wrapper {
        margin: 8px 0;

        .el-textarea {
          width: 500px;
        }
      }

      .value {
        font-size: 12px;
        color: #000;
      }

      .el-button--text {
        color: #333;
        text-decoration: underline;
      }
    }
  }
</style>
