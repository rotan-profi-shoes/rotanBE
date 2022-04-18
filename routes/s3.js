const dotenv = require('dotenv');
const aws = require('aws-sdk');
const router = require('express').Router();
const verify = require('./verifyToken');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const region = process.env.AWS_BUCKET_REGION
const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  secretAccessKey,
  accessKeyId,
  signatureVersion: "v4",
});

router.get('/create-signed-url',verify, async (req, res) => {

  const params = ({
    Bucket: bucketName,
    Key: uuidv4(),
    Expires: 60000,
    ContentType: 'image/jpeg'
  })

  const url = s3.getSignedUrl('putObject', params);

  res.send({
    url,
  });
})

module.exports = router;
