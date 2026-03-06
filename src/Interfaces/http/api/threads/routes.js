import express from 'express';
import authenticationMiddleware from '../../../../Infrastructures/http/authMiddleware.js';

const createThreadsRouter = (handler, container) => {
  const router = express.Router();
  const authMiddleware = authenticationMiddleware(container);

  router.post('/', authMiddleware, handler.postThreadHandler);
  router.get('/:threadId', handler.getThreadByIdHandler);

  return router;
};

export default createThreadsRouter;
