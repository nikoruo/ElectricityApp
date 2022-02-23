import React from "react";
import axios from "axios";
import { Form, Formik } from 'formik';
import {Button, RadioGroup, Radio, FormControl, FormControlLabel, FormLabel} from '@mui/material/';

import { Electricity } from "../types";
import { apiBaseUrl } from "../constants";
import { setElectricityItemList, useStateValue } from "../state";

//this can be expanded easily, as of right now, theres only
//two options "Weekly" (that does nothing) and "Monthly", that
//fetches monthly data from backend

//this would be the location for date range picker
//in case we wanted to allow the user to decide the start and end dates

const OptionBar = () => {
    const [, dispatch] = useStateValue();

    //fetch electricity usage list from backend
    const fetchElectricityList = async (period: string) => {
        try {
          const { data: electricityListFromApi } = await axios.get<Electricity[]>(
            `${apiBaseUrl}/${period}`
          );
          dispatch(setElectricityItemList(electricityListFromApi));
        } catch (e) {
          console.error(e);
        }
      };

    return (
        <div>
            <Formik
             initialValues= {{
                period: 'Monthly',
              }}
              onSubmit= {({period}) => {
                void fetchElectricityList(period);
              }}
            >
                {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Period</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={values.period}
                    onChange={handleChange}
                    value={values.period}
                    name="period"
                >
                    <FormControlLabel value="Weekly" control={<Radio />} label="Weekly" />
                    <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
                </RadioGroup>
                <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth type="submit"
                    >
                    Fetch
                </Button>
            </FormControl>            
          </Form>)}</Formik>
        </div>
    );
};

export default OptionBar;