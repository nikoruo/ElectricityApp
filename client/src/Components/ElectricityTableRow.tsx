import { TableCell, TableRow } from '@mui/material/';
import React from 'react';
import { Electricity } from '../types';

//simple table row component for electricity list
//supports both weekly and monthly data

const ElectricityTableRow = (data: Electricity) => {

  return (
    <TableRow key={data.period}>
        <TableCell>{data.period}</TableCell>
        <TableCell>{data.reportingGroup}</TableCell>
        <TableCell>{data.locationName}</TableCell>
        <TableCell>{data.value}</TableCell>
        <TableCell>{data.unit}</TableCell>
    </TableRow>
  );
};

export default ElectricityTableRow;