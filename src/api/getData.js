import fetch from "@/config/fetch";
import fetch2 from "@/config/fetch2";
import { baseUrl2, baseUrl3, baseUrl4 } from "../config/env";


export const getFileList = () => fetch2("/getFileList", "", "GET", baseUrl2);
export const selectFile = (data) =>
    fetch2("/selectImg", data, "POST", baseUrl2);

export const positiveDataAugmentationUpload = (data) =>
    fetch2("/positiveDataAugmentationUpload", data, "POST", baseUrl2);
export const negativeDataAugmentationUpload = (data) =>
    fetch2("/negativeDataAugmentationUpload", data, "POST", baseUrl2);


export const positiveDataAugmentationGetFileList = () =>
    fetch2("/positiveDataAugmentationGetFileList", "", "GET", baseUrl2);
export const negativeDataAugmentationGetFileList = () =>
    fetch2("/negativeDataAugmentationGetFileList", "", "GET", baseUrl2);


export const positiveDataAugmentationSelectFile = (data) =>
    fetch2("/positiveDataAugmentationSelectFile", data, "POST", baseUrl2);
export const negativeDataAugmentationSelectFile = (data) =>
    fetch2("/negativeDataAugmentationSelectFile", data, "POST", baseUrl2);


export const getResult = (data) => fetch2("/getResult", data, "POST", baseUrl2);
export const confirmFlame = (data) =>
    fetch2("/confirmFlame", data, "POST", baseUrl2);

export const faceTaskCreate = (data) =>
    fetch2("/faceTaskCreate", data, "POST", baseUrl3);

export const getFaceTaskList = (data) =>
    fetch2("/getFaceTaskList", data, "GET", baseUrl3);

export const getFaceTaskResult = (data) =>
    fetch2("/getFaceTaskResult", data, "GET", baseUrl3);

export const downloadFaceResult = (data) =>
    fetch2("/downloadFaceResult", data, "GET", baseUrl3);


export const modelPruneCreate = (data) =>
    fetch2("/modelPruneCreate", data, "POST", baseUrl4);

export const getPruneTaskList = (data) =>
    fetch2("/getPruneTaskList", data, "GET", baseUrl4);

export const getPruneTaskResult = (data) =>
    fetch2("/getPruneTaskResult", data, "GET", baseUrl4);

export const downloadPruneResult = (data) =>
    fetch2("/downloadPruneResult", data, "GET", baseUrl4);


export const login = (data) => fetch("/admin/login", data, "POST");

export const signout = () => fetch("/admin/signout");

export const getAdminInfo = () => fetch("/admin/info");