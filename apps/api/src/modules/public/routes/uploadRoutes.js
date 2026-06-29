import express from 'express';
import { uploadDocs, uploadFields } from '../controllers/upload/uploadController.js';

const router = express.Router();

router.post('/', uploadFields, uploadDocs);


export default router;
