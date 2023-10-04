// eslint-disable-next-line no-unused-vars
import { Express } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';
import { basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';

/**
 * Injects routes with their handlers to the given Express application.
 */
const injectRoutes = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);

  // Users sign up
  api.post('/users', UsersController.postNew);
  api.get('/users/me', xTokenAuthenticate, UsersController.getMe);

  // Authentication
  api.get('/connect', basicAuthenticate, AuthController.getConnect);
  api.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

  // Files
  api.post('/files', xTokenAuthenticate, FilesController.postUpload);

  // Files Task 6
  api.get('/files/:id', xTokenAuthenticate, FilesController.getShow);
  api.get('/files', xTokenAuthenticate, FilesController.getIndex);

  // Files Task 7
  api.put('/files/:id/publish', xTokenAuthenticate, FilesController.putPublish);
  api.put('/files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish);
  api.get('/files/:id/data', FilesController.getFile);

  api.all('*', (req, res, next) => {
    errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });
  api.use(errorResponse);
};

export default injectRoutes;
