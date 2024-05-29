import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import useFetchUserOrders from "../../hooks/useFetchUserOrders";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "customerName", headerName: "Customer Name", width: 130 },
  { field: "contactNumber", headerName: "Contact Number", width: 130 },
  {
    field: "city",
    headerName: "City",
    width: 130,
  },
  {
    field: "deliveryAddress",
    headerName: "Delivery Address",
    sortable: false,
    width: 200,
  },
  {
    field: "orderNotes",
    headerName: "Order Notes",
    sortable: false,
    width: 200,
  },
  {
    field: "orderDate",
    headerName: "Order Date",
    width: 130,
  },
];

function OrdersHistory() {
  const { orders, loading } = useFetchUserOrders();

  const rows = loading
    ? [
        {
          id: 1,
          customerName: "Snow",
          contactNumber: "81928290",
          city: "Beirut",
          deliveryAddress: "First Street",
          orderNotes: "Make it fast",
          orderDate: "asdfjlks",
        },
      ]
    : orders.map((order) => ({
        id: order.id,
        customerName: order.customerName,
        contactNumber: order.contactNumber,
        city: order.city,
        deliveryAddress: order.deliveryAddress,
        orderNotes: order.orderNotes,
        orderDate: new Date(order.orderDate).toLocaleDateString(),
      }));

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div style={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          density="comfortable"
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
        />
      </div>
    </div>
  );
}
export default OrdersHistory;
