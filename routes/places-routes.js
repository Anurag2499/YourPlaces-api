const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const placeControllers = require('../controllers.js/places-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

router.get('/:pid', placeControllers.getPlaceById);

router.get('/user/:uid', placeControllers.getPlacesByUserId);

router.use(checkAuth);

//validate the data
router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
  ],
  placeControllers.createPlace
);

//validate the data
router.patch(
  '/:pid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  placeControllers.updatePlace
);

router.delete('/:pid', placeControllers.deletePlace);

module.exports = router;
