import React from 'react';
import { TableCell } from '@material-ui/core';

const renderTableCells = (playerRow, labelId) => {
  let {
    player_bio,
    player_id,
    current_position,
    total,
    total_strokes,
  } = playerRow;

  let { first_name, last_name, country } = player_bio;
  let playerName = `${last_name}, ${first_name}`;

  return (
    <span>
      <TableCell component='th' id={labelId} scope='row' padding='none'>
        {playerName}
      </TableCell>
      <TableCell align='right'>{country}</TableCell>
      <TableCell align='right'>{current_position}</TableCell>
      <TableCell align='right'>{total}</TableCell>
      <TableCell align='right'>{total_strokes}</TableCell>
    </span>
  );
};

export default renderTableCells;
