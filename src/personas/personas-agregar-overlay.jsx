import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

function PersonasAgregarOverlay(props) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [validated, setValidated] = useState(false);

  const personaToSave = useSelector(state => state.personas.personaToSave);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    handleSaveForm();
  };

  const [stateForm, setStateForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    alias: ""
  });

  useEffect(() => {
    console.log(stateForm);
    dispatch({ type: 'PERSONA_TO_SAVE', personaToSave: stateForm });
  }, [stateForm]);

  function handleChangeForm(evt) {
    const value = evt.target.value;
    setStateForm({
      ...stateForm,
      [evt.target.name]: value
    });
  }

  const handleSaveForm = async () => {
    try {

      const serverResponse = await axios.post('http://localhost:3000/persona', personaToSave);
      
      const respuesta = await axios.get('http://localhost:3000/personas');
      dispatch({ type: 'LISTAR_PERSONAS', personasList: respuesta.data });

      dispatch({ type: 'PERSONA_TO_SAVE', personaToSave: {} });

      addToast(serverResponse?.data?.Respuesta, { appearance: 'success', autoDismiss: true });
      props.onHide();
    } catch (e) {
      // Informar al usuario que no se pudo borrar
      console.log(e.message);
      addToast(e.request.response, { appearance: 'error', autoDismiss: true });
      // props.onHide();
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
          Agregar Nueva Persona
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form validated={validated}>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  onChange={handleChangeForm}
                />
                <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Ingresa un nombre válido
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Apellido"
                  name="apellido"
                  onChange={handleChangeForm}
                />
                <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Ingresa un apellido válido
                </Form.Control.Feedback>
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
                    required
                    name="email"
                    onChange={handleChangeForm}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ingresa un email válido
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationAlias">
                <Form.Label>Alias</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Alias"
                  name="alias"
                  onChange={handleChangeForm}
                />
                <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Ingresa un alias válido
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <hr />
            <div className="float-right">
              <Button variant="primary" onClick={ handleSubmit } className="m-3">Agregar</Button>
              <Button variant="outline-danger" onClick={props.onHide} className="m-3">Cerrar</Button>
            </div>
          </Form>

        </Container>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>Agregar</Button>
        <Button variant="outline-danger" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default PersonasAgregarOverlay;