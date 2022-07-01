import {
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Typography,
    withStyles,
    IconButton
} from '@material-ui/core'
import {ShoppingBasket, Favorite, Delete} from '@material-ui/icons';
import {useContext} from "react";
import GlobalContext from "../../state/global-context";

const useStyles = theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    content: {
        width: "100%",
    },
    thumbnailContainer: {
        padding: theme.spacing(2),
        textAlign: "cetner",
    },
    thumbnail: {
        maxHeight: '170px',
        margin: "auto",
        objectFit: 'contain',
    },
    name: {
        fontSize: '1rem',
    }
});

const ProductCard = (props) => {
    const {classes, product, isRootWishlists} = props
    const context = useContext(GlobalContext);

    const handleAddToCart = (e, product) => {
        context.addProductToCart(product, context.pushObject('open_interstitial', true))
    }

    const handleAddToWishlists = (e, product) => {
        context.addProductToWishlist(product, context.pushObject('open_interstitial', false))
    }

    const returnColorIconFavorite = (product) => context.productIsInWishlist(product) ? 'error' : 'secondary'

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <div className={classes.thumbnailContainer}>
                    <CardMedia
                        component="img"
                        alt={product.title}
                        image={product.image}
                        className={classes.thumbnail}
                        title="Contemplative Reptile"
                    />
                </div>
                <Typography gutterBottom component="h2" className={classes.name}>
                    {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.desc}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.price}
                </Typography>
            </CardContent>
            <CardActions style={{justifyContent: 'space-between', width: '100%'}}>
                <IconButton title='Ajouter dans mon panier' onClick={e => handleAddToCart(e, product)}>
                    <ShoppingBasket color="secondary"/>
                </IconButton>
                <IconButton title={isRootWishlists ? "Supprimer de ma liste de souhaits" : "Ajouter dans ma liste de souhaits"} onClick={e => handleAddToWishlists(e, product)}>
                    {isRootWishlists ? <Delete color='secondary' /> : <Favorite color={returnColorIconFavorite(product)} />}
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default withStyles(useStyles)(ProductCard)