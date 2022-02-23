import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/';
import React from 'react';
import { useStateValue } from "../state";
import { Electricity } from '../types';
import ElectricityTableRow from './ElectricityTableRow';

//simple table for electricity list
//supports both weekly and monthly data

const ElectricityTable = () => {
  const [{electricities},] = useStateValue();

  return (
    <div className="electricity-list">

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Period</TableCell>
            <TableCell>Reporting Group</TableCell>
            <TableCell>Location Name</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(electricities).map((count: Electricity, i: number ) => (
            <ElectricityTableRow key={i} {...count}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default ElectricityTable;