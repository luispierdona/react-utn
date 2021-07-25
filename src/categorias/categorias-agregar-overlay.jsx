import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { getCategorias, saveCategoria } from '../service/categorias-service';

function CategoriasAgregarOverlay(props) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const categoriaToSave = useSelector(state => state.categorias.categoriaToSave);

  function handleChangeForm(evt) {
    const value = evt.target.value;
    const categoria = {
      ...categoriaToSave,
      [evt.target.name]: value
    };
    dispatch({ type: 'CATEGORIA_TO_SAVE', categoriaToSave: categoria });
  }

  const handleSaveForm = async () => {
    try {

      const saveCategoriaResponse = await saveCategoria(categoriaToSave);
      const getCategoriasResponse = await getCategorias();

      dispatch({ type: 'LISTAR_CATEGORIAS', categoriasList: getCategoriasResponse.data });
      dispatch({ type: 'CATEGORIA_TO_SAVE', categoriaToSave: { } });

      addToast(saveCategoriaResponse?.data?.Respuesta, { appearance: 'success', autoDismiss: true });
      props.onHide();
    } catch (e) {
      // Informar al usuario que no se pudo borrar
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
      <Modal.Header className="text-light bg-dark">
        <Modal.Title id="contained-modal-title-vcenter">
          {categoriaToSave?.id ?
            <h3>Editar Categoria/Genero</h3>
            : <h3>Agregar Nueva Categoria/Genero</h3>
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Suspenso, Policial, Novela, Terror, ..."
                  name="nombre"
                  defaultValue={categoriaToSave?.nombre}
                  onChange={handleChangeForm}
                />
              </Form.Group>
            </Row>
          </Form>

        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveForm}>Agregar</Button>
        <Button variant="outline-danger" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoriasAgregarOverlay;