#! /bin/bash

if [ $# -eq "0" ];
then
        read -p "Project Name: " folderName
else
        folderName=$1
fi

if [ -n "$folderName"  ]
then

        cd $2
        mkdir $folderName
        cd $folderName

        npm init -y
        npm i express cors dotenv mongoose
        npm i -D nodemon

        mkdir public public/temp
        cd public/temp
        touch .gitkeep
        cd ../..

        echo -e 'PORT=3510' > .env
        echo -e 'node_modules\r\n.env' > .gitignore

        mkdir src
        cd src
        touch app.js constants.js
        echo -e 'const express = require("express");\r\nconst cors = require("cors");\r\nconst dotenv = require("dotenv");\r\ndotenv.config();\r\n\r\nconst app = express();\r\n\r\napp.use(cors());\r\napp.use(express.json());\r\napp.use(express.urlencoded({ extended: true }));\r\n\r\napp.get("/", (req, res) => {\r\n\tres.send("Namaste World!!!")\r\n});\r\n\r\napp.listen(process.env.PORT || 3510, ()=>{\r\n\tconsole.log("express server running at port " + process.env.PORT);\r\n});' > index.js
        mkdir controllers db middlewares models routes utils
        cd ..

        git init

        sed -i 's/index.js/src\/index.js/g' package.json
        sed -i $'7 i \\\t\\\t"start": "nodemon index.js",' package.json

        rm -rf node_modules/
        rm -rf package-lock.json
        cd ..
        zip -r $folderName.zip $folderName -x $folderName/package-lock.json
        rm -rf $folderName
else
        echo "Error: Project Name Empty"
fi
