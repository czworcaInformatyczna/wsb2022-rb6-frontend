import { Avatar } from '@mui/material';

import { useEffect, useState } from 'react';
import { getAvatar } from './getImage';

const DisplayAvatar = ({ url }: { url: string }) => {
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (url !== null && image === undefined)
      getAvatar(url)
        .then((response) => setImage(response))
        .catch((e) => console.log(e));
  }, [image, url]);
  return (
    <Avatar
      src={image}
      sx={{
        height: 30,
        width: 30,
      }}
    />
  );
};

export default DisplayAvatar;
