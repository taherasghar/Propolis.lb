import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import useFetchAllUsers from "../../../hooks/useFetchAllUser";
import LoadSpinner from "../../../components/LoadSpinner";

function ManageCustomers() {
  const { users, loading } = useFetchAllUsers();
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "username", headerName: "Username", width: 100 },
    { field: "email", headerName: "ُEmail", width: 200 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];

  const rows = loading
    ? [
        {
          id: 0,
          firstName: "Loading...",
          lastName: "Loading...",
          username: 0,
          email: "Loading...",
          fullName: "Loading...",
        },
      ]
    : users;

  !loading && console.table(users);
  return loading ? (
    <LoadSpinner />
  ) : (
    <div>
      {" "}
      <div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            isCellEditable={true}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}

export default ManageCustomers;
