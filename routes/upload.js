const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const router = express.Router();
const crypto = require("crypto");

const s3Client = new S3Client({
  credentials: fromIni({ profile: "default" }),
  region: process.env.AWS_S3_REGION, // AWS S3 리전 설정
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET_NAME, // 업로드할 버킷 이름
    acl: "public-read", // 업로드된 객체에 대한 ACL(Access Control List)
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const uuid = crypto.randomUUID(); // 여기에서 uuid 생성
      const now = new Date();
      const datePath = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`; 
      
      cb(null, `${datePath}/${uuid}-${file.originalname}`); 
    },
  }),
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("File not uploaded");
    }

    // 업로드된 파일의 URL을 생성하여 클라이언트에게 반환
    const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${req.file.key}`;
    res.json({ success: true, url });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
