import asyncExec from '../modules/asyncExec.js';

const Git = {
  async install() {
    console.log('\nGit：確認しています...');

    await asyncExec('git --version')
        .then((version) => {
          console.log(`Git：インストール済み ${version}`);
        })
        .catch(() => {
          const message = `
Git：インストールされていません。
以下のURLからGitをダウンロード、インストールしてください。
  https://git-scm.com/
`;

          throw message;
        });
  },
};

export default Git;
