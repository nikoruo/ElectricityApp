import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import ElectricityTableRow from './ElectricityTableRow'
import { Paper, Table, TableBody, TableContainer } from '@mui/material/';

//simple unit test, using Jest

describe('Table related tests', () => {
    test('row component renders with correct props', () => {
    const electricity = {
        period: 0,
        reportingGroup: "Test",
        locationName: "Jest",
        value: 100,
        unit: "kWh",
    }

    render(
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    <ElectricityTableRow {...electricity} />
                </TableBody>
            </Table>
        </TableContainer>
    )

    const element = screen.getByText('Test')
    expect(element).toBeDefined()
    })
})