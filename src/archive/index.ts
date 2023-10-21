import * as fs from 'fs';

const create = (baseDir: string) => {
  const add = async (event: unknown, hint: string): Promise<string> => {
    const now = new Date().toISOString();

    const tail = `${now}.${hint}.json`;
    const finalFile = `${baseDir}/${tail}`;
    const tmpFile = `${baseDir}/.tmp.${tail}`;
    const content = `${JSON.stringify(event)}\n`;

    console.debug(`Trying to archive to ${finalFile}`);

    return fs.promises.writeFile(tmpFile, content, { mode: 0 })
      .then(() => fs.promises.chmod(tmpFile, 0o0600))
      .then(() => fs.promises.rename(tmpFile, finalFile))
      .then(() => tail)
      .finally(() => fs.promises.unlink(tmpFile)
        .catch((err) => {
          if (err.code === 'ENOENT') return;
          throw err;
        }));
  };

  const close = async (): Promise<undefined> => undefined;

  return {
    add,
    close,
  };
};

export default { create };
