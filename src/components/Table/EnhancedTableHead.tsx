import * as React from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { EnhancedTableHeadProps } from './Table';

export default function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { order, orderBy, onRequestSort, columnList } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columnList.map((headCell) =>
          headCell.disableSort ? (
            <TableCell
              key={headCell.dataId}
              align={headCell.isNumeric ? 'right' : 'left'}
              sx={{
                minWidth: headCell.minWidth,
                width: headCell.width ? headCell.width : 0,
              }}
            >
              {headCell.label}
            </TableCell>
          ) : (
            <TableCell
              key={headCell.dataId}
              align={headCell.isNumeric ? 'right' : 'left'}
              sortDirection={orderBy === headCell.dataId ? order : false}
              sx={{
                minWidth: headCell.minWidth,
                width: headCell.width ? headCell.width : 0,
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.dataId}
                direction={orderBy === headCell.dataId ? order : 'asc'}
                onClick={createSortHandler(headCell.dataId)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}
