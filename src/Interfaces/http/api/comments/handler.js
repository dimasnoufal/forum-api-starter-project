import AddCommentUseCase from '../../../../Applications/use_case/AddCommentUseCase.js';
import DeleteCommentUseCase from '../../../../Applications/use_case/DeleteCommentUseCase.js';

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(req, res, next) {
    try {
      const addCommentUseCase = this._container.getInstance(
        AddCommentUseCase.name,
      );
      const { id: owner } = req.auth.credentials;
      const { threadId } = req.params;
      const addedComment = await addCommentUseCase.execute(
        req.body,
        threadId,
        owner,
      );

      res.status(201).json({
        status: 'success',
        data: {
          addedComment,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCommentHandler(req, res, next) {
    try {
      const deleteCommentUseCase = this._container.getInstance(
        DeleteCommentUseCase.name,
      );
      const { id: owner } = req.auth.credentials;
      const { threadId, commentId } = req.params;
      await deleteCommentUseCase.execute(threadId, commentId, owner);

      res.json({
        status: 'success',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CommentsHandler;
