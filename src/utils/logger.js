import log4js from 'log4js';

let getFormattedDate = (date) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const hour = String(today.getHours()).padStart(2, '0');
  const min = String(today.getMinutes()).padStart(2, '0');
  const sec = String(today.getSeconds()).padStart(2, '0');
  //const localDate = `${year}${month}${day}${hour}${min}${sec}`;
  const localDate = `${year}${month}${day}`;
  return localDate;
};

let fileName = "./logs/log_" + getFormattedDate()+".log";

log4js.configure({
    appenders: {
      console: { type: "console" },
      file: {
        type: "file",
        filename: fileName,
        maxLogSize: 10485760, // 10MB
        backups: 3,
        compress: true
      }
    },
    categories: {
      default: { appenders: ["console", "file"], level: "all" }
    }
  });

const logger = log4js.getLogger('file');
export default logger;