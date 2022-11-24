/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Stack } from '@mui/material';

import { apiClient } from 'lib/axios';
import { useRef, useState, useEffect } from 'react';
import { apiUrl } from 'routes';
import GenerateLabel from './GenerateLabel';
import { useReactToPrint } from 'react-to-print';
import { type GridSelectionModel } from '@mui/x-data-grid';

interface IProps {
  handleClose: () => void;
  id: GridSelectionModel | number;
}

const Labels = (props: IProps) => {
  const componentRef = useRef();
  const [labels, setLabels] = useState<JSX.Element[]>([]);
  useEffect(() => {
    if (typeof props.id === 'number') {
      const label = <GenerateLabel id={props.id} />;
      setLabels((prev) => [...prev, label]);
    } else {
      props.id.map((item) => {
        const label = <GenerateLabel id={Number(item)} />;
        setLabels((prev) => [...prev, label]);
      });
    }
  }, [props.id]);

  const handlePrint = useReactToPrint({
    content: () => (componentRef.current ? componentRef.current : null),
  });

  return (
    <Box height="600px" width="420px">
      <Box mt={1} height="50px">
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={handlePrint}>
            Print labels
          </Button>
          <Button variant="contained" color="error" onClick={props.handleClose}>
            Close
          </Button>
        </Stack>
      </Box>
      <Box ref={componentRef} height="500px" width="420px">
        {labels.map((lab, index) => {
          const result =
            index % 7 === 0 && index !== 0 ? (
              <>
                <Box height="120px">{lab}</Box>
                <div className="pagebreak" />
              </>
            ) : (
              <Box height="120px">{lab}</Box>
            );
          return <Box key={'Lab' + index}>{result}</Box>;
        })}
      </Box>
    </Box>
  );
};

export default Labels;
