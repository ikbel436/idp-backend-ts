import config from 'config';

interface Config {
  mongoURI: string;
  secretOrKey: string;
  Client_URL: string;
  RESET_PWD_KEY: string;
}

const appConfig: Config = {
  mongoURI: config.get<string>('mongoUri'),
  secretOrKey: config.get<string>('secretOrKey'),
  Client_URL: config.get<string>('Client_URL'),
  RESET_PWD_KEY: config.get<string>('RESET_PWD_KEY')
};

export default appConfig;
