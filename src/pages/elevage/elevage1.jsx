import React, { useState, useEffect } from "react";
import ElevageDataService from "../../services/ElevageServices";
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const Elevage1 = props => {
    const initialElevageState = {
      id: null,
      date_debut: "",
      nb_poulet: "",
      type: "",
      etat: "",
    };
    const [currentElevage, setCurrentElevage] = useState(initialElevageState);
    const [message, setMessage] = useState("");
  
    const getElevage = id => {
      ElevageDataService.get(id)
        .then(response => {
          setCurrentElevage(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    useEffect(() => {
      getElevage(180);
    }, [180]);
  
    const handleInputChange = event => {
      const { name, value } = event.target;
      setCurrentElevage({ ...currentElevage, [name]: value });
    };
  
    const updatePublished = status => {
      var data = {
        id: currentElevage.id,
        date_debut: currentElevage.date_debut,
        nb_poulet: currentElevage.nb_poulet,
        type:currentElevage.type,
        etat: currentElevage.etat,
      };
  
      ElevageDataService.update(currentElevage.id, data)
        .then(response => {
          setCurrentElevage({ ...currentElevage, published: status });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };


  return (
    <div>
    {currentElevage ? (
      <div className="edit-form">
        <h4>Proprietaire</h4>
        <form>
          <div className="form-group">
            <label htmlFor="nom">Title</label>
            <input
              type="text"
              className="form-control"
              id="nom"
              name="nom"
              value={currentElevage.nom}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="prenoms">Prenoms</label>
            <input
              type="text"
              className="form-control"
              id="prenoms"
              name="prenoms"
              value={currentElevage.prenoms}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cin">Cin</label>
            <input
              type="text"
              className="form-control"
              id="cin"
              name="cin"
              value={currentElevage.id}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adresse">Adresse</label>
            <input
              type="text"
              className="form-control"
              id="adresse"
              name="adresse"
              value={currentElevage.type}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tel">Telephone</label>
            <input
              type="text"
              className="form-control"
              id="tel"
              name="tel"
              value={currentElevage.nb_poulet}
              onChange={handleInputChange}
            />
          </div>


        </form>
        <p>{message}</p>
      </div>
    ) : (
      <div>
        <br />
        <p>Please click on a Proprietaire...</p>
      </div>
    )}
  </div>
);
};

export default withRouter(Elevage1);