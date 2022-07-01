import DefaultLayaout from '../../components/DefaultLayout'
import { withStyles, Container, Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core'
import ProductsList from '../../components/boutique/ProductsList'
import {useContext} from "react";
import GlobalContext from "../../state/global-context";

const useStyles = theme => ({
    root: {marginBottom: theme.spacing(3)},
    h1: {
        margin: theme.spacing(5, 0)
    },
    filterTitle: {
        backgroundColor: theme.palette.primary,
        color: theme.palette.primary.main
    },
    filterListItem: {
        paddingLeft: 0,
    }
});


const Wishlists = props => {
  const {classes} = props
  const context = useContext(GlobalContext);

  return (
    <DefaultLayaout>
      <Container maxWidth="lg" className={classes.root}>

          <Grid container justify={'center'}>
              <Grid item>
                  <Typography variant="h3" component="h1" className={classes.h1}>Votre liste de souhaits</Typography>
              </Grid>
          </Grid>

          <Grid container>

              <Grid item xs={12} className={classes.productsListContainer}>
                  <ProductsList products={context.wishlists}/>
              </Grid>

          </Grid>

      </Container>
  </DefaultLayaout>
  )
}
export default withStyles(useStyles)(Wishlists)