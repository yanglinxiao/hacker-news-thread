import { filterXSS, generateRandomNumber } from "../utils/functions";

export default class Comment {
  constructor(value) {
    const currentTime = Date.now();
    this.id = Date.now();
    this.nickname = `用户${generateRandomNumber()}`;
    this.value = filterXSS(value);
    this.replyList = [];
    this.vote = 0;
    this.isCollaspe = true;
    this.isReply = false;
    this.createTime = currentTime;
  }
}