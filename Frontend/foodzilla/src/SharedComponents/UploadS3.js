import S3FileUpload from "react-s3";

export let S3config = {
  bucketName: "uberbucket98",
  dirName: "media",
  region: "us-east-2",
  accessKeyId: "AKIAZO3UJQCC6GNNZNNG",
  secretAccessKey: "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",
};

export let uploadProfilePics = (file) => {
  return S3FileUpload.uploadFile(file, S3config);
};
export let uploadDishImages = (file) => {
  let dishConfig = {};
  Object.assign(dishConfig, S3config);
  dishConfig.dirName = "dishes/";
  return S3FileUpload.uploadFile(file, dishConfig);
};
export let uploadRestImages = (file) => {
  let restConfig = {};
  Object.assign(restConfig, S3config);
  restConfig.dirName = "restImages/";
  return S3FileUpload.uploadFile(file, restConfig);
};
