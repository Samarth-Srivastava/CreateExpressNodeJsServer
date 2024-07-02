import app from './app.js';
import dotenv from 'dotenv';
import logger from './utils/logger.js';
dotenv.config();

app.listen(process.env.PORT || 3510, ()=>{
	logger.info("express server running at port " + process.env.PORT);
});
