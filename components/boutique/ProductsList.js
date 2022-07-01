import ProductCard from './ProductCard'
import {Grid, withStyles} from "@material-ui/core";
import ProductsList from "../../pages/boutique";
import { useRouter } from 'next/router'
import {wishlistRoot} from "../constants/root";

const useStyles = theme => ({

});

const ProductList = (props) => {
    const {classes, products} = props
    const router = useRouter()

    const isRootWishlists = () => router.pathname == `/${wishlistRoot}`

    return (
        <Grid container spacing={2}>
            {products.map((product, index) => (
                <Grid item xs={6} md={isRootWishlists() ? 3 : 4} key={index}>
                    <ProductCard isRootWishlists={isRootWishlists()} product={product}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default withStyles(useStyles)(ProductList)
