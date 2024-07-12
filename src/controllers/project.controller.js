import logger from '../utils/logger.js';
import { exec } from 'node:child_process';
import fs from 'node:fs';

function createProject(req, res) {
    try{
        const folderName = req.query.folderName;
        const zipFileName =  folderName+'.zip';
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

                        const data = fs.readFileSync('/Projects/NodeJs/'+ folderName + '.zip');

                        res.set('Content-Type','application/octet-stream');
                        res.set('Content-Disposition',`attachment; filename=${zipFileName}`);
                        res.set('Content-Length',data.length);
                        res.send(data);
                        //res.sendFile('/Projects/NodeJs/'+ folderName + '.zip');

                    // const zip = new AdmZip();
                    // zip.addFile(`/e/Projects/NodeJs/lknkjnknb/.env`);

                    // zip.writeZip('/Projects/NodeJs/qwerty.zip');

                    // const data = zip.toBuffer();

                    // res.set('Content-Type','application/octet-stream');
                    // res.set('Content-Disposition',`attachment; filename=${zipFileName}`);
                    // res.set('Content-Length',data.length);
                    // res.send(data);
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