import express from 'express';
import authenticationMiddleware from '../../../../Infrastructures/http/authMiddleware.js';

const createRepliesRouter = (handler, container) => {
  const router = express.Router({ mergeParams: true });
  const authMiddleware = authenticationMiddleware(container);

  router.post('/', authMiddleware, handler.postReplyHandler);
  router.delete('/:replyId', authMiddleware, handler.deleteReplyHandler);

  return router;
};

export default createRepliesRouter;
