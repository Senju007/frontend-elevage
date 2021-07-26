import React, { useState, useEffect } from "react";
import ElevageDataService from "../../services/ElevageServices";
import { Switch, Route, Link } from "react-router-dom";
import { Button , Input , Checkbox, Icon, Table , Divider, Form, Grid, Segment ,Modal , Header, Image} from 'semantic-ui-react'
import "./elevageList.css";

const ElevagesList1 = () => {
  const [elevage, setElevage] = useState([]);
  const [currentElevage, setCurrentElevage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchNom, setSearchNom] = useState("");
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    retrieveElevage();
  }, []);

  const onChangeSearchNom = e => {
    const searchNom = e.target.value;
    setSearchNom(searchNom);
  };

  const retrieveElevage = () => {
    ElevageDataService.getAll()
      .then(response => {
        setElevage(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveElevage();
    setCurrentElevage(null);
    setCurrentIndex(-1);
  };

  const setActiveElevage = (elevage, index) => {
    setCurrentElevage(elevage);
    setCurrentIndex(index);
  };

  const removeAllElevage = () => {
    ElevageDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByNom = () => {
    ElevageDataService.findByNom(searchNom)
      .then(response => {
        setElevage(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="elevageList">
      <div className="col-md-6">00
        <div className="input-group mb-3">
          <Input icon='users' iconPosition='left' placeholder='Search by Nom...'  value={searchNom} onChange={onChangeSearchNom} />
          <div className="input-group-append">
            <Button secondary onClick={findByNom}>
               Search
            </Button>
          </div>
        </div>
      </div>
        <div className="col-md-12">

        <Segment placeholder>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
             <h4>Liste des Elevage </h4>

                <Table unstackable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Id</Table.HeaderCell>
                      <Table.HeaderCell>Nom</Table.HeaderCell>
                      <Table.HeaderCell>Prenoms</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                  {elevage &&
                    elevage.map((elevage, index) => (
                    <Table.Row>
                      <Table.Cell>{elevage.id}</Table.Cell>
                      <Table.Cell>{elevage.type}</Table.Cell>
                      <Table.Cell>{elevage.nb_poulet}</Table.Cell>
                      <Table.Cell><Button primary  onClick={() => setActiveElevage(elevage, index)}
                        key={index}>Details </Button></Table.Cell>
                    </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
            <div className="col-md-6  col-sm-6  col-xs-2">
                  {currentElevage ? (
                    <div>
                      <h4>Elevage</h4>
                      <div>
                        <label>
                          <strong>Nom:</strong>
                        </label>{" "}
                        {currentElevage.date_debut}
                      </div>
                      <div>
                        <label>
                          <strong>Prenoms:</strong>
                        </label>{" "}
                        {currentElevage.id}
                      </div>
                      <div>
                        <label>
                          <strong>Cin:</strong>
                        </label>{" "}
                        {currentElevage.etat}
                      </div>
                      <div>
                        <label>
                          <strong>Adresse:</strong>
                        </label>{" "}
                        {currentElevage.type}
                      </div>
                      <div>
                        <label>
                          <strong>Tel:</strong>
                        </label>{" "}
                        {currentElevage.nb_poulet}
                      </div>


                      <Link
                        to={"/elevage/" + currentElevage.id}
                        className="badge badge-warning"
                      >
                        Edit
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <br />
                      <p>Please click on a Elevage...</p>
                    </div>
                  )}
                </div>
            </Grid.Column>
          </Grid>

           <Divider vertical></Divider>
       </Segment>


        </div>
      </div>
  );
};

export default ElevagesList1;