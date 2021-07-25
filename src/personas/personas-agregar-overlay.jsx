import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { getPersonas, savePersona } from '../service/personas-service';

function PersonasAgregarOverlay(props) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const personaToSave = useSelector(state => state.personas.personaToSave);

  function handleChangeForm(evt) {
    const value = evt.target.value;
    const persona = {
      ...personaToSave,
      [evt.target.name]: value
    }
    dispatch({ type: 'PERSONA_TO_SAVE', personaToSave: persona });
  }

  const handleSaveForm = async () => {
    try {
      const savePersonaResponse = await savePersona(personaToSave);
      const getPersonasResponse = await getPersonas();

      dispatch({ type: 'LISTAR_PERSONAS', personasList: getPersonasResponse.data });
      dispatch({ type: 'PERSONA_TO_SAVE', personaToSave: { } });

      addToast(savePersonaResponse?.data?.Respuesta, { appearance: 'success', autoDismiss: true });
      props.onHide();
    } catch (error) {
      // Informar al usuario que no se pudo borrar
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
          {personaToSave?.id ?
            <h3>Editar Persona</h3>
            : <h3>Agregar Persona</h3>
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
                  defaultValue={personaToSave?.nombre}
                  onChange={handleChangeForm}
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apellido"
                  name="apellido"
                  defaultValue={personaToSave?.apellido}
                  onChange={handleChangeForm}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    defaultValue={personaToSave?.email}
                    onChange={handleChangeForm}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationAlias">
                <Form.Label>Alias</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Alias"
                  name="alias"
                  defaultValue={personaToSave?.alias}
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

export default PersonasAgregarOverlay;