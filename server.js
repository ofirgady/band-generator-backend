import {generateMeta, generateImage} from './controllers/openAiController.js';
import cors from 'cors';
import express from 'express';

// app setup
const app = express();

// middleware
app.use(express.json());
app.use(express.static('public'));

// routes
app.post('/openai/meta', generateMeta);
app.post('/openai/image', generateImage);

// Start the server
app.listen(3030, () => console.log('Server is running on port 3030'));