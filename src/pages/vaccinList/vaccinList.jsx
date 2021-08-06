import "./vaccinList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import VaccinDataService from "../../services/VaccinServices";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';


export default function VaccinList() {
  const [vaccin, setVaccin] = useState([]);
  const [currentVaccin, setCurrentVaccin] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [open, setOpen] = React.useState(false)
  const [id , setId] = useState(null);

  useEffect(() => {
    retrieveVaccin();
  }, []);

  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };


  const setActiveVaccin = (vaccin, index) => {
    setCurrentVaccin(vaccin);
    setCurrentIndex(index);
  };

  const refreshList = () => {
    retrieveVaccin();
    setCurrentVaccin(null);
    setCurrentIndex(-1);
  };


  const retrieveVaccin = () => {
    VaccinDataService.getAll()
      .then(response => {
        setVaccin(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const deleteVaccin = (id) => {
    VaccinDataService.remove(id)
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
    { field: "id", headerName: "ID", width: 100 },
    { field: "nom", headerName: "Nom", width: 150 },
    {
      field: "elevage",
      headerName: "Elevage",
      width: 150,
    },
    {
      field: "date_prescrit",
      headerName: "Date prescrit",
      width: 150,
    },
    {
        field: "prix_total",
        headerName: "Prix total",
        width: 150,
    },
    {
        field: "etat",
        headerName: "Etat",
        width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,

      renderCell: (params, index) => {
        return (
          <>
            <Link to={"/vaccin/" + params.row.id}>
              <button className="vaccinListEdit" onClick={() => setActiveVaccin(params, index)} key={params.row.id}>Edit</button>
            </Link>

            <DeleteOutline
              className="vaccinListDelete"

              //onClick={() => deleteVaccin(params.row.id)}
              onClick={() => handleClickOpen(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="vaccinList">
      <DataGrid
        rows={vaccin}
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
          <Button onClick={() => deleteVaccin(id)} color="primary" autoFocus>
            Poursuivre
          </Button>
        </DialogActions>
      </Dialog>


    </div>
    
  );
}
