import "./elevageList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline , Check } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ElevageDataService from "../../services/ElevageServices";


export default function ElevageList() {

  constructor(props) {
    super(props);
    this.state = {id: ''};  }


  const [elevage, setElevage] = useState([]);
  const [currentElevage, setCurrentElevage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchNom, setSearchNom] = useState("");
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    retrieveElevage();
  }, []);


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
        retrieveElevage();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentElevage({ ...currentElevage, [name]: value });
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
      
      renderCell: (params ,index) => {
        return (
          <>
            <Link to={"/elevage/" + params.row.id}>
              <button className="elevageListEdit" onClick={() => setActiveElevage(params , index)} key={params.row.id}>Edit</button>
            </Link>
            <button primary  onClick={() => setActiveElevage(params, params.row
            .id)}
                        key={elevage.id}>Details </button>

            <DeleteOutline
              className="elevageListDelete"
              
              onClick={ () => deleteElevage(elevage.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="elevageList">
      <DataGrid
        rows={elevage}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
      </div>
  );
}
