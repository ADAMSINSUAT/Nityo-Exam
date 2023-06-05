import * as React from "react";
import { Grid, Typography, Button, Modal, Box, TextField, Stack, Paper, Collapse, Alert, AlertTitle } from "@mui/material";
import InventoryTable from "../components/inventoryTable";
import AddProductModal from "../components/AddProductModal";
import UpdateProductModal from "../components/UpdateProductModal";
import { inventory } from "../utils/InventoryDB";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    maxHeigth: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    marginTop: 2,
    marginBottom: 2,
    overflow: "auto"
};

export default function DisplayPage() {
    const [openAddProductModal, setOpenAddProductModal] = React.useState(false);
    const [openUpdateProductModal, setOpenUpdateProductModal] = React.useState(false);
    const [productID, setProductID] = React.useState("");
    const [productList, setProductList] = React.useState(inventory)

    function closeAddProductModal() {
        setOpenAddProductModal(false);
    };

    function closeUpdateProductModal() {
        setOpenUpdateProductModal(false);
        setProductID("");
    };

    function updateProduct(id) {
        setProductID(id);
        setOpenUpdateProductModal(true);
    };

    function deleteProduct(index){
        productList.splice(index, 1);
        setProductList([...productList]);
    }

    return (
        <Grid container justifyContent="center" direction="column">
            <Grid item justifyContent="center" alignItems="center" xs={12}>
                <Typography variant="h3" textAlign="center" sx={{ bgcolor: "#90a2b0", width: '100vw' }}>Simple Inventory Management System (Exam)</Typography>
            </Grid>
            <Grid item><Button variant="contained" onClick={() => setOpenAddProductModal(true)}>Add New Product</Button></Grid>
            <Grid item container xs={12} sx={{ overflowX: "scroll" }} direction="row">
                <InventoryTable products={productList} updateProduct={updateProduct} deleteProduct={deleteProduct}/>
            </Grid>

            <Grid item>
                <AddProductModal products={productList} openAddProductModal={openAddProductModal} closeAddProductModal={closeAddProductModal} />
            </Grid>
            <Grid item>
                <UpdateProductModal products={productList} updateProductID={productID} openUpdateProductModal={openUpdateProductModal} closeUpdateProductModal={closeUpdateProductModal} />
            </Grid>
        </Grid >
    )
}