import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import other from './other';
export default function WithMultipleCheckboxes() {
  
  const [datatable, setDatatable] = React.useState({

    columns: [
      {
        label: 'Name',
        field: 'name',
        width: 150,
        attributes: {
          'aria-controls':'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Position',
        field: 'position',
        width: 270,
      },
      {
        label: 'Office',
        field: 'office',
        width: 200,
      },
      {
        label: 'Age',
        field: 'age',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Start date',
        field: 'date',
        sort: 'disabled',
        width: 150,
      },
      {
        label: 'Salary',
        field: 'salary',
        sort: 'disabled',
        width: 100,
      },
    ],
    rows: [
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: '61',
        date: '2011/04/25',
        salary: '$320',
      },
      {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        age: '63',
        date: '2011/07/25',
        salary: '$170',
      },
      {
        name: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        age: '66',
        date: '2009/01/12',
        salary: '$86',
      },
      {
        name: 'Cedric Kelly',
        position: 'Senior Javascript Developer',
        office: 'Edinburgh',
        age: '22',
        date: '2012/03/29',
        salary: '$433',
      },
    ],
  });
  const [checkbox1, setCheckbox1]=React.useState([]);
  const showLogs2 = (e) => {
    setCheckbox1(e);
    console.log('single_event=>',e);
  };
  console.log('checkbox=>',checkbox1);
  return (
    <>
      <MDBDataTableV5
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={datatable}
        checkbox
        headCheckboxID='id6'
        bodyCheckboxID='checkboxes6'
        getValueCheckBox={(e) => {
         
        showLogs2(e);
        console.log('log_event=>',e);
        }}
        getValueAllCheckBoxes={(e) => {
        showLogs2(e);
        }}
        multipleCheckboxes
      />

      {/* <other>
        {' '}
        {checkbox1 && (
          <p>
            {JSON.stringify(
              checkbox1.map((e) => {
                console.log(e);
                delete e.checkbox;
                return e;
              }) && checkbox1
            )}
          </p>
        )}
      </other> */}

    </>
  );
}