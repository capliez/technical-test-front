import DefaultLayaout from '../../../components/DefaultLayout'
import { withStyles, Container, Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core'
import ProductsList from '../../../components/boutique/ProductsList'
import { useRouter } from 'next/router'
import {useContext, useEffect} from "react";
import GlobalContext from "../../../state/global-context";
import CategoriesList from '../../../components/boutique/CategoriesList';

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


const Category = props => {
  const {classes} = props
  const router = useRouter()
  const context = useContext(GlobalContext);

  useEffect(() => {
    context.getProductsByCategory(router.query.category)
  }, [router])

  return (
    <DefaultLayaout>
      <Container maxWidth="lg" className={classes.root}>

          <Grid container justify={'center'}>
              <Grid item>
                  <Typography variant="h3" component="h1" className={classes.h1}>SuperShop</Typography>
              </Grid>
          </Grid>

          <Grid container>

              <CategoriesList categories={context.categories} />

              <Grid item xs={12} md={9} className={classes.productsListContainer}>
                {context.isLoadingProducts ? <p>Je charge</p> : <ProductsList products={context.products}/>}
              </Grid>

          </Grid>

      </Container>
  </DefaultLayaout>
  )
}
export default withStyles(useStyles)(Category)