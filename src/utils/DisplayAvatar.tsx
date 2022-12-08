import { Avatar } from '@mui/material';

import { useEffect, useState } from 'react';
import { getAvatar } from './getImage';

const DisplayAvatar = ({ url }: { url: string }) => {
  const [image, setImage] = useState<string>('');
  useEffect(() => {
    if (url !== null)
      getAvatar(url)
        .then((response) => setImage(response))
        .catch((e) => console.log(e));
  }, [url]);
  return (
    <Avatar
      alt="Avatar"
      src={image}
      sx={{
        height: 30,
        width: 30,
      }}
    />
  );
};

export default DisplayAvatar;
