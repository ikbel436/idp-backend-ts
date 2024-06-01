import Git from '../modules/git.js';

export default async () => {
  try {
    console.log('初期設定を行います。');

    await Git.install();
  } catch (e) {
    console.log(e);
  }
};
