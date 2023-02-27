import S3 from 'react-aws-s3';
window.Buffer = window.Buffer || require("buffer").Buffer;
export async function uploadImg(file) {

  const config = {
    endpoint: "https://mtbroadcast.sfo3.digitaloceanspaces.com",
    s3Url: 'https://mtbroadcast.sfo3.digitaloceanspaces.com',
    bucketName: "mtbroadcast",
    region: "nyc3", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
    accessKeyId: "DO00L8PKGYEKX8NY9W9T", // Access key pair. You can create access key pairs using the control panel or API.
    secretAccessKey: "xjHl6zMBZs1NHXnVI4HAMUj8wwQy+BXAuLEvXkVzAy8" // Secret access key defined through an environment variable.
  }

  const ReactS3Client = new S3(config);
  /*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */

  /* This is optional */
  const newFileName = 'test-file';

  return ReactS3Client
    .uploadFile(file, newFileName)
    .then(data => console.log(data))
    .catch(err => console.error(err))
}
