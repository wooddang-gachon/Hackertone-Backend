import commentRepo from "../repositories/comment.js";

export default {
  async getComments(didx) {
    const rawComments = await commentRepo.findByDidx(didx);
    
    // 계층형 구조로 변환 (댓글 - 대댓글)
    const commentMap = new Map();
    const result = [];

    rawComments.forEach(c => {
      const commentObj = { ...c, uidx: c.writeridx, reply: [] };
      commentMap.set(c.cidx, commentObj);
      
      if (!c.parent_cidx) {
        result.push(commentObj);
      }
    });

    rawComments.forEach(c => {
      if (c.parent_cidx) {
        const parent = commentMap.get(c.parent_cidx);
        if (parent) {
          parent.reply.push({
            writeidx: c.writeridx,
            text: c.text
          });
        }
      }
    });

    return result;
  },

  async createComment(commentData) {
    return await commentRepo.create({
      ...commentData,
      parent_cidx: null
    });
  },

  async createReply(replyData) {
    const { uidx, cidx, text } = replyData;
    // cidx를 parent_cidx로 사용
    const parentComment = await commentRepo.findById(cidx);
    if (!parentComment) throw new Error("PARENT_COMMENT_NOT_FOUND");

    return await commentRepo.create({
      uidx,
      parent_cidx: cidx,
      didx: parentComment.didx,
      text
    });
  }
};
