import {withStyles, AppBar, Toolbar, Typography, IconButton, Container, Badge} from '@material-ui/core'
import {ShoppingBasket, Favorite} from '@material-ui/icons';
import Link from 'next/link'
import Interstitial from '../Interstitial'
import {useContext, useState} from "react";
import GlobalContext from "../../state/global-context";
import {wishlistRoot} from '../constants/root'

const useStyles = theme => ({
    toolbar: {
        padding: 0,
        display: "flex",
        justifyContent: "space-between",
    },
    cartIcon: {
        color: theme.palette.light,
    }
});

const Header = props => {
    const {classes} = props
    const context = useContext(GlobalContext);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        context.pushObject('open_interstitial', true);
    };

    return (
        <>
        <header className={classes.root}>
            <AppBar position="static" elevation={0}>
                <Container maxWidth="lg">
                    <Toolbar className={classes.toolbar}>
                        <Link href="/" passHref>
                            <a>
                                <Typography variant="h4" className={classes.title}>
                                    SuperShop
                                </Typography>
                            </a>
                        </Link>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <IconButton onClick={toggleDrawer(!context.open_interstitial)}>
                                <Badge badgeContent={context.cart.length} color="primary">
                                    <ShoppingBasket className={classes.cartIcon}/>
                                </Badge>
                            </IconButton>
                            <Link component={"link"} href={`/${wishlistRoot}`} passHref>
                               <a>
                                    <Badge badgeContent={context.wishlists.length}>
                                        <Favorite className={classes.cartIcon}/>
                                    </Badge>
                               </a>
                            </Link>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </header>
        <Interstitial/>
            </>
    )
}

export default withStyles(useStyles)(Header)