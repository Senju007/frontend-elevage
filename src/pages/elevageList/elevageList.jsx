import "./elevageList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline , Check } from "@material-ui/icons";
import { elevageRows } from "../../dummyData";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ElevageDataService from "../../services/ElevageServices";


export default function UserList() {
  const [elevage, setElevage] = useState([]);


  useEffect(() => {
    retrieveElevage();
  }, []);


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

  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "date_debut", headerName: "Date", width: 200 },
    {
      field: "nb_poulet",
      headerName: "Nombre poulet",
      width: 200,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      
      renderCell: (params) => {
        return (
          <>
            <Link to={"/elevage/" + params.row.id}>
              <button className="elevageListEdit">Edit</button>
            </Link>

            <DeleteOutline
              className="elevageListDelete"
              
              onClick={ () => deleteElevage(params.row.id)}
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
