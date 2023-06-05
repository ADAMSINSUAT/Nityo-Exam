import * as React from "react";
import { Stack, TableContainer, TablePagination, TableFooter, Table, TableBody, TableHead, TableRow, TableCell, Paper, Typography, Grid, Box, Button } from "@mui/material";
import { inventory } from "../utils/InventoryDB";
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import UpdateProductModal from "./UpdateProductModal";
import { NumericFormat } from "react-number-format";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    heigth: "100%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function InventoryTable({ products, updateProduct, deleteProduct }) {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - timesheet.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // React.useEffect(() => {
    //     console.log(inventory)
    // }, [inventory]);

    function formatNumber(num) {
        return num.toLocaleString('en-US');
    }

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 21 }} align="center">Product Name</TableCell>
                        <TableCell sx={{ fontSize: 21 }} align="center">Unit</TableCell>
                        <TableCell sx={{ fontSize: 21 }} align="center">Price</TableCell>
                        <TableCell sx={{ fontSize: 21 }} align="center">Date of Expiry</TableCell>
                        <TableCell sx={{ fontSize: 21 }} align="center">Available Inventory</TableCell>
                        <TableCell sx={{ fontSize: 21 }} align="center">Available Inventory Cost</TableCell>
                        <TableCell sx={{ fontSize: 21 }} align="center">Image</TableCell>
                        <TableCell sx={{ fontSize: 21 }} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : products
                    ).map((item, index) => {
                        return (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{item.name}</TableCell>
                                <TableCell align="center">{item.unit}</TableCell>
                                <TableCell align="center">{formatNumber(item.price)}</TableCell>
                                <TableCell align="center">{new Date(item.date_of_expiry + 'Z').toLocaleDateString()}</TableCell>
                                <TableCell align="center">{item.available_inventory}</TableCell>
                                <TableCell align="center">{formatNumber(parseFloat(item.available_inventory * item.price).toFixed(2))}</TableCell>
                                <TableCell align="center" sx={{ width: '35%' }}><img style={{ width: '50%', height: '30%' }} src={item.image} /></TableCell>
                                <TableCell align="center"><Stack direction="column" spacing={2}><Button variant="contained" onClick={() => updateProduct(item.id)}>Update</Button>
                                    <Button variant="contained" onClick={()=>deleteProduct(index)}>Delete</Button>
                                </Stack></TableCell>
                            </TableRow>
                        )
                    })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                component="div"
                colSpan={3}
                count={inventory.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {
                        'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </Paper>
    )
}