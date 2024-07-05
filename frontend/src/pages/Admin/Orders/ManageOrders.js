import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useFetchAllOrders from "../../../hooks/useFetchAllOrders";
import LoadSpinner from "../../../components/LoadSpinner";
export default function CollapsibleTable() {
  const { allOrders, loading } = useFetchAllOrders();

  const rows = allOrders.map((order) => ({
    id: order.id,
    userId: order.userId,
    customerName: order.customerName,
    contactNumber: order.contactNumber,
    orderDate: new Date(order.orderDate).toLocaleDateString(),
    city: order.city,
    deliveryAddress: order.deliveryAddress,
    orderNotes: order.orderNotes,
    totalAmount: order.totalAmount,
    history: order.orderItems.map((item, index) => ({
      id: `${order.id}-${index}`, // Creating unique id based on order id and index
      productId: item.productId,
      productName: item.product.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })),
  }));

  return loading ? (
    <LoadSpinner />
  ) : (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order ID</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Delivery Address</TableCell>
            <TableCell>Order Notes</TableCell>
            <TableCell>Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderDate}
        </TableCell>
        <TableCell>{row.userId}</TableCell>
        <TableCell>{row.customerName}</TableCell>
        <TableCell>{row.contactNumber}</TableCell>
        <TableCell>{row.city}</TableCell>
        <TableCell>{row.deliveryAddress}</TableCell>
        <TableCell>{row.orderNotes}</TableCell>
        <TableCell>{row.totalAmount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Items
              </Typography>
              <DataGrid
                columns={[
                  { field: "productId", headerName: "Product ID", width: 200 },
                  {
                    field: "productName",
                    headerName: "Product Name",
                    width: 200,
                  },
                  { field: "quantity", headerName: "Quantity", width: 200 },
                  { field: "unitPrice", headerName: "Unit Price", width: 200 },
                ]}
                rows={row.history}

              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
