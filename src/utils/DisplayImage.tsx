import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAvatar } from './getImage';

const DisplayImage = ({ url }: { url: string | null }) => {
  const [image, setImage] = useState<JSX.Element | string>('No Image');
  useEffect(() => {
    if (url !== null)
      getAvatar(url)
        .then((response) => setImage(<img width="80%" src={response} alt="Asset" />))
        .catch((e) => console.log(e));
  }, [url]);

  return <Box width="100%">{image}</Box>;
};

export default DisplayImage;
