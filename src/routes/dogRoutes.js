const express = require('express');
const dogController = require('../controllers/dogController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Dog:
 *       type: object
 *       required:
 *         - name
 *         - imageUrl
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the dog
 *         name:
 *           type: string
 *           description: Name of the dog
 *         imageUrl:
 *           type: string
 *           description: URL of the dog's picture
 *       example:
 *         id: 64e12345abcd6789fghij012
 *         name: Buddy
 *         imageUrl: http://example.com/images/dog.jpg
 */

/**
 * @swagger
 * /api/dogs:
 *   post:
 *     summary: Upload a new dog picture
 *     tags: [Dogs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the dog
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file of the dog
 *     responses:
 *       201:
 *         description: Dog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dog'
 *       400:
 *         description: Bad request, missing or invalid fields
 */

/**
 * @swagger
 * /api/dogs:
 *   get:
 *     summary: Get all dogs
 *     tags: [Dogs]
 *     responses:
 *       200:
 *         description: A list of dogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dog'
 */

/**
 * @swagger
 * /api/dogs/{id}:
 *   get:
 *     summary: Get a dog by ID
 *     tags: [Dogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the dog
 *     responses:
 *       200:
 *         description: Dog fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dog'
 *       404:
 *         description: Dog not found
 */

/**
 * @swagger
 * /api/dogs/{id}:
 *   put:
 *     summary: Update a dog picture
 *     tags: [Dogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the dog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the dog
 *     responses:
 *       200:
 *         description: Dog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dog'
 *       404:
 *         description: Dog not found
 */

/**
 * @swagger
 * /api/dogs/{id}:
 *   delete:
 *     summary: Delete a dog by ID
 *     tags: [Dogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the dog
 *     responses:
 *       200:
 *         description: Dog deleted successfully
 *       404:
 *         description: Dog not found
 */

router.post('/', auth, upload.single('image'), dogController.uploadDogPicture);
router.get('/', dogController.getAllDogs);
router.get('/:id', dogController.getDogById);
router.put('/:id', auth, upload.single('image'), dogController.updateDogPicture);
router.delete('/:id', auth, dogController.deleteDogPicture);

module.exports = router;
