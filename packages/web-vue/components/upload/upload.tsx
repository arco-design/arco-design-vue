import type { PropType } from 'vue';
import {
  defineComponent,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
  computed,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { isFunction } from '../_utils/is';
import type {
  CustomIcon,
  FileItem,
  ListType,
  RequestOption,
  UploadRequest,
} from './interfaces';
import { getDataURLFromFile, uploadRequest } from './utils';
import UploadButton from './upload-button';
import UploadList from './upload-list';
import { uploadInjectionKey } from './context';
import { EmitType } from '../_utils/types';

export default defineComponent({
  name: 'Upload',
  components: {
    UploadButton,
    UploadList,
  },
  props: {
    /**
     * @zh 文件列表
     * @en File List
     * @vModel
     */
    fileList: {
      type: Array as PropType<FileItem[]>,
      default: undefined,
    },
    /**
     * @zh 默认的文件列表（非受控状态）
     * @en Default file list (uncontrolled state)
     */
    defaultFileList: {
      type: Array as PropType<FileItem[]>,
      default: () => [],
    },
    /**
     * @zh 接收的上传文件类型，具体参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#htmlattrdefaccept "_blank")
     * @en For the received upload file type, please refer to [HTML standard](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#htmlattrdefaccept "_blank")
     */
    accept: String,
    /**
     * @zh 上传的URL
     * @en Uploaded URL
     */
    action: String,
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否支持多文件上传
     * @en Whether to support multiple file upload
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否支持文件夹上传（需要浏览器支持）
     * @en Whether to support folder upload (requires browser support)
     */
    directory: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否支持拖拽上传
     * @en Whether to support drag and drop upload
     */
    draggable: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 提示文字
     * @en Prompt text
     */
    tip: String,
    /**
     * @zh 上传请求附加的头信息
     * @en Additional header information for upload request
     */
    headers: Object,
    /**
     * @zh 上传请求附加的数据
     * @en Upload request additional data
     */
    data: {
      type: [Object, Function] as PropType<
        | Record<string, unknown>
        | ((fileItem: FileItem) => Record<string, unknown>)
      >,
    },
    /**
     * @zh 上传的文件名
     * @en Uploaded file name
     */
    name: {
      type: [String, Function] as PropType<
        string | ((fileItem: FileItem) => string)
      >,
    },
    /**
     * @zh 上传请求是否携带 cookie
     * @en Whether the upload request carries cookies
     */
    withCredentials: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 自定义上传行为
     * @en Custom upload behavior
     */
    customRequest: {
      type: Function as PropType<(option: RequestOption) => UploadRequest>,
    },
    /**
     * @zh 限制上传文件的数量。`0`表示不限制
     * @en Limit the number of uploaded files. `0` means no limit
     */
    limit: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 是否自动上传文件
     * @en Whether to upload files automatically
     */
    autoUpload: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否显示文件列表
     * @en Whether to display the file list
     */
    showFileList: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 图片列表类型
     * @en Picture list type
     * @values 'text','picture','picture-card'
     */
    listType: {
      type: String as PropType<ListType>,
      default: 'text',
    },
    /**
     * @zh Response中获取图片URL的key，开启后会用上传的图片替换预加载的图片
     * @en Get the key of the image URL in the Response. After opening, it will replace the pre-load image with the uploaded image
     */
    responseUrlKey: {
      type: String,
    },
    /**
     * @zh 自定义图标
     * @en Custom icon
     */
    customIcon: {
      type: Object as PropType<CustomIcon>,
    },
    /**
     * @zh 上传图片前触发
     * @en Trigger before uploading a picture
     */
    onBeforeUpload: {
      type: Function as PropType<(file: File) => Promise<boolean>>,
    },
    /**
     * @zh 移除图片前触发
     * @en Triggered before removing the picture
     */
    onBeforeRemove: {
      type: Function as PropType<(fileItem: FileItem) => Promise<boolean>>,
    },
    /**
     * @zh 点击上传按钮触发（如果返回 Promise 则会关闭默认 input 上传）
     * @en Click the upload button to trigger (if the Promise is returned, the default input upload will be closed)
     */
    onButtonClick: {
      type: Function as PropType<(event: Event) => Promise<FileList> | void>,
    },
    // for JSX
    onChange: {
      type: [Function, Array] as PropType<
        EmitType<(fileList: FileItem[], fileItem: FileItem) => void>
      >,
    },
    onProgress: {
      type: [Function, Array] as PropType<
        EmitType<(fileItem: FileItem, event: ProgressEvent) => void>
      >,
    },
    onExceedLimit: {
      type: [Function, Array] as PropType<
        EmitType<(fileList: FileItem[], files: File[]) => void>
      >,
    },
    onPreview: {
      type: [Function, Array] as PropType<
        EmitType<(fileItem: FileItem) => void>
      >,
    },
    onSuccess: {
      type: [Function, Array] as PropType<
        EmitType<(fileItem: FileItem) => void>
      >,
    },
    onError: {
      type: [Function, Array] as PropType<
        EmitType<(fileItem: FileItem) => void>
      >,
    },
  },
  emits: [
    'update:fileList',
    /**
     * @zh 上传的图片超出限制后触发
     * @en Triggered when the uploaded image exceeds the limit
     * @param {FileItem[]} fileList
     * @param {File[]} files
     */
    'exceedLimit',
    /**
     * @zh 上传的图片状态发生改变时触发
     * @en Triggered when the status of the uploaded image changes
     * @param {FileItem[]} fileList
     * @param {fileItem} fileItem
     */
    'change',
    /**
     * @zh 上传中的图片进度改变时触发
     * @en Triggered when the uploading image progress changes
     * @param {fileItem} fileItem
     * @param {ProgressEvent} event
     */
    'progress',
    /**
     * @zh 点击图片预览时的触发
     * @en Trigger when the image preview is clicked
     * @param {FileItem} fileItem
     */
    'preview',
    /**
     * @zh 上传成功时触发
     * @en Triggered when upload is successful
     * @param {FileItem} fileItem
     */
    'success',
    /**
     * @zh 上传失败时触发
     * @en Triggered when upload fails
     * @param {FileItem} fileItem
     */
    'error',
  ],
  /**
   * @zh 上传列表的项目
   * @en Upload list item
   * @slot upload-item
   * @binding {FileItem} fileItem
   * @binding {number} index
   */
  /**
   * @zh 上传图标
   * @en Upload button
   * @slot upload-button
   */
  setup(props, { emit, slots }) {
    const { fileList } = toRefs(props);
    const prefixCls = getPrefixCls('upload');

    // Internally maintained picture list
    const _fileList = ref<FileItem[]>([]);
    const fileMap = new Map<string, FileItem>();
    const requestMap = new Map<string, UploadRequest>();

    const isMax = computed(() => {
      return props.limit > 0 && _fileList.value.length >= props.limit;
    });

    const checkFileList = (fileList?: FileItem[]) => {
      fileMap.clear();
      const newFileList = fileList?.map((data, index) => {
        const fileItem = reactive({
          ...data,
          uid: data.uid ?? `${Date.now()}${index}`,
          status: data.status ?? 'done',
          percent: data.percent ?? (data.status === 'error' ? 0 : 1),
        });
        fileMap.set(fileItem.uid, fileItem);
        return fileItem;
      });
      _fileList.value = newFileList ?? [];
    };

    checkFileList(props.defaultFileList);
    watch(
      fileList,
      (fileList) => {
        if (fileList) {
          checkFileList(fileList);
        }
      },
      { immediate: true, deep: true }
    );

    const updateFileList = (file: FileItem) => {
      emit('update:fileList', _fileList.value);
      emit('change', _fileList.value, file);
    };

    const uploadFile = (fileItem: FileItem) => {
      const handleProgress = (percent: number, event?: ProgressEvent) => {
        const file = fileMap.get(fileItem.uid);
        if (file) {
          file.status = 'uploading';
          file.percent = percent;

          emit('progress', file, event);
          updateFileList(file);
        }
      };

      const handleSuccess = (response: any) => {
        const file = fileMap.get(fileItem.uid);
        if (file) {
          file.status = 'done';
          file.percent = 1;
          file.response = response;
          if (props.responseUrlKey && response[props.responseUrlKey]) {
            file.url = response[props.responseUrlKey];
          }

          requestMap.delete(file.uid);
          emit('success', file);
          updateFileList(file);
        }
      };

      const handleError = (response: any) => {
        const file = fileMap.get(fileItem.uid);
        if (file) {
          file.status = 'error';
          file.percent = 0;
          file.response = response;

          requestMap.delete(file.uid);
          emit('error', file);
          updateFileList(file);
        }
      };

      const option: RequestOption = {
        fileItem,
        action: props.action,
        name: props.name,
        data: props.data,
        headers: props.headers,
        withCredentials: props.withCredentials,
        onProgress: handleProgress,
        onSuccess: handleSuccess,
        onError: handleError,
      };

      fileItem.status = 'uploading';
      fileItem.percent = 0;

      // 保存请求
      const request = isFunction(props.customRequest)
        ? props.customRequest(option)
        : uploadRequest(option);

      requestMap.set(fileItem.uid, request);
      updateFileList(fileItem);
    };

    const abort = (fileItem: FileItem) => {
      const req = requestMap.get(fileItem.uid);
      if (req) {
        req.abort?.();
        requestMap.delete(fileItem.uid);
        const file = fileMap.get(fileItem.uid);
        if (file) {
          file.status = 'error';
          file.percent = 0;

          updateFileList(file);
        }
      }
    };

    const submit = (fileItem?: FileItem) => {
      if (fileItem) {
        const file = fileMap.get(fileItem.uid);
        if (file) {
          uploadFile(file);
        }
      } else {
        for (const item of _fileList.value) {
          if (item.status === 'init') {
            uploadFile(item);
          }
        }
      }
    };

    const initUpload = async (file: File, index: number) => {
      const uid = `${Date.now()}${index}`;

      const dataURL = await getDataURLFromFile(file);
      const fileItem: FileItem = reactive({
        uid,
        file,
        url: dataURL,
        name: file.name,
        status: 'init',
        percent: 0,
      });

      fileMap.set(uid, fileItem);
      _fileList.value.push(fileItem);
      updateFileList(fileItem);

      if (props.autoUpload) {
        uploadFile(fileItem);
      }
    };

    const uploadFiles = (files: File[]) => {
      if (
        props.limit > 0 &&
        _fileList.value.length + files.length > props.limit
      ) {
        emit('exceedLimit', _fileList.value, files);
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (isFunction(props.onBeforeUpload)) {
          Promise.resolve(props.onBeforeUpload(file))
            .then((result: boolean) => {
              if (result) {
                initUpload(file, i);
              }
            })
            .catch((err) => {
              // eslint-disable-next-line no-console
              console.error(err);
            });
        } else {
          initUpload(file, i);
        }
      }
    };

    const removeFile = (fileItem: FileItem) => {
      _fileList.value.splice(_fileList.value.indexOf(fileItem), 1);
      updateFileList(fileItem);
    };

    const handleRemove = (fileItem: FileItem) => {
      if (isFunction(props.onBeforeRemove)) {
        Promise.resolve(props.onBeforeRemove(fileItem))
          .then((result: boolean) => {
            if (result) {
              removeFile(fileItem);
            }
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
          });
      } else {
        removeFile(fileItem);
      }
    };

    const handlePreview = (fileItem: FileItem) => {
      emit('preview', fileItem);
    };

    provide(
      uploadInjectionKey,
      reactive({
        disabled: props.disabled,
        listType: props.listType,
        iconCls: `${prefixCls}-icon`,
        customIcon: props.customIcon,
        onUpload: uploadFile,
        onAbort: abort,
        onRemove: handleRemove,
        onPreview: handlePreview,
      })
    );

    const renderButton = () => {
      return (
        <UploadButton
          key="arco-upload-button"
          v-slots={{
            default: slots['upload-button'],
          }}
          disabled={props.disabled}
          draggable={props.draggable}
          listType={props.listType}
          isMax={isMax.value}
          uploadFiles={uploadFiles}
          multiple={props.multiple}
          directory={props.directory}
          tip={props.tip}
          accept={props.accept}
        />
      );
    };

    const render = () => {
      if (!props.showFileList) {
        return renderButton();
      }

      return (
        <div
          class={[
            `${prefixCls}-wrapper`,
            `${prefixCls}-wrapper-type-${props.listType}`,
          ]}
        >
          {props.listType !== 'picture-card' && renderButton()}
          <UploadList
            v-slots={{
              'upload-button': renderButton,
              'upload-item': slots['upload-item'],
            }}
            fileList={_fileList.value}
            listType={props.listType}
          />
        </div>
      );
    };

    return {
      prefixCls,
      submit,
      abort,
      render,
    };
  },
  render() {
    return this.render();
  },
});
