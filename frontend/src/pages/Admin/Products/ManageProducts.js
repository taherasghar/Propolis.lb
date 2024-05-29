import React, { useState } from "react";
import AddNewProductDialog from "./components/AddNewProductDialog";
import useFetchAllProducts from "../../../hooks/useFetchAllProducts";
import { DataGrid } from "@mui/x-data-grid";

function ManageProducts() {
  const { products, loading } = useFetchAllProducts();

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 100 },
    { field: "price", headerName: "Price", width: 50 },
    { field: "imageURL", headerName: "Image URL", width: 400 },
  ];

  const rows = loading
    ? [
        {
          id: 0,
          name: "Loading...",
          description: "Loading...",
          price: 0,
          imageURL: "Loading...",
        },
      ]
    : products;

  !loading && console.table(products);
  return (
    <div>
      <div className="container col-12 mt-4">
        <div className="d-flex justify-content-end mb-3">
          <AddNewProductDialog />
        </div>
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
    </div>
  );
}

export default ManageProducts;
