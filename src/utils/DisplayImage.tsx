import { useEffect, useState } from 'react';
import getImage from './getImage';

const DisplayImage = (url: string) => {
  const [image, setImage] = useState<JSX.Element>();
  useEffect(() => {
    getImage(url)
      .then((response) => setImage(response))
      .catch((e) => console.log(e));
  }, [url]);

  return image;
};

export default DisplayImage;
