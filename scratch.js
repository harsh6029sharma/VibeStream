import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import fs from 'fs';
import { uploadOnCloudinary } from './src/utils/cloudinary.js';

fs.writeFileSync('test.jpg', 'test content');
uploadOnCloudinary('test.jpg').then(res => console.log(res));
