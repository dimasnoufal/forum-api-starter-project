import express from 'express';
import authenticationMiddleware from '../../../../Infrastructures/http/authMiddleware.js';

const createCommentsRouter = (handler, container) => {
  const router = express.Router({ mergeParams: true });
  const authMiddleware = authenticationMiddleware(container);

  router.post('/', authMiddleware, handler.postCommentHandler);
  router.delete('/:commentId', authMiddleware, handler.deleteCommentHandler);

  return router;
};

export default createCommentsRouter;
