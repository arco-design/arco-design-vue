import path from 'path';
import fs from 'fs-extra';

export const run = ({ gitlab }) => {
  if (gitlab) {
    fs.copySync(
      path.resolve(__dirname, '.gitlab'),
      path.resolve(process.cwd(), '.gitlab'),
      {
        overwrite: true,
      }
    );
  } else {
    fs.copySync(
      path.resolve(__dirname, '.github'),
      path.resolve(process.cwd(), '.github'),
      {
        overwrite: true,
      }
    );
  }
};
