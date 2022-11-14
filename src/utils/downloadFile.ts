import { API_URL } from 'config';
import Cookies from 'js-cookie';
import { tokenCookie } from 'providers/AuthProvider';

const downloadFile = (downloadUrl: string, fileName: string) => {
  const anchor = document.createElement('a');
  document.body.appendChild(anchor);
  const headers = new Headers();
  const apiToken = Cookies.get(tokenCookie);

  headers.append('Authorization', 'Bearer ' + apiToken);
  void fetch(API_URL + downloadUrl, { headers })
    .then(async (response) => {
      return await response.blob();
    })
    .then((blobby) => {
      const objectUrl = window.URL.createObjectURL(blobby);
      console.log(objectUrl);
      anchor.href = objectUrl;
      anchor.download = fileName;
      anchor.click();

      window.URL.revokeObjectURL(objectUrl);
      return null;
    });
};

export default downloadFile;
