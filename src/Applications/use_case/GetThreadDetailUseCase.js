class GetThreadDetailUseCase {
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(threadId) {
    await this._threadRepository.verifyThreadExists(threadId);
    const thread = await this._threadRepository.getThreadById(threadId);
    const comments =
      await this._commentRepository.getCommentsByThreadId(threadId);

    const commentIds = comments.map((c) => c.id);
    const replies =
      await this._replyRepository.getRepliesByCommentIds(commentIds);

    thread.comments = comments.map((comment) => ({
      id: comment.id,
      username: comment.username,
      date: comment.date,
      replies: replies
        .filter((r) => r.commentId === comment.id)
        .map((reply) => ({
          id: reply.id,
          content: reply.isDelete ? '**balasan telah dihapus**' : reply.content,
          date: reply.date,
          username: reply.username,
        })),
      content: comment.isDelete
        ? '**komentar telah dihapus**'
        : comment.content,
    }));

    return thread;
  }
}

export default GetThreadDetailUseCase;
