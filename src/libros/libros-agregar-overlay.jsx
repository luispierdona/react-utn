import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { saveLibro, getLibros } from '../service/libros-service';

function LibrosAgregarOverlay(props) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const libroToSave = useSelector(state => state.libros.libroToSave);
  const categorias = useSelector(state => state.categorias.categoriasList);
  const personas = useSelector(state => state.personas.personasList);

  function handleChangeForm(evt) {
    const value = evt.target.value;
    const libro = {
      ...libroToSave,
      [evt.target.name]: value
    };
    dispatch({ type: 'LIBRO_TO_SAVE', libroToSave: libro });
  }

  const handleSaveForm = async () => {
    try {

      const saveLibroResponse = await saveLibro(libroToSave);
      const getLibrosResponse = await getLibros();

      dispatch({ type: 'LISTAR_LIBROS', librosList: getLibrosResponse.data });
      dispatch({ type: 'LIBRO_TO_SAVE', libroToSave: {} });

      addToast(saveLibroResponse?.data?.Respuesta, { appearance: 'success', autoDismiss: true });
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
          {libroToSave.id ? 
          <h3>Editar Libro</h3>
          : <h3>Agregar Nuevo Libro</h3>
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
                  placeholder="Nombre"
                  name="nombre"
                  defaultValue={libroToSave?.nombre}
                  onChange={handleChangeForm}
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationApellido">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripcion"
                  name="descripcion"
                  defaultValue={libroToSave?.descripcion}
                  onChange={handleChangeForm}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationEmail">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Categoria"
                  name="categoria_id"
                  defaultValue={libroToSave?.categoria_id}
                  onChange={handleChangeForm}
                >
                  <option value="null">Elija una opcion...</option>
                  {categorias.map((row, index) => (
                    <option key={index} value={row.id}>{row.nombre}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationAlias">
                <Form.Label>Persona</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Persona"
                  name="persona_id"
                  defaultValue={libroToSave?.persona_id}
                  onChange={handleChangeForm}
                >
                  <option value="null">Elija una opcion...</option>
                  {personas.map((row, index) => (
                    <option key={index} value={row.id}>{row.nombre} {row.apellido}</option>
                  ))}
                </Form.Control>
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

export default LibrosAgregarOverlay;