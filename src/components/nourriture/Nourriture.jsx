import React, { useState, useEffect } from "react";
import NourritureDataService from "../../services/NourritureServices";
import {
  CalendarToday,
  PermIdentity,
  PhoneAndroid,
  Publish,
  ToggleOn,
  Pets,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./nourriture.css";
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Nourriture = props => {
  const initialNourritureState = {
    id: null,
    date_debut: "",
    date_fin: "",
    quantité_journalière:"",
    quantité_total: "",
    prix: "",
    etat: "",
    details: "",
    poids_estimé:"",
    poids_relevé: "",
    observation:""
  };
  const [currentNourriture, setCurrentNourriture] = useState(initialNourritureState);
  const [message, setMessage] = useState("");
  const classes = useStyles();

  const [state, setState] = React.useState({
    type: 'Poulet de chair',
    etat: 'En cours',
  });

  const handleChangeEtat = (event) => {
    const etat = event.target.etat;
    setState({
      ...state,
      [etat]: event.target.value,
    });
    
  };


  const getNourriture = id => {
    NourritureDataService.get(id)
      .then(response => {
        setCurrentNourriture(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getNourriture(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentNourriture({ ...currentNourriture, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentNourriture.id,
      prix: currentNourriture.prix,
      etat: currentNourriture.etat,
    };

    NourritureDataService.update(currentNourriture.id, data)
      .then(response => {
        setCurrentNourriture({ ...currentNourriture, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div className="nourriture">
      {currentNourriture ? (

        <div className="edit-form">
          <div className="nourritureTitleContainer">
            <h1 className="nourritureTitle">Details </h1>
            <Link to="/newNourriture">
              <button className="nourritureAddButton">Ajouter</button>
            </Link>
          </div>
          <form>
            <div className="nourritureContainer">
              <div className="nourritureShow">
                <div className="nourritureShowTop">
                  <div className="nourritureShowTopTitle">
                    <span className="nourritureShowUsername">Nourriture N: {currentNourriture.id}</span>
                  </div>

                </div>

                <div className="nourritureShowBottom">
                  <span className="nourritureShowTitle">Details</span>
                  <div className="nourritureShowInfo">
                    <PermIdentity className="nourritureShowIcon" />
                    <span className="nourritureShowInfoTitle">Etat : {currentNourriture.etat}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <CalendarToday className="nourritureShowIcon" />
                    <span className="nourritureShowInfoTitle">Debut : {currentNourriture.date_debut}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <CalendarToday className="nourritureShowIcon" />
                    <span className="nourritureShowInfoTitle">Fin : {currentNourriture.date_fin}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Elevage N : {currentNourriture.elevage}</span>
                  </div>
                  <span className="nourritureShowTitle">Plus de details</span>
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Qte journaliere : {currentNourriture.quantité_journalière} g</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Qte total : {currentNourriture.quantité_total} g</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Prix total : {currentNourriture.prix}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Poid estimé : {currentNourriture.poids_estimé}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Poid prelevé : {currentNourriture.poids_prelevé}</span>
                  </div>
                </div>
              </div>


              <div className="nourritureUpdate">
                <span className="nourritureUpdateTitle">Modifier</span>
                <form className="nourritureUpdateForm">
                  <div className="nourritureUpdateLeft">
                    <div className="nourritureUpdateItem">
                       <label htmlFor="cin">Prix total (Ar)</label>
                        <input
                         type="text"
                         className="form-control"
                         id="nb_poulet"
                         required
                         value={currentNourriture.prix}
                         onChange={handleInputChange}
                         name="nb_poulet"
                        />
                   </div>

                   <div className="nourritureUpdateItem">
                      <label>Etat</label>
                      <NativeSelect
                        value={currentNourriture.etat}
                        onChange={handleChangeEtat}
                        name="type"
                        id="type"
                        inputProps={{
                          type: 'etat',
                          id: 'name-native-disabled',
                        }}
                      >
                        <option value="">Choisir</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminer">Terminer</option>
                      </NativeSelect>

          </div>
                    


                  </div>
                  <div className="nourritureUpdateRight">



                  </div>
                </form>
              </div>
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

export default withRouter(Nourriture);