import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY,
      region: process.env.AWS_S3_REGION,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const date = new Date();
    const dateString = date.toISOString().slice(0, 10).replace(/-/g, '');

    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Body: file.buffer,
          Key: `${dateString}/${Date.now()}_${file.originalname}`,
          ACL: 'public-read', // Make the file publicly accessible
        })
        .promise();

      return uploadResult.Location; // Returns the URL of the uploaded file
    } catch (e) {
      throw new Error(`Failed to upload file: ${e.message}`);
    }
  }
}
