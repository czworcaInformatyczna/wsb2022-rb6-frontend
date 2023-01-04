import { TableCell, TableRow, Typography } from '@mui/material';

interface IProps {
  even: boolean;
  keyWidth: number | string;
  name: string;
  value: JSX.Element | number | string;
  valueWidth: number | string;
}

const TableRowTemplate = (props: IProps) => {
  return (
    <TableRow
      sx={{
        borderBottom: 'none',
        backgroundColor: props.even ? 'background.paper' : 'background.default',
      }}
    >
      <TableCell component="th" scope="row" sx={{ width: props.keyWidth }}>
        <Typography fontWeight="bold">{props.name}</Typography>
      </TableCell>
      <TableCell align="left" sx={{ width: props.valueWidth }}>
        {props.value}
      </TableCell>
    </TableRow>
  );
};

export default TableRowTemplate;
