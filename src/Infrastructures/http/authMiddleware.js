import AuthenticationError from '../../Commons/exceptions/AuthenticationError.js';
import config from '../../Commons/config.js';
import AuthenticationTokenManager from '../../Applications/security/AuthenticationTokenManager.js';

const authenticationMiddleware = (container) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Missing authentication');
    }

    const token = authHeader.split(' ')[1];
    const authTokenManager = container.getInstance(
      AuthenticationTokenManager.name,
    );

    try {
      const artifacts = await authTokenManager.decodePayload(token);

      if (!artifacts || !artifacts.id) {
        throw new AuthenticationError('access token tidak valid');
      }

      const jwt = await import('jsonwebtoken');
      jwt.default.verify(token, config.auth.accessTokenKey);

      req.auth = {
        credentials: {
          id: artifacts.id,
        },
      };

      next();
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      throw new AuthenticationError('access token tidak valid');
    }
  } catch (error) {
    next(error);
  }
};

export default authenticationMiddleware;
