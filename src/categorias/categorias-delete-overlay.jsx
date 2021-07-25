import React from 'react';
import { Modal, Button, Container, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { borrarCategoria, getCategorias } from '../service/categorias-service';

function CategoriasDeleteOverlay(props) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const categoriaToDelete = useSelector(state => state.categorias.categoriaToDelete);

  const handleSubmit = async () => {
    try {
      const id = categoriaToDelete?.id;
      const deleteResponse = await borrarCategoria(id);
      const getCategoriasResponse = await getCategorias();
      
      dispatch({ type: 'LISTAR_CATEGORIAS', categoriasList: getCategoriasResponse.data });
      dispatch({ type: 'DELETE_CATEGORIA', categoriaToDelete: { } });

      addToast(deleteResponse?.data?.msg, { appearance: 'success', autoDismiss: true });
      props.onHide();
    } catch (e) {
      console.log(e.message);
      addToast(e.request.response, { appearance: 'error', autoDismiss: true });
      props.onHide();
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="text-light bg-danger">
        <Modal.Title id="contained-modal-title-vcenter">
          Borrar Categoria
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea borrar el siguiente registro?
        </p>
        <Container>
          <Row className="mb-3">
            <Col md="6">
              <span><b>Genero: </b>{categoriaToDelete?.nombre}</span>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={ handleSubmit } >Borrar</Button>
        <Button variant="primary" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );

}

export default CategoriasDeleteOverlay;