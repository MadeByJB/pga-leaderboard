import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import EditIcon from '@material-ui/icons/Edit';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  custom: {
    backgroundColor: '#1976d2',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: '#4caf50',
          backgroundColor: lighten('#4caf50', 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const TableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, selectedRows, handleDelete, handleEdit } = props;

  return (
    <Toolbar
      className={clsx(classes.root, classes.custom, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color='inherit' variant='subtitle1'>
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant='h6' id='tableTitle'>
            PGA Leaderboard
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <div>
            <Tooltip title='Delete'>
              <IconButton
                aria-label='delete'
                onClick={() => {
                  handleDelete(selectedRows);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            {/* TODO: Enable editMode based on selected rows */}
            {/* <Tooltip title='Edit'>
              <IconButton
                aria-label='edit'
                onClick={() => {
                  handleEdit(selectedRows);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip> */}
          </div>
        ) : (
          // TODO: Enable name-based search
          <Tooltip title='Filter list'>
            <IconButton aria-label='filter list'>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default TableToolbar;
