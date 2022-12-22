import { Box, Typography } from '@mui/material';
import { apiUrl } from 'routes';
import { useGetAssetsDataById } from '../api';
import { type IAssetDetails } from '../types';

interface IProps {
  id: number;
}

const GenerateLabel = (props: IProps) => {
  const { data: assetQRCode } = useGetAssetsDataById<any>(
    props.id,
    apiUrl.assetInfo + props.id + '/qr',
  );

  const { data: assetDetails } = useGetAssetsDataById<IAssetDetails>(
    props.id,
    apiUrl.assetInfo + props.id,
  );
  return (
    <Box
      sx={{
        color: 'black',
        backgroundColor: 'white',
        width: '400px',
        height: '130px',
        border: '1px black solid',
      }}
    >
      <Box
        m={1}
        sx={{
          float: 'left',
          width: '100px',
          height: '100px',
        }}
      >
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(assetQRCode)}`}
          width="100%"
          alt="QRCode"
        />
      </Box>
      <Box pl={1} mt={1} sx={{ float: 'left' }}>
        <Typography>N: {assetDetails?.name}</Typography>
        <Typography>T: {assetDetails?.tag}</Typography>
        <Typography>S: {assetDetails?.serial}</Typography>
      </Box>
    </Box>
  );
};

export default GenerateLabel;
