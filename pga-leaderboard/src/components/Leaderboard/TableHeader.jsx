import React from 'react';
import {
  TableHead,
  TableRow,
  TableSortLabel,
  TableCell,
  Checkbox,
} from '@material-ui/core';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Player Name',
  },
  { id: 'country', numeric: false, disablePadding: false, label: 'Country' },
  { id: 'position', numeric: true, disablePadding: false, label: 'POS' },
  { id: 'score', numeric: true, disablePadding: false, label: 'Score' },
  {
    id: 'total-strokes',
    numeric: true,
    disablePadding: false,
    label: 'Total Strokes',
  },
];

const TableHeader = (props) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all players' }}
          />
        </TableCell>
        {headCells.map((headCell) => {
          return (
            <TableCell
              key={headCell.id}
              align={headCell.id !== 'name' ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={order}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};



export default TableHeader;
