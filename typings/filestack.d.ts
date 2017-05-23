declare namespace filestack {
  interface InitOptions {
    policy?: string;
    signature?: string;
  }

  interface PickOptions {
    accept?: string | string[];
    maxSize?: number;
  }

  interface UploadResults {
    filesUploaded: UploadedFile[];
    filesFailed: UploadedFile[];
  }

  interface UploadedFile {
    filename: string;
    handle: string;
    mimetype: string;
    originalPath: string;
    size: number;
    source: string;
    url: string;
    status: string;
    key: string;
    container: string;
  }

  class FileStack {
    pick(options: PickOptions): Promise<UploadResults>
  }

  function init(key: string, initOptions?: InitOptions): FileStack;
}
