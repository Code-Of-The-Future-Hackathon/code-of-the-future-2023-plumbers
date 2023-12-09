c
import React from 'react';
import { Stack } from '@mui/material';
 
import FilterGreenspaces from './FilterGreenSpaces';
//import AreasOfPublicUseGroups from './AreasOfPublicUseGroups';
//import ShowCurrentZonesButton from './ShowCurrentZonesButton';
//import AreasOfPublicUseTable from './AreasOfPublicUseTable';

const GreenSpaces = () => {
   
    return (
      <Stack
        direction={'column'}
        spacing={2}
        sx={{
          margin: '5rem 2rem',
          width: '100%',
          padding: '8px 16px',
        }}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <AreasOfPublicUseForm getNewRecords={getNewRecords} />
        <FilterGreenspaces
          filterName={filterName}
          setFilterName={setFilterName}
          filterArea={filterArea}
          setFilterArea={setFilterArea}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
        <AreasOfPublicUseGroups
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          groups={groups}
          getNewGroups={getNewGroups}
        />
        <ShowCurrentZonesButton records={filteredRecords} />
        <AreasOfPublicUseTable
          records={filteredRecords}
          groups={groups}
          getNewRecords={getNewRecords}
        />
      </Stack>
     
  );
};

export default GreenSpaces;
