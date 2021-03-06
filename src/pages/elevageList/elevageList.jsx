import "./elevageList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ElevageDataService from "../../services/ElevageServices";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';


export default function ElevageList() {
  const [elevage, setElevage] = useState([]);
  const [currentElevage, setCurrentElevage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [open, setOpen] = React.useState(false)
  const [id , setId] = useState(null);

  useEffect(() => {
    retrieveElevage();
  }, []);

  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };


  const setActiveElevage = (elevage, index) => {
    setCurrentElevage(elevage);
    setCurrentIndex(index);
  };

  const refreshList = () => {
    retrieveElevage();
    setCurrentElevage(null);
    setCurrentIndex(-1);
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


  const deleteElevage = (id) => {
    ElevageDataService.remove(id)
      .then(response => {
        console.log(response.data);
        handleClose();
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };


  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "date_debut", headerName: "Date de debut", width: 200 },
    {
      field: "nb_poulet",
      headerName: "Nombre poulet",
      width: 200,
    },
    {
      field: "type",
      headerName: "Type",
      width: 160,
    },
    {
      field: "etat",
      headerName: "Etat",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,

      renderCell: (params, index) => {
        return (
          <>
            <Link to={"/elevage/" + params.row.id}>
              <button className="elevageListEdit" onClick={() => setActiveElevage(params, index)} key={params.row.id}>Bilan</button>
            </Link>

            <DeleteOutline
              className="elevageListDelete"

              //onClick={() => deleteElevage(params.row.id)}
              onClick={() => handleClickOpen(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    
    <div className="elevageList">
      <Link to="/newElevage">
              <button className="elevageAddButton">Ajouter</button>
            </Link>
      <DataGrid
        rows={elevage}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
      />


<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmer la suppression"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Alert Alert variant="filled" severity="warning"> Vous voulez vraiment effacer cette element ??</Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={() => deleteElevage(id)} color="primary" autoFocus>
            Poursuivre
          </Button>
        </DialogActions>
      </Dialog>


    </div>
    
  );
}
