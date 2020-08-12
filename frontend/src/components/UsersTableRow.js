import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { Delete, Refresh } from '@material-ui/icons';
import React, { Component } from 'react';


class RequisitionTableRow extends Component {

  render() {
    const { id, name, username, role } = this.props;

    return (
      <TableRow>
        <TableCell>{name}</TableCell>
        <TableCell>{username}</TableCell>
        <TableCell>{role}</TableCell>
        <TableCell>
          <IconButton aria-label="Reset password" >
            <Refresh />
          </IconButton>
          <IconButton aria-label="Delete" >
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

export default RequisitionTableRow;