import readline from 'readline';

const prompt = async (msg) => {
  console.log(msg);
  const answer = await question('> ');
  return answer.trim();
};

const question = (question) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readlineInterface.question(question, (answer) => {
      resolve(answer);
      readlineInterface.close();
    });
  });
};

export default prompt;
