import express from 'express';
import cors from 'cors';
import logger from './utils/logger.js';

const app = express();

// app.use(cors({
//     credentials: true,
//     origin: (origin, cb) => {

//         if (!origin) {
//             logger.info("Request from origin - " + origin);
//             return cb(null, true);
//         }
//         logger.info("API Call Origin :" + origin);
//         if (process.env.ALLOWED_DOMAINS.split(',').indexOf(origin) === -1) {
//             logger.info("Not allowed dodmain - " + origin);
//             var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
//             return cb(new Error(msg), false);
//         }
//         return cb(null, true);
//     }
// }));

app.use(cors({
    origin: '*'
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import { projectRouter } from './routes/project.routes.js';

app.use('/api/project', projectRouter);

export default app;