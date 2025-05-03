import axios from 'axios';
import mime from 'mime';
import { Platform } from 'react-native';

export class S3Helper {
  static bucketName = 'afren';
  static region = 'eu-north-1'; // e.g. 'us-east-1'
  static s3Endpoint = `https://${S3Helper.bucketName}.s3.${S3Helper.region}.amazonaws.com`;
  static bucketPath = 'bucket.afren'; // Optional: e.g., 'uploads'

  static generateFileName(originalName: string): string {
    const ext = originalName.split('.').pop();
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    const uniqueId = Date.now() + '-' + Math.floor(Math.random() * 10000);
    return `${uniqueId}-${baseName}.${ext}`;
  }

  static async uploadFileToS3(filePath: string, originalName: string): Promise<string> {
    try {
      const fileName = S3Helper.generateFileName(originalName);
      const fileKey = `${S3Helper.bucketPath}/${fileName}`;
      const mimeType = mime.getType(filePath) || 'application/octet-stream';
      const fileUri = Platform.OS === 'ios' ? filePath.replace('file://', '') : filePath;
      const fileUrl = `${S3Helper.s3Endpoint}/${fileKey}`;

      const file = await fetch(filePath);
      const fileBuffer = await file.arrayBuffer();

      const response = await axios.put(fileUrl, fileBuffer, {
        headers: {
          'Content-Type': mimeType,
        },
      });

      if (response.status === 200) {
        return fileUrl;
      } else {
        throw new Error(`S3 upload failed: ${response.status}`);
      }
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw error;
    }
  }
}
