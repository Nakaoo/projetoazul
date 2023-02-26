import S3 from 'react-aws-s3';
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
    bucketName: process.env.REACT_APP_DIGITAL_BUCKET,
    region: process.env.REACT_APP_DIGITAL_REGIAO,
    accessKeyId: process.env.REACT_APP_DIGITAL_KEY,
    secretAccessKey: process.env.REACT_APP_DIGITAL_SECRETKEY,
    s3Url: process.env.REACT_APP_DIGITAL_S3URL, /* optional */
}

const ReactS3Client = new S3(config);

export default async (file) => {
    console.log('file', file);

    ReactS3Client
        .uploadFile(file.Body, file.Key)
        .then(data => console.log(data))
        .catch(err => console.error(err))
}