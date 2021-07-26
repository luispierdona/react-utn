import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Modal, Button } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { prestarLibro, getLibros } from '../service/libros-service';

function LibrosPrestarOverlay(props) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const personas = useSelector(state => state.personas.personasList);
  const personaPrestarLibro = useSelector(state => state.libros.personaPrestarLibro);
  const libroToSave = useSelector(state => state.libros.libroToSave);

  function handleChangeForm(evt) {
    const value = evt.target.value;
    const persona = {
      [evt.target.name]: value
    };
    dispatch({ type: 'PERSONA_PRESTAR_LIBRO', personaPrestarLibro: {persona: persona, libroToSave: libroToSave} });
  }

  const handleSaveForm = async () => {
    try {
      const personaId = personaPrestarLibro.persona.persona_id;
      const libroId = personaPrestarLibro.libroToSave.id;
      const libroPrestar = await prestarLibro(personaId, libroId);
      const getLibrosResponse = await getLibros();

      dispatch({ type: 'LISTAR_LIBROS', librosList: getLibrosResponse.data });
      dispatch({ type: 'PERSONA_PRESTAR_LIBRO', personaPrestarLibro: { } });

      addToast(libroPrestar?.data?.Respuesta, { appearance: 'success', autoDismiss: true });
      props.onHide();
    } catch (error) {
      console.log(error.message);
      addToast(error.request.response, { appearance: 'error', autoDismiss: true });
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
          Prestar Libro
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationAlias">
                <Form.Label>Persona</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Persona"
                  name="persona_id"
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

export default LibrosPrestarOverlay;