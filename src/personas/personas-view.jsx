import React from 'react';
import PersonasTable from './personas-table';
import PersonasTableTopbar from './personas-table-topbar';
import { Container } from 'react-bootstrap';

function PersonasView() {

  return (
    <>
      <Container>
        <PersonasTableTopbar />
        <PersonasTable />
      </Container>
    </>
  );
}

export default PersonasView;