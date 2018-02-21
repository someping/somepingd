class Log {
  constructor() {
    this.messages = [];
  }

  write(endpoint = 'SERVER', text, logType = 'INFO', identifier = null) {
    let logMessage;
    let timestamp = (new Date()).toLocaleTimeString("sv-SE");
    
    if (identifier != null) {
      logMessage = `[${endpoint}: ${identifier}] ${logType} ${text.trim()}`;
    } else {
      logMessage = `[${endpoint}] ${logType} ${text.trim()}`;
    }

    logMessage = `${timestamp} `+ logMessage;
    console.log(logMessage);
  }

  node(text, logType = 'INFO', identifier = null) {
    this.write('NODE', text, logType, identifier);
  }

  peer(text, logType = 'INFO', identifier = null) {
    this.write('PEER', text, logType, identifier);
  }
  
  apiserver(text, logType = 'INFO', identifier = null) {
    this.write('API', text, logType, identifier);
  }

}

module.exports = Log;