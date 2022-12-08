import { useEffect, useState } from 'react';
import { getImage } from './getImage';

const DisplayImage = (url: string | null) => {
  const [image, setImage] = useState<JSX.Element | string>('No Image');
  useEffect(() => {
    if (url !== null)
      getImage(url)
        .then((response) => setImage(response))
        .catch((e) => console.log(e));
  }, [url]);

  return image;
};

export default DisplayImage;
