import logger from '../utils/logger.js';
import { exec } from 'node:child_process';
import path from 'node:path';

function createProject(req, res) {
    try{
        const folderName = req.query.folderName;
        let statusCode = 200;
        let d = {}
        const myShellScript = exec(`sh ${process.env.SH_FILE_PATH}/createProject.sh ${folderName} ${process.env.TEMP_FILE_PATH}`);
        
        myShellScript.stdout.on('data', (data)=>{
            logger.info("output: \r\n" + data);
            d = data;
        });
        myShellScript.stderr.on('data', (data)=>{
            logger.error("error output: \r\n" + data);
            statusCode = 400;
            d = data;
        });
        myShellScript.on('exit', function (code, signal) {
             logger.info('child process exited with ' +
                        `code ${code} and signal ${signal}`);
                        res.set("Content-Disposition", 'attachment; filename='+folderName+'.zip');
                        res.sendFile('/Projects/NodeJs/'+ folderName + '.zip');
          });
        
    }
    catch(err){
        logger.error("error: \r\n" + err);
        res.status(400).json(err);
    }
}

export {
    createProject
}