import React from "react";
import AddNewProductDialog from "./components/AddNewProductDialog";
import useFetchAllProducts from "../../../hooks/useFetchAllProducts";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import UpdateOrDelete from "./components/UpdateOrDeleteProduct";
import LoadSpinner from "../../../components/LoadSpinner";

function ManageProducts() {
  const { products, loading, setProducts } = useFetchAllProducts();
  const [openUOD, setOpenUOD] = React.useState(false);
  const [selectedCellData, setSelectedCellData] = React.useState(null);

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

  const handleCellDoubleClick = (params) => {
    // Extract the data from the cell
    const cellData = {
      id: params.row.id,
      name: params.row.name,
      description: params.row.description,
      price: params.row.price,
      imageURL: params.row.imageURL,
    };
    // Set the selected cell data
    setSelectedCellData(cellData);

    // Open the UpdateOrDelete dialog
    setOpenUOD(true);
  };

  return loading ? (
    <LoadSpinner />
  ) : (
    <div>
      <div className="container col-12 mt-4">
        <div className="d-flex justify-content-end mb-3">
          <AddNewProductDialog />
        </div>
        <div>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              slots={{
                toolbar: GridToolbar,
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onCellDoubleClick={handleCellDoubleClick} // Handle double-click event on cells
            />
          </div>
        </div>
      </div>
      {/* Render UpdateOrDelete dialog */}
      {openUOD ? (
        <UpdateOrDelete
          openUOD={openUOD}
          setOpenUOD={setOpenUOD}
          cellData={selectedCellData}
          setProducts={setProducts}
        />
      ) : null}
    </div>
  );
}

export default ManageProducts;
