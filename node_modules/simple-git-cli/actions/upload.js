import dayjs from 'dayjs';
import asyncExec from '../modules/asyncExec.js';
import Git from '../modules/git.js';

export default async () => {
  try {
    console.log('ファイルをアップロードします。');

    await Git.install();
  } catch (e) {
    console.log(e);
    return;
  }

  try {
    console.log('ファイルをアップロードしています...');

    const now = dayjs().format('YYYY/MM/DD HH:mm:ss');

    await asyncExec(`git add .`).catch((e) => {
      console.error(e);
      throw e;
    });

    await asyncExec(`git commit -m "${now}"`).catch((e) => {
      console.error(e);
      throw e;
    });

    await asyncExec(`git push`).catch((e) => {
      console.error(e);
      throw e;
    });

    console.log('アップロードが完了しました。');
  } catch (e) {
    if (!e.message.includes('not installed')) {
      console.log('アップロードに失敗しました。');
    }
  }
};
