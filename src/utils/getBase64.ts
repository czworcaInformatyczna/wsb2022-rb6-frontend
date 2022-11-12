export const getBase64 = async (file: File) => {
  return await new Promise((resolve) => {
    let baseURL: ArrayBuffer | string | null = null;
    // Make new FileReader
    const reader = new FileReader();
    // Convert the file to base64 text
    reader.readAsDataURL(file);
    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};
