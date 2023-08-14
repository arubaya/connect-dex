import React from 'react';

import { getComparator, handleSearchChange } from './services';
import EnhancedTableHead from './EnhancedTableHead';
import {
  alpha,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { CustomTableProps } from './Table';

export default function CustomTable<DataType>(
  props: CustomTableProps<DataType>
) {
  const {
    dataList,
    columnList,
    searchBy,
    searchLabel,
    renderRow,
    isSearchable,
  } = props;
  const [order, setOrder] = React.useState<'desc' | 'asc'>('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [list, setList] = React.useState(dataList);
  const [searchInput, setSearchInput] = React.useState('');

  React.useEffect(() => {
    setList(dataList);
  }, [dataList]);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataList.length) : 0;

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {isSearchable ? (
        <TextField
          label={searchLabel ? searchLabel : 'Label'}
          value={searchInput}
          margin="normal"
          size="small"
          sx={{ maxWidth: '280px', marginBottom: '15px' }}
          autoComplete="off"
          onChange={(e) =>
            handleSearchChange({
              dataList,
              input: e.target.value,
              setList,
              setPage,
              setSearchInput,
              searchBy: searchBy as string,
            })
          }
        />
      ) : null}
      <Box sx={{ width: '100%' }}>
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            mb: 2,
            border: (theme) =>
              `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 100 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                columnList={columnList}
              />
              <TableBody>
                {list
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => renderRow(row))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[
              5,
              10,
              25,
              list.length <= 50 ? { label: 'All', value: list.length } : 50,
            ]}
            component="div"
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
}
