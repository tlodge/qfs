export default class Logger {
   
    constructor() {
      
      if (Logger._instance) {
        return Logger._instance
      }
      Logger._instance = this;
    }

    log(id, type, data) {
       console.log([id, type, data]);
    }
}