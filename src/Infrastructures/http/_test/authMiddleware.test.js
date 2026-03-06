import { vi, it, describe, expect, afterEach } from 'vitest';
import AuthenticationError from '../../../Commons/exceptions/AuthenticationError.js';
import authenticationMiddleware from '../authMiddleware.js';

describe('authMiddleware', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call next with AuthenticationError when artifacts has no id', async () => {
    // Arrange
    const mockTokenManager = {
      decodePayload: vi.fn().mockResolvedValue({ username: 'test' }), // no id field
    };
    const mockContainer = {
      getInstance: vi.fn().mockReturnValue(mockTokenManager),
    };
    const req = { headers: { authorization: 'Bearer sometoken' } };
    const res = {};
    const next = vi.fn();

    // Action
    const middleware = authenticationMiddleware(mockContainer);
    await middleware(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith(expect.any(AuthenticationError));
  });

  it('should call next with AuthenticationError when token manager throws non-authentication error', async () => {
    // Arrange
    const mockTokenManager = {
      decodePayload: vi.fn().mockRejectedValue(new Error('unexpected error')),
    };
    const mockContainer = {
      getInstance: vi.fn().mockReturnValue(mockTokenManager),
    };
    const req = { headers: { authorization: 'Bearer sometoken' } };
    const res = {};
    const next = vi.fn();

    // Action
    const middleware = authenticationMiddleware(mockContainer);
    await middleware(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith(expect.any(AuthenticationError));
  });
});
