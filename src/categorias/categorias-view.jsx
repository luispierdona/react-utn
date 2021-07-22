import React from 'react';
import CategoriasTable from './categorias-table';
import CategoriasTableTopbar from './categorias-table-topbar';
import { Container } from 'react-bootstrap';

function CategoriasView() {

  return (
    <>
      <Container>
        <CategoriasTableTopbar />
        <CategoriasTable />
      </Container>
    </>
  );
}

export default CategoriasView;