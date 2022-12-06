import Cookies from 'js-cookie';
import { API_URL } from 'config';
import { tokenCookie } from 'providers/AuthProvider';

const getImage = async (url: string) => {
  const headers = new Headers();
  const apiToken = Cookies.get(tokenCookie);

  headers.append('Authorization', 'Bearer ' + apiToken);
  const response = await fetch(API_URL + url, { headers });
  const blob = await response.blob();
  return <img alt="Asset" width="80%" src={URL.createObjectURL(blob)} />;
};

export default getImage;
