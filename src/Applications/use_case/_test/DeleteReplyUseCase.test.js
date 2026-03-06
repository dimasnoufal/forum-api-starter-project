import { vi } from 'vitest';
import ReplyRepository from '../../../Domains/replies/ReplyRepository.js';
import CommentRepository from '../../../Domains/comments/CommentRepository.js';
import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import DeleteReplyUseCase from '../DeleteReplyUseCase.js';

describe('DeleteReplyUseCase', () => {
  it('should orchestrating the delete reply action correctly', async () => {
    const mockReplyRepository = new ReplyRepository();
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.verifyThreadExists = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentExists = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockReplyRepository.verifyReplyExists = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockReplyRepository.verifyReplyOwner = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockReplyRepository.deleteReply = vi
      .fn()
      .mockImplementation(() => Promise.resolve());

    const deleteReplyUseCase = new DeleteReplyUseCase({
      replyRepository: mockReplyRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    await deleteReplyUseCase.execute(
      'thread-123',
      'comment-123',
      'reply-123',
      'user-123',
    );

    expect(mockThreadRepository.verifyThreadExists).toBeCalledWith(
      'thread-123',
    );
    expect(mockCommentRepository.verifyCommentExists).toBeCalledWith(
      'comment-123',
    );
    expect(mockReplyRepository.verifyReplyExists).toBeCalledWith('reply-123');
    expect(mockReplyRepository.verifyReplyOwner).toBeCalledWith(
      'reply-123',
      'user-123',
    );
    expect(mockReplyRepository.deleteReply).toBeCalledWith('reply-123');
  });
});
