import "./nourritureList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NourritureDataService from "../../services/NourritureServices";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';


export default function NourritureList() {
  const [nourriture, setNourriture] = useState([]);
  const [currentNourriture, setCurrentNourriture] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [open, setOpen] = React.useState(false)
  const [id , setId] = useState(null);

  useEffect(() => {
    retrieveNourriture();
  }, []);

  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };


  const setActiveNourriture = (nourriture, index) => {
    setCurrentNourriture(nourriture);
    setCurrentIndex(index);
  };

  const refreshList = () => {
    retrieveNourriture();
    setCurrentNourriture(null);
    setCurrentIndex(-1);
  };


  const retrieveNourriture = () => {
    NourritureDataService.getAll()
      .then(response => {
        setNourriture(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const deleteNourriture = (id) => {
    NourritureDataService.remove(id)
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
    {
      field: "elevage",
      headerName: "E",
      width: 90,
    },
    {
      field: "date_debut",
      headerName: "Debut",
      width: 160,
    },
    {
      field: "date_fin",
      headerName: "Fin",
      width: 160,
    },
    {
        field: "quantité_journalière",
        headerName: "Qte jr (g)",
        width: 150,
    },
    {
        field: "etat",
        headerName: "Etat",
        width: 130,
    },
    {
        field: "prix",
        headerName: "Prix",
        width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,

      renderCell: (params, index) => {
        return (
          <>
            <Link to={"/nourriture/" + params.row.id}>
              <button className="nourritureListEdit" onClick={() => setActiveNourriture(params, index)} key={params.row.id}>Details</button>
            </Link>

            <DeleteOutline
              className="nourritureListDelete"

              //onClick={() => deleteNourriture(params.row.id)}
              onClick={() => handleClickOpen(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    
    <div className="nourritureList">
      <Link to="/newNourriture">
              <button className="nourritureAddButton">Ajouter</button>
            </Link>
      <DataGrid
        rows={nourriture}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
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
          <Button onClick={() => deleteNourriture(id)} color="primary" autoFocus>
            Poursuivre
          </Button>
        </DialogActions>
      </Dialog>


    </div>
    
  );
}
