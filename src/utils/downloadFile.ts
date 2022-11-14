// eslint-disable-next-line @typescript-eslint/no-unused-vars
const downloadFile = (downloadUrl: string, fileName: string, token: string) => {
  const anchor = document.createElement('a');
  document.body.appendChild(anchor);

  const headers = new Headers();
  headers.append('Authorization', 'Bearer 274|Eybl2MYFlVKZVZp5zNJAK2YslcEpKYr0g8thrOfD');
  console.log(downloadUrl);
  void fetch(downloadUrl, { headers })
    .then(async (response) => {
      return await response.blob();
    })
    .then((blobby) => {
      const objectUrl = window.URL.createObjectURL(blobby);

      anchor.href = objectUrl;
      anchor.download = fileName;
      anchor.click();

      window.URL.revokeObjectURL(objectUrl);
      return null;
    });
};

export default downloadFile;
