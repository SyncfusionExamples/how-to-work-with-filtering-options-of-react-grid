import React, { useState, useEffect } from 'react';
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Page,
  Filter,
  Inject,
  FilterSettingsModel,
  Grid
} from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import data from './dataSource.json';
import './App.css';
import { DataUtil } from '@syncfusion/ej2-data';

const App: React.FC = () => {
  const filterSettings: FilterSettingsModel = {
    ignoreAccent: true,
    //type: 'Menu',
    // columns: [
    //   { field: 'CustomerID', operator: 'startswith', value: 'J' },
    //   { field: 'CustomerID', operator: 'endswith', value: 'N' }
    // ]
  };

  function filterTemplate(props: any) {
    const countries = DataUtil.distinct(data, 'ShipCountry') as string[];
    return (<DropDownListComponent dataSource={countries} change={onChange} />);
  }

  let grid: Grid | null = null;
  function onChange(args: any) {
    grid && grid.filterByColumn('ShipCountry', 'equal', args.value)
  }

  return (
    <div style={{ margin: '10%', marginTop: '5%' }}>
      <GridComponent dataSource={data}
        ref={g => grid = g}
        allowPaging={true}
        allowFiltering
        filterSettings={filterSettings}
        pageSettings={{ pageSize: 6 }}
      >
        <ColumnsDirective>
          <ColumnDirective field='OrderID' headerText='Invoice ID' textAlign='Right' width='100' isPrimaryKey={true} />
          <ColumnDirective field='CustomerID' headerText='Customer ID' width='150' />
          <ColumnDirective field='ShipCountry' filterTemplate={filterTemplate} headerText='Ship Country' />
          <ColumnDirective field='ShipName' headerText='Ship Name' />
          <ColumnDirective field='Freight' textAlign='Right' format='C2' width='100' />
        </ColumnsDirective>
        <Inject services={[Page, Filter]} />
      </GridComponent>
    </div>
  );
}

export default App;