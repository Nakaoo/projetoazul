// Step 1: Import the S3Client object and all necessary SDK commands.
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';


// Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
const s3Client = new S3Client({
    endpoint: "https://nyc3.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    region: "nyc3", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
    credentials: {
      accessKeyId: "DO00L8PKGYEKX8NY9W9T", // Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: "xjHl6zMBZs1NHXnVI4HAMUj8wwQy+BXAuLEvXkVzAy8" // Secret access key defined through an environment variable.
    }
});


export const uploadObject = async (params) => {
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully uploaded object: " +
        params.Bucket +
        "/" +
        params.Key
    );
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
