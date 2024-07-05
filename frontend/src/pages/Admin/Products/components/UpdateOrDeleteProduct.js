import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const AddNewProductDialog = ({
  openUOD,
  setOpenUOD,
  cellData,
  setProducts, // Add setProducts as a prop
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState(cellData.name);
  const [price, setPrice] = useState(cellData.price);
  const [description, setDescription] = useState(cellData.description);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  console.log(cellData);
  const handleClose = () => {
    setOpenUOD(false);
  };
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile && uploadedFile.type.includes("image")) {
      setSelectedFile(uploadedFile);
      setPreviewImage(URL.createObjectURL(uploadedFile)); // Set preview image
    } else {
      setSelectedFile(null);
      setPreviewImage(null); // Clear preview image
      alert("Please upload a file of type image");
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    const id = cellData.id;
    try {
      const response = await axiosPrivate.delete(`/api/products/delete/${id}`);
      alert(response.data);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== cellData.id)
      );
      handleClose();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    const id = cellData.id;
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Price", price);
    formData.append("Description", description);
    if (selectedFile) {
      formData.append("Image", selectedFile);
    }
    console.log("formmmm\n" + formData.get("Price"));
    try {
      const response = await axiosPrivate.put(
        `/api/products/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      // Update current row data after successful update
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? {
                ...product,
                name: name,
                price: price,
                description: description,
                // Update imageURL if a new image is uploaded
                imageURL: selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : product.imageURL,
              }
            : product
        )
      );

      handleClose();
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={openUOD} onClose={handleClose}>
        <DialogTitle>Update or Delete</DialogTitle>
        <DialogContent className="row col-12 justify-content-center">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            className="row d-flex justify-content-center col-lg-6 col-md-12"
          >
            <TextField
              required
              id="outlined-required"
              label="Name"
              type="text"
              value={name}
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined"
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </Button>
          </Box>
          <img
            src={
              previewImage
                ? previewImage
                : `http://localhost:5220${cellData.imageURL}`
            }
            alt="user profile pic"
            style={{
              height: "auto",
              marginTop: "10px",
            }}
            className="col-md-12 col-lg-6"
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={handleDelete}
            color="error"
            loading={deleting}
            loadingPosition="start"
            variant="contained"
          >
            Delete Product
          </LoadingButton>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            color="primary"
            loading={updating}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={handleUpdate}
          >
            <span>Update</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddNewProductDialog;
