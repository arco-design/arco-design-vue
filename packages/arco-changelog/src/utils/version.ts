const getLastVersion = (content: string) => {
  const match = content.match(/## (\d+\.\d+\.\d+(-beta\.\d+)?)/);
  return match?.[1];
};

const getBetaVersions = (content: string) => {
  const matches = Array.from(
    content.matchAll(/## (\d+\.\d+\.\d+(-beta\.\d+)?)/g)
  );
  const versions = [];
  for (const item of matches) {
    if (/beta/.test(item[1])) {
      versions.push(item[1]);
    } else {
      break;
    }
  }
  return versions;
};

const getVersionNumber = (version: string): number => {
  if (!version) {
    return 0;
  }
  switch (version) {
    case 'alpha':
      return -3;
    case 'beta':
      return -2;
    case 'rc':
      return -1;
    default:
      return parseInt(version, 10);
  }
};

export const compareVersion = (v1: string, v2: string) => {
  const mainArray1 = v1.split('-');
  const mainArray2 = v2.split('-');
  // Major version
  const array1 = mainArray1[0].split('.');
  const array2 = mainArray2[0].split('.');
  const maxL = Math.max(array1.length, array2.length);
  for (let i = 0; i < maxL; i++) {
    const v1 = getVersionNumber(array1[i]);
    const v2 = getVersionNumber(array2[i]);
    if (v1 !== v2) {
      return v1 > v2 ? 1 : -1;
    }
  }

  // Beta part
  const subArray1 = (mainArray1[1] ?? '').split('.');
  const subArray2 = (mainArray2[1] ?? '').split('.');
  const maxSL = Math.max(subArray1.length, subArray2.length);
  for (let i = 0; i < maxSL; i++) {
    const v1 = getVersionNumber(subArray1[i]);
    const v2 = getVersionNumber(subArray2[i]);
    if (v1 !== v2) {
      return v1 > v2 ? 1 : -1;
    }
  }

  return 0;
};
