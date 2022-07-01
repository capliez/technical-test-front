import {
    Typography,
    withStyles,
    ListItem
} from '@material-ui/core'
import Link from 'next/link'

const useStyles = theme => ({
});

const CategoryCard = (props) => {
    const {classes, category} = props
    return (
        <ListItem className={classes.filterListItem}>
            <Link href={`/boutique/${category}`} passHref>
                <Typography component="a">
                    {category}
                </Typography>
            </Link>
        </ListItem>
    )
}

export default withStyles(useStyles)(CategoryCard)