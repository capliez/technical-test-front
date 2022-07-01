import { createContext, Component } from 'react';
const GlobalContext = createContext();
import PropTypes from 'prop-types';
import Axios from 'axios'

export class GlobalProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open_interstitial: false,
            pushObject: this.pushObject.bind(this),
            /* Products */
            products: [],
            isLoadingProducts: true,
            getProducts: this.getProducts.bind(this),
            /* Categories */
            categories: [],
            isLoadingCategories: true,
            getCategories: this.getCategories.bind(this),
            getProductsByCategory: this.getProductsByCategory.bind(this),
            /* Cart */
            cart: [],
            getCart: this.getCart.bind(this),
            addProductToCart: this.addProductToCart.bind(this),
            removeProductToCart: this.removeProductToCart.bind(this),
            /* Wishlists */
            wishlists: [],
            getWishlists: this.getWishlists.bind(this),
            addProductToWishlist: this.addProductToWishlist.bind(this),
            removeProductToWishlist: this.removeProductToWishlist.bind(this),
            productIsInWishlist: this.productIsInWishlist.bind(this)
        }
    }

    pushObject(key, value, callback) {
        this.setState({ [key]: value }, callback);
    }

    getCategories() {
        const sessionStorageCategories = JSON.parse(sessionStorage.getItem('categories')); // null if not exist

        if (sessionStorageCategories !== null) {
            this.setState({ categories: sessionStorageCategories, isLoadingCategories: false });
        }else {
            Axios.get('https://fakestoreapi.com/products/categories')
            .then(result => {
                this.setState({ categories: result.data, isLoadingCategories: false });
                sessionStorage.setItem('categories', JSON.stringify(result.data));
            })
            .catch(error => {
                console.log(error)
                this.setState({ isLoadingCategories: false });
            })
        }

    }
    
    getProducts(){
        const sessionStorageProducts = JSON.parse(sessionStorage.getItem(`products`)); // null if not exist

        if (sessionStorageProducts !== null) {
            this.setState({ products: sessionStorageProducts, isLoadingProducts: false });
        }else {
            Axios.get(`https://fakestoreapi.com/products`)
            .then(result => {
                this.setState({ products: result.data, isLoadingProducts: false });
                sessionStorage.setItem(`products}`, JSON.stringify(result.data));
            })
            .catch(error => {
                console.log(error)
                this.setState({ isLoadingProducts: false });
            })
        }
    }

    getProductsByCategory(category) {
        const sessionStorageProductByCategory = JSON.parse(sessionStorage.getItem(`products-${category}`)); // null if not exist

        if (sessionStorageProductByCategory !== null) {
            this.setState({ products: sessionStorageProductByCategory, isLoadingProducts: false });
        }else {
            Axios.get(`https://fakestoreapi.com/products/category/${category}`)
            .then(result => {
                this.setState({ products: result.data, isLoadingProducts: false });
                sessionStorage.setItem(`products-${category}`, JSON.stringify(result.data));
            })
            .catch(error => {
                console.log(error)
                this.setState({ isLoadingProducts: false });
            })
        }
    }
    

    getCart() {
        const sessionStorageCart = JSON.parse(sessionStorage.getItem('cart')); // null if not exist

        if (sessionStorageCart !== null) {
            this.setState({ cart: sessionStorageCart });
        }else {
            this.setState({ cart: [] });
        }
    }

    getWishlists() {
        const sessionStorageWishlists = JSON.parse(sessionStorage.getItem('wishlists')); // null if not exist

        if (sessionStorageWishlists !== null) {
            this.setState({ wishlists: sessionStorageWishlists });
        }else {
            this.setState({ wishlists: [] });
        }
    }

    /* Add Product in my cart */
    addProductToCart(product, callback) {
        const newCart = [...this.state.cart]
        newCart.push(product)
        this.setState({ cart: newCart }, () => {
            sessionStorage.setItem('cart', JSON.stringify(newCart));

            if (typeof callback !== 'undefined') callback();
        });
    }

    /* Remove Product in my cart */
    removeProductToCart(id, callback) {
        const newCart = [...this.state.cart]
        const ProductIndex = newCart.findIndex(p => p.id === id);
        newCart.splice(ProductIndex, 1)
        this.setState({ cart: newCart }, () => {
            sessionStorage.setItem('cart', JSON.stringify(newCart));
            if (typeof callback !== 'undefined') callback();
        });
    }


    /* Add Product to my wishlists */
    addProductToWishlist(product, callback) {
        const newWishlists = [...this.state.wishlists]
        
        if(this.productIsInWishlist(product)) this.removeProductToWishlist(product.id, callback)
        else {
            newWishlists.push(product)
            this.setState({ wishlists: newWishlists }, () => {
                sessionStorage.setItem('wishlists', JSON.stringify(newWishlists));
    
                if (typeof callback !== 'undefined') callback();
            });
        }
    }

    /* Remove Product to my wishlists */
    removeProductToWishlist(id, callback) {
        const newWishlists = [...this.state.wishlists]
        const ProductIndex = newWishlists.findIndex(p => p.id === id);
        newWishlists.splice(ProductIndex, 1)
        this.setState({ wishlists: newWishlists }, () => {
            sessionStorage.setItem('wishlists', JSON.stringify(newWishlists));
            if (typeof callback !== 'undefined') callback();
        });
    }

    /* Checks if the product is in the wishlist */
    productIsInWishlist(product) {
        const ProductIndex = this.state.wishlists.length > 0 ? this.state.wishlists.findIndex(p => p.id === product.id) : -1;
        return ProductIndex > -1 
    }

    componentDidMount() {
        this.getCart()
        this.getWishlists()
        this.getCategories()
    }

    render() {
        const { children } = this.props;

        return (
            <GlobalContext.Provider value={{ ...this.state }}>
                {children}
            </GlobalContext.Provider>
        );
    }
}

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const GlobalConsumer = GlobalContext.Consumer;
export default GlobalContext;
