import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCardIcon from "@mui/icons-material/AddCard";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import axios from "../../../../api/axios";
import { isObject } from "@mui/x-data-grid/internals";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddNewProductDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [uploading, setUploading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleSubmit = async () => {
    if (!selectedFile || !name || !description || !price) {
      alert("Missing info");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Price", price);
    formData.append("Description", description);
    formData.append("Image", selectedFile);
    try {
      const response = await axiosPrivate.post(
        "/api/products/create-new-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data);
      
      setPreviewImage(null);
      handleClose();
    } catch (error) {
      setUploading(false);
    }
  };
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        color="inherit"
        startIcon={<AddCardIcon />}
      >
        Add New Product
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>New Product Form</DialogTitle>
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
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined"
              label="Price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onChange={handleFileChange}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
          <img
            src={
              previewImage
                ? previewImage
                : "https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg"
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
          <Button
            onClick={() => {
              handleClose();
              setPreviewImage(null);
              setSelectedFile(null);
              setName(null);
              setDescription(null);
              setPrice(null);
              setUploading(false);
            }}
            color="error"
          >
            Cancel
          </Button>
          <LoadingButton
            color="primary"
            onClick={handleSubmit}
            loading={uploading}
            loadingPosition="start"
            disabled={!previewImage}
            startIcon={<SaveIcon />}
          >
            <span>Save</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddNewProductDialog;
