import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from 'react-router';

const ResultList = ({ results, clear }: { clear: () => void; results: any[] }) => {
  const navigate = useNavigate();
  const displayModel = (res: any) => {
    switch (res.model) {
      case 'asset':
        return (
          <Box display="flex" m={1}>
            <Box width="90%">
              <Box>{res.name}</Box>
              <Box sx={{ color: 'grey' }}>{res.tag}</Box>
            </Box>
            <Box width="10%" mr={1} display="flex" alignItems="center">
              <FormatListBulletedIcon />
            </Box>
          </Box>
        );
      case 'licence':
        return (
          <Box display="flex" m={1}>
            <Box width="90%">
              <Box>
                {res.name} {res.surname}
              </Box>
              <Box sx={{ color: 'grey' }}>{res.email}</Box>
            </Box>
            <Box width="10%" mr={1} display="flex" alignItems="center">
              <StickyNote2OutlinedIcon />
            </Box>
          </Box>
        );
      case 'user':
        return (
          <Box display="flex" m={1}>
            <Box width="90%">
              <Box>
                {res.name} {res.surname}
              </Box>
              <Box sx={{ color: 'grey' }}>{res.email}</Box>
            </Box>
            <Box width="10%" mr={1} display="flex" alignItems="center">
              <PersonIcon />
            </Box>
          </Box>
        );
    }
  };

  const redirectTo = (model: string, id: number) => {
    switch (model) {
      case 'asset':
        clear();
        navigate('/AssetDetails/' + id);
        break;
      case 'licence':
        clear();
        navigate('/License/' + id + '/Details');
        break;
      case 'user':
        clear();
        navigate('/Users/Details/' + id);
        break;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        border: 1,
        borderColor: 'secondary.main',
        width: '233px',
      }}
    >
      {results.length === 0 && <Box sx={{ textAlign: 'center' }}>No results</Box>}
      {results.length !== 0 && (
        <Box>
          {results.map((result) => {
            return (
              <Box
                key={result.model + result.id}
                onClick={() => redirectTo(result.model, result.id)}
              >
                <Box
                  sx={{
                    minHeight: '50px',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.30)',
                      color: 'secondary.main',
                      cursor: 'pointer',
                    },
                  }}
                >
                  {displayModel(result)}
                </Box>
                <Divider />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default ResultList;
