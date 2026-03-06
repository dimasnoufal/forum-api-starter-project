import { vi } from 'vitest';
import CommentRepository from '../../../Domains/comments/CommentRepository.js';
import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import DeleteCommentUseCase from '../DeleteCommentUseCase.js';

describe('DeleteCommentUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.verifyThreadExists = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentExists = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentOwner = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.deleteComment = vi
      .fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    await deleteCommentUseCase.execute('thread-123', 'comment-123', 'user-123');

    expect(mockThreadRepository.verifyThreadExists).toBeCalledWith(
      'thread-123',
    );
    expect(mockCommentRepository.verifyCommentExists).toBeCalledWith(
      'comment-123',
    );
    expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith(
      'comment-123',
      'user-123',
    );
    expect(mockCommentRepository.deleteComment).toBeCalledWith('comment-123');
  });
});
