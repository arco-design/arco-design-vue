import NP from 'number-precision';
import {
  FileItem,
  FileStatus,
  RequestOption,
  UploadRequest,
} from './interfaces';
import { NOOP } from '../_utils/dom';
import { isArray, isFunction } from '../_utils/is';

const getResponse = (xhr: XMLHttpRequest) => {
  const res = xhr.responseText || xhr.response;
  if (!res) {
    return undefined;
  }

  const contentType = xhr.getResponseHeader('Content-Type');
  if (contentType && contentType.includes('json')) {
    try {
      return JSON.parse(res);
    } catch {
      return res;
    }
  }
  return res;
};

export const getProgressStatus = (status?: FileStatus) => {
  switch (status) {
    case 'done':
      return 'success';
    case 'error':
      return 'danger';
    default:
      return 'normal';
  }
};

/**
 * Used to process the file information entered by the user. Generate a new array object without changing the original information
 * @param fileList
 */
export const processFileList = (fileList?: FileItem[]): FileItem[] => {
  if (isArray(fileList)) {
    return fileList.map((file, index) => {
      return {
        // @ts-ignore
        uid: `${Date.now()}${index}`,
        status: 'done',
        percent: 1,
        ...file,
      };
    });
  }
  return [];
};

const getValue = (obj: any, fileItem: FileItem) => {
  if (isFunction(obj)) {
    return obj(fileItem);
  }
  return obj;
};

export const uploadRequest = ({
  fileItem,
  action,
  name: originName,
  data: originData,
  headers = {},
  withCredentials = false,
  onProgress = NOOP,
  onSuccess = NOOP,
  onError = NOOP,
}: RequestOption): UploadRequest => {
  const name = getValue(originName, fileItem) || 'file';
  const data = getValue(originData, fileItem);
  const xhr = new XMLHttpRequest();
  if (withCredentials) {
    xhr.withCredentials = true;
  }

  xhr.upload.onprogress = (e: ProgressEvent) => {
    const percent = e.total > 0 ? NP.round(e.loaded / e.total, 2) : 0;
    onProgress(percent, e);
  };
  xhr.onerror = function error(e) {
    onError(e);
  };
  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      onError(getResponse(xhr));
      return;
    }

    onSuccess(getResponse(xhr));
  };

  const formData = new FormData();
  if (fileItem.file) {
    formData.append(name, fileItem.file);
  }
  if (data) {
    for (const key of Object.keys(data)) {
      formData.append(key, data[key]);
    }
  }
  xhr.open('post', action ?? '', true);

  for (const key of Object.keys(headers)) {
    xhr.setRequestHeader(key, headers[key]);
  }

  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    },
  };
};

const isAcceptFile = (file: File, accept?: string | string[]): boolean => {
  if (accept && file) {
    const accepts = isArray(accept)
      ? accept
      : accept
          .split(',')
          .map((x) => x.trim())
          .filter((x) => x);
    const fileExtension =
      file.name.indexOf('.') > -1 ? file.name.split('.').pop() : '';
    return accepts.some((type) => {
      const text = type && type.toLowerCase();
      const fileType = (file.type || '').toLowerCase();
      if (text === fileType) {
        // similar to excel files
        // Such as application/vnd.ms-excel and application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        // Those with.
        // So prioritize the comparison between the accept type of input and the type value of the file object
        return true;
      }
      if (/\/\*/.test(text)) {
        // image/* This kind of wildcard processing
        return fileType.replace(/\/.*$/, '') === text.replace(/\/.*$/, '');
      }
      if (/\..*/.test(text)) {
        // .jpg and other suffixes
        return text === `.${fileExtension && fileExtension.toLowerCase()}`;
      }
      return false;
    });
  }
  return Boolean(file);
};

export const loopDirectory = (
  itemList: DataTransferItemList,
  accept: string | undefined,
  callback: (files: File[]) => void
) => {
  const files: File[] = [];

  let restFileCount = 0; // 剩余上传文件的数量
  const onFinish = () => {
    !restFileCount && callback(files);
  };

  const _loopDirectory = (item: FileSystemEntry | null) => {
    restFileCount += 1;

    if (item?.isFile) {
      (item as FileSystemFileEntry).file((file) => {
        restFileCount -= 1;
        if (isAcceptFile(file, accept)) {
          Object.defineProperty(file, 'webkitRelativePath', {
            value: item.fullPath.replace(/^\//, ''),
          });
          files.push(file);
        }
        onFinish();
      });
      return;
    }
    if (item?.isDirectory) {
      // item 是个文件夹
      const reader = (item as FileSystemDirectoryEntry).createReader();
      let flag = false;
      const readEntries = () => {
        reader.readEntries((entries) => {
          if (!flag) {
            restFileCount -= 1;
            flag = true;
          }
          if (entries.length === 0) {
            onFinish();
          } else {
            readEntries(); // the maximum files read using readEntries is 100
            entries.forEach(_loopDirectory);
          }
        });
      };
      readEntries();
      return;
    }

    restFileCount -= 1;
    onFinish();
  };

  [].slice
    .call(itemList)
    .forEach(
      (item: DataTransferItem) =>
        item.webkitGetAsEntry && _loopDirectory(item.webkitGetAsEntry())
    );
};

export const isImage = (file: File) => {
  return file.type?.includes('image');
};

export const getFiles = (fileList?: FileList, accept?: string): File[] => {
  if (!fileList) {
    return [];
  }
  const files = Array.from(fileList);
  if (accept) {
    return files.filter((file) => {
      return isAcceptFile(file, accept);
    });
  }
  return files;
};
