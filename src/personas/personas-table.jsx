import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container, FormGroup, FormControl, Row, Col, Button, Alert } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import VerLibrosByPersona from './personas-verLibros-overlay';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function PersonasTable() {
  const personasRow = useSelector(state => state.personas.personasList);
  const librosByPersona = useSelector(state => state.personas.librosByPersona);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      try {
        const respuesta = await axios.get('http://localhost:3000/personas');
        dispatch({ type: 'LISTAR_PERSONAS', personasList: respuesta.data });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(personasRow);
  }, [personasRow]);

  const handleChange = async (id) => {
    try {
      const respuesta = await axios.get('http://localhost:3000/librosByPersona/' + id);
      dispatch({ type: 'LIBROS_BY_PERSONA', librosByPersona: respuesta.data });
    } catch (error) {
      console.log(error);
    }
  };

  const [stateForm, setStateForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    alias: ""
  });

  function handleChangeForm(evt) {
    const value = evt.target.value;
    setStateForm({
      ...stateForm,
      [evt.target.name]: value
    });
  }

  useEffect(() => {
    console.log(stateForm);
  }, [stateForm]);

  const handleSaveForm = async () => {
    try {
      const serverResponse = await axios.post('http://localhost:3000/persona', stateForm);
      const respuesta = await axios.get('http://localhost:3000/personas');
      dispatch({ type: 'LISTAR_PERSONAS', personasList: respuesta.data });
    } catch (e) {
      // Informar al usuario que no se pudo borrar
      console.log(e);
    }
  };


  return (
    <>
      <Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Apellido</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Alias</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personasRow.map((row) => (
                <StyledTableRow key={row.id} onClick={(event) => handleChange(row.id)}>
                  <StyledTableCell component="th" scope="row">
                    {row.nombre}
                  </StyledTableCell>
                  <StyledTableCell>{row.apellido}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.alias}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton aria-label="delete" className={classes.margin}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Container>
        <form>
          {/* <FormGroup
            controlId="formBasicText"
          >
            <FormControl
              type="text"
              name="nombre"
              value={state.nombre}
              placeholder="Nombre"
              onChange={handleChangeForm}
            />
          </FormGroup> */}

          <FormGroup as={Row} className="mb-3 mt-3" controlId="formPlaintextEmail">
            <Col sm="6">
              <FormControl
                type="text"
                name="nombre"
                value={stateForm.nombre}
                placeholder="Nombre"
                onChange={handleChangeForm}
              />
            </Col>
            <Col sm="6">
              <FormControl
                type="text"
                name="apellido"
                value={stateForm.apellido}
                placeholder="Apellido"
                onChange={handleChangeForm}
              />
            </Col>
          </FormGroup>

          <FormGroup as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Col sm="6">
              <FormControl
                type="text"
                name="email"
                value={stateForm.email}
                placeholder="Email"
                onChange={handleChangeForm}
              />
            </Col>
            <Col sm="6">
              <FormControl
                type="text"
                name="alias"
                value={stateForm.alias}
                placeholder="Alias"
                onChange={handleChangeForm}
              />
            </Col>
          </FormGroup>

          <Button variant="primary" onClick={handleSaveForm}>
            Submit
          </Button>

        </form>
      </Container>


      {/* <VerLibrosByPersona
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
    </>
  );

}

export default PersonasTable;