import CategoryCard from './CategoryCard'
import {Grid, withStyles, List, Typography} from "@material-ui/core";

const useStyles = theme => ({

});

const CategoriesList = (props) => {
    const {classes, categories} = props

    return (
        <Grid item xs={12} md={3}>
            <Typography variant="h6" className={classes.filterTitle}>Catégories</Typography>
            <div className={classes.filterListContainer}>
                <List>
                    {categories.length > 0 ? categories.map((category, index) => (
                        <CategoryCard key={index} category={category}/>
                    )) : <Typography component="p">Un probleme est survenu merci de reessayer plus tard</Typography>}
                </List>
            </div>
        </Grid>
    )
}

export default withStyles(useStyles)(CategoriesList)
