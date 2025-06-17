function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

type FileObject = {
  uri: string;
  type: string;
  name: string;
};

export function getFileObjectFromName(fileName: string, filePath: string): FileObject {
  const extension = fileName.split('.').pop()?.toLowerCase();

  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    pdf: 'application/pdf',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
  };

  const mimeType = mimeTypes[extension || ''] || 'application/octet-stream';

  return {
    uri: filePath, // e.g. 'file:///path/to/image.jpg'
    type: mimeType,
    name: fileName,
  };
}
