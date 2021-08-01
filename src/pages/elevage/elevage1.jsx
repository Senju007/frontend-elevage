import React, { useState, useEffect } from "react";
import ElevageDataService from "../../services/ElevageServices";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  ToggleOn,
  Pets,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./elevage.css";
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

  const handleChangeType = (event) => {
    const type = event.target.type;
    setState({
      ...state,
      [type]: event.target.value,
    });
  };


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
    getElevage(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentElevage({ ...currentElevage, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentElevage.id,
      date_debut: currentElevage.date_debut,
      nb_poulet: currentElevage.nb_poulet,
      type: currentElevage.type,
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
    <div className="elevage">
      {currentElevage ? (

        <div className="edit-form">
          <div className="elevageTitleContainer">
            <h1 className="elevageTitle">Edit Elevage</h1>
            <Link to="/newElevage">
              <button className="elevageAddButton">Create</button>
            </Link>
          </div>
          <form>
            <div className="elevageContainer">
              <div className="elevageShow">
                <div className="elevageShowTop">
                  <div className="elevageShowTopTitle">
                    <span className="elevageShowUsername">Elevage N: {currentElevage.id}</span>
                  </div>

                </div>

                <div className="elevageShowBottom">
                  <span className="elevageShowTitle">Details</span>
                  <div className="elevageShowInfo">
                    <PermIdentity className="elevageShowIcon" />
                    <span className="elevageShowInfoTitle">{currentElevage.type}</span>
                  </div>
                  <div className="elevageShowInfo">
                    <CalendarToday className="elevageShowIcon" />
                    <span className="elevageShowInfoTitle">{currentElevage.date_debut}</span>
                  </div>
                  <span className="elevageShowTitle">Plus de details</span>
                  <div className="elevageShowInfo">
                    <Pets className="elevageShowIcon" />
                    <span className="elevageShowInfoTitle">{currentElevage.nb_poulet}</span>
                  </div>
                  <div className="elevageShowInfo">
                    <ToggleOn className="elevageShowIcon" />
                    <span className="elevageShowInfoTitle">{currentElevage.etat}</span>
                  </div>
                </div>
              </div>


              <div className="elevageUpdate">
                <span className="elevageUpdateTitle">Edit</span>
                <form className="elevageUpdateForm">
                  <div className="elevageUpdateLeft">
                    <div className="elevageUpdateItem">
                      <label>Type</label>
                      <NativeSelect
                        value={state.name}
                        onChange={handleChangeType}
                        inputProps={{
                          type: 'type',
                          id: 'name-native-disabled',
                        }}
                      >
                        <option value="">None</option>
                        <option value="Poule pondeuse">Poule pondeuse</option>
                        <option value="poulet de chair">Poulet de chair</option>
                      </NativeSelect>


                    </div>
                    <div className="elevageUpdateItem">
                      <label>Date debut</label>
                      <input
                        type="text"
                        placeholder="..."
                        className="elevageUpdateInput"
                      />
                    </div>
                    <div className="elevageUpdateItem">
                      <label>Nombre de poulet</label>
                      <input
                        type="text"
                        placeholder="..."
                        className="elevageUpdateInput"
                      />
                    </div>
                    <div className="elevageUpdateItem">
                      <label>Etat</label>
                      <NativeSelect
                        value={state.name}
                        onChange={handleChangeEtat}
                        inputProps={{
                          etat: 'etat',
                          id: 'name-native-disabled',
                        }}
                      >
                        <option value="">None</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminer">Terminer</option>
                      </NativeSelect>
                    </div>
                  </div>
                  <div className="elevageUpdateRight">
                    <button className="elevageUpdateButton">Update</button>
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

export default withRouter(Elevage1);