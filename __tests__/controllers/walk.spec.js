import walkController from '../controller/walk.js';
import walkService from '../services/walk.js';

describe('Walk Controller Tests', () => {
  describe('startWalk', () => {
    it('should return status 401 if userId is not provided', async () => {
      const req = {userId: null};
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

      await walkController.startWalk(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({error: 'Unauthorized'});
    });

    // Add more test cases for startWalk function if necessary
  });

  describe('endWalk', () => {
    it('should return status 401 if userId is not provided', async () => {
      const req = {userId: null};
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

      await walkController.endWalk(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({error: 'Unauthorized'});
    });

    // Add more test cases for endWalk function if necessary
  });

  describe('getStatistics', () => {
    it('should return status 401 if userId is not provided', async () => {
      const req = {userId: null};
      const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

      await walkController.getStatistics(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({error: 'Unauthorized'});
    });

    // Add more test cases for getStatistics function if necessary
  });
});
