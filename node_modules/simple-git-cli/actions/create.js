import GitHub from 'github-api';
import asyncExec from '../modules/asyncExec.js';
import prompt from '../modules/prompt.js';
import Git from '../modules/git.js';

export default async (name) => {
  try {
    console.log('プロジェクトを作成します。');

    await Git.install();
  } catch (e) {
    console.log(e);
    return;
  }

  try {
    const res = await asyncExec(`git init`);

    if (res.includes('Reinitialized existing Git repository')) {
      console.log('プロジェクト作成済みです。');
      console.log(`新しいファイルをアップロードする場合は、以下のコマンドを実行してください。`);
      console.log(`$ sgit upload`);
      console.log();
      return;
    }

    const username = await prompt('GitHubのユーザー名/メールアドレスを入力してください。');
    const password = await prompt('GitHubのパスワードを入力してください。');

    const github = new GitHub({
      username,
      password,
    });

    console.log('プロジェクトを作成しています...');

    const me = github.getUser();

    const repo = await me.createRepo({
      name,
      private: true,
    });

    await asyncExec(`git remote add origin ${repo.data.clone_url}`);
    await asyncExec(`touch .gitkeep`);
    await asyncExec(`git add .gitkeep`);
    await asyncExec(`git commit -m "sgit create"`);
    await asyncExec(`git push --set-upstream origin master`);

    console.log();
    console.log(`プロジェクトを作成しました。以下のURLからアップロードしたファイルを見ることができます。`);
    console.log(`${repo.data.html_url}`);
    console.log(`新しいファイルをアップロードする場合は、以下のコマンドを実行してください。`);
    console.log(`$ sgit upload`);
    console.log();
  } catch (e) {
    console.log('プロジェクト作成に失敗しました。');
    await asyncExec(`rm -rf .git`);
  }
};
