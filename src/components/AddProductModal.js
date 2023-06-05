import * as React from "react";
import { Typography, Button, Modal, Box, TextField, Stack, Grid, Collapse, Alert, AlertTitle } from "@mui/material";
import format from "date-fns/format";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { NumericFormat } from 'react-number-format';
import { inventory } from "../utils/InventoryDB";
import { v4 as uuidv4 } from 'uuid';

export default function AddProductModal({ products, openAddProductModal, closeAddProductModal }) {
    //For controlling the visibility of the add product modal
    const [openModal, setOpenModal] = React.useState(false);

    //For properly removing the image
    const inputRef = React.useRef(null); // import useRef from react

    //Values for the product
    const [name, setName] = React.useState("");
    const [unit, setUnit] = React.useState("");
    const [price, setPrice] = React.useState(parseFloat(0).toFixed(2));
    const [date_of_expiry, setDate_Of_Expiry] = React.useState(format(new Date(), 'MM/dd/yyyy'));
    const [available_inventory, setAvailable_Inventory] = React.useState(0);
    const [image, setImage] = React.useState(null);
    const [imageName, setImageName] = React.useState("");

    //For uploading the image
    function getBase64(e) {
        var file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImage(reader.result)
            setImageName(file);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        };
    }

    //Error message when validation is not met
    const [formValidationAlert, setFormValidationAlert] = React.useState(false);

    //For autohiding the form validation alert
    React.useEffect(() => {
        if (formValidationAlert === true) {
            setTimeout(function () {
                setFormValidationAlert(false);
            }, 5000);
        }
        if (openAddProductModal) {
            setOpenModal(true)
        }
    }, [formValidationAlert, openAddProductModal])

    //For handling change in inputs
    function handleChange(e) {
        if (e.target.id === "name") {
            validateName(e.target.value);
        }
        if (e.target.id === "unit") {
            validateUnit(e.target.value);
        }
        if (e.target.id === "price") {
            validatePrice(e.target.value);
        }
        if (e.target.id === "available_inventory") {
            validateAvailableInventory(e.target.value);
        }
    }

    //For input validation
    function validateName(name) {
        const NamePattern = /^[a-zA-Z0-9 ]+$/;
        setName(name)

        if (NamePattern.test(name)) {
            return true;
        }
        else {
            return false;
        }
    }

    function validateUnit(unit) {
        const UnitPattern = /^[a-zA-Z0-9 ]+$/;
        setUnit(unit);

        if (UnitPattern.test(unit)) {
            return true;
        }
        else {
            return false;
        }
    }

    function validatePrice(price) {
        setPrice(price);

        if (price <= 0.00) {
            return false;
        }
        else {
            return true;
        }
    }

    function convertPriceToDecimal() {
        setPrice(parseFloat(price).toFixed(2));
    }

    function validateAvailableInventory(available_inventory) {
        setAvailable_Inventory(available_inventory);
        if (available_inventory <= 0) {
            return false;
        }
        return true;
    }

    //For clearing the product input fields
    function clearValues() {
        setName("");
        setUnit("");
        setPrice(0);
        setDate_Of_Expiry(format(new Date(), 'MM/dd/yyyy'));
        setAvailable_Inventory(0);
        setImage(null);
    }

    //Create new product
    function submit(e) {
        e.preventDefault();

        if ((validateName(name) && validateUnit(unit) && validatePrice(price) && validateAvailableInventory(available_inventory)) === true && image !== null) {

            // let productID = products[products.length - 1].id + 1;

            const productID = uuidv4();

            //Data for product
            let productData = {
                id: productID,
                name: name,
                unit: unit,
                price: price,
                date_of_expiry: date_of_expiry,
                available_inventory: available_inventory,
                image: image,
                image_name: imageName
            }

            products.push(productData);
            hideModal();
        }
        else {
            setFormValidationAlert(true);
        }
    }

    //To close the add product modal
    const hideModal = () => {
        clearValues();
        closeAddProductModal();
    };

    return (

        <Modal
            open={openAddProductModal}
            onClose={hideModal}
            closeAfterTransition
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Box sx={{
                width: "70%", maxHeight: "100%", overflowY: "scroll", bgcolor: 'background.paper', border: '2px solid #000', p: 4, position: "absolute",
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
            }}>
                <Stack alignContent="flex-start" direction="row" spacing={55}>
                    <Typography variant="h4" sx={{ marginBottom: 5 }}>Create new product:</Typography>
                    <Button variant="outlined" onClick={() => hideModal()}>Close</Button>
                </Stack>

                <form onSubmit={submit}>
                    <Collapse in={formValidationAlert}>
                        <Alert severity="error" visible="false" sx={{ m: 2 }}>
                            <AlertTitle>Error</AlertTitle>
                            All fields must not be empty!
                        </Alert>
                    </Collapse>

                    <Grid item container direction="column" spacing={2} xs={6}>

                        <Grid item>
                            <Typography>Product Name: </Typography><TextField id="name" value={name} onChange={(e) => handleChange(e)} placeholder="Name"></TextField>
                        </Grid>

                        <Grid item>

                            <Typography>Unit: </Typography><TextField id="unit" value={unit} onChange={(e) => handleChange(e)}
                                placeholder="Unit"></TextField>
                        </Grid>

                        <Grid item>
                            <Typography>Price: </Typography>
                            <NumericFormat
                                id="price"
                                customInput={TextField}
                                onChange={(e) => handleChange(e)}
                                onBlur={convertPriceToDecimal}
                                value={price}
                                thousandSeparator={true}
                                // you can define additional custom props that are all forwarded to the customInput e. g.
                                variant="outlined"
                                placeholder="Price"
                            />
                        </Grid>

                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker required id='date-of-expiry' label='Date of Expiry' slotProps={{ textField: { variant: 'outlined' } }}
                                format="MM/dd/yyyy" value={new Date(date_of_expiry)} onChange={(newDate) => setDate_Of_Expiry(format(new Date(newDate), 'MM/dd/yyyy'))} /></LocalizationProvider>
                        </Grid>

                        <Grid item>
                            <Typography>Available Inventory: </Typography>
                            <NumericFormat
                                id="available_inventory"
                                customInput={TextField}
                                onChange={(e) => handleChange(e)}
                                value={available_inventory}
                                thousandSeparator={true}
                                placeholder="Available Inventory"
                                decimalScale={0}
                                // you can define additional custom props that are all forwarded to the customInput e. g.
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item>
                            <Typography>Image: </Typography>
                            <input ref={inputRef} type="file" onChange={getBase64} />
                        </Grid>
                        {image && (<div>
                            <img
                                alt="not found"
                                width={"250px"}
                                src={image}
                            />
                            <br />
                            <Button size="small" variant="contained" onClick={() => {
                                inputRef.current.value = "";
                                setImage(null);
                            }} sx={{ marginLeft: 10 }}>Remove</Button>
                        </div>)}

                        <Grid item><Button variant="contained" type="submit">Add Product</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    )
}