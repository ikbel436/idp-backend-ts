import * as childProcess from 'child_process';

export default (command) => {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, (error, stdout) => {
      if (error) {
        return reject(error);
      }

      return resolve(stdout);
    });
  });
};
