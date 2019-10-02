import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
} from '@material-ui/core';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import playerData from '../../leaderboard-data.json';

const getPlayerArray = (data) => {
  let { players } = data.leaderboard;
  return players;
};

function desc(a, b) {
  let order = 'total';

  if (b[order] < a[order]) {
    return 1;
  }
  if (b[order] > a[order]) {
    return -1;
  }

  if (b[order] === a[order]) {
    let playerName = `${b.player_bio.last_name}, ${b.player_bio.first_name}`;
    let compName = `${a.player_bio.last_name}, ${a.player_bio.first_name}`;
    if (playerName < compName) {
      return -1;
    }

    if (playerName > compName) {
      return 1;
    }
    return 0;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  debugger;
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  checkBox: {
    color: '#fff',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  let { playerRows, setRows } = props;
  let rows = playerRows;
  const classes = useStyles();
  // const [rows, setRows] = useState(playerRows);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('score');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      let playerArray = getPlayerArray(playerData);
      const newSelects = playerArray.map((n) => n.player_id);
      setSelected(newSelects);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleDelete = (selectRows) => {
    let newSelected = rows.filter((row) => {
      debugger;
      let { player_id } = row;
      return !selectRows.includes(player_id);
    });

    setRows(newSelected);
    setSelected([]);
  };
  const handleEdit = (selected) => {
    console.log('Edit Mode');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar
          numSelected={selected.length}
          selectedRows={selected}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
          >
            <TableHeader
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((playerRow, index) => {
                  let {
                    player_bio,
                    player_id,
                    current_position,
                    total,
                    total_strokes,
                  } = playerRow;
                  let { first_name, last_name, country } = player_bio;
                  let playerName = `${last_name}, ${first_name}`;
                  const isItemSelected = isSelected(player_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, player_id)}
                      onDoubleClick={handleEdit}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={player_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                      >
                        {playerName}
                      </TableCell>
                      <TableCell align='right'>{country}</TableCell>
                      <TableCell align='right'>{current_position}</TableCell>
                      <TableCell align='right'>{total}</TableCell>
                      <TableCell align='right'>{total_strokes}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
