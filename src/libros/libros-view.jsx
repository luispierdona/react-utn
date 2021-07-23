import React from 'react';
import LibrosTable from './libros-table';
import LibrosTableTopbar from './libros-table-topbar';
import { Container } from 'react-bootstrap';

function LibrosView() {

  return (
    <>
      <Container>
        <LibrosTableTopbar />
        <LibrosTable />
      </Container>
    </>
  );
}

export default LibrosView;