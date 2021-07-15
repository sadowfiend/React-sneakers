import {Route} from 'react-router-dom'
import axios from 'axios'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import {useState, useEffect} from 'react'
import Favorites from "./pages/Favorites";


function App() {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        async function fetchData() {
            setIsLoading(true);
            const cartResponse = await axios.get('https://60ec057fe9647b0017cddff3.mockapi.io/cart');
            const favoritesResponse = await axios.get('https://60ec057fe9647b0017cddff3.mockapi.io/favorites');
            const itemsResponse = await axios.get('https://60ec057fe9647b0017cddff3.mockapi.io/items');

            setIsLoading(false)

            setCartItems(cartResponse.data);
            setFavorites(favoritesResponse.data);
            setItems(itemsResponse.data);
        }

        fetchData()
    }, []);

    const onAddToCart = (obj) => {
        if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
            setCartItems((prev) => prev.filter((item) => item.id !== obj.id))
        } else {
            axios.post('https://60ec057fe9647b0017cddff3.mockapi.io/cart', obj);
            setCartItems((prev) => [...prev, obj])
        }
    };

    const onRemoveItem = (id) => {
        axios.delete(`https://60ec057fe9647b0017cddff3.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== id))
    };

    const onAddToFave = async (obj) => {
        try {
            if (favorites.find((favObj) => favObj.id === favObj.id)) {
                axios.delete(`https://60ec057fe9647b0017cddff3.mockapi.io/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
            } else {
                const { data } = await axios.post('https://60ec057fe9647b0017cddff3.mockapi.io/favorites', obj);
                setFavorites((prev) => [...prev, data])
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты')
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    };

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer
                items={cartItems}
                onClose={() => setCartOpened(false)}
                onRemove={onRemoveItem}
            />}

            <Header onClickCart={() => setCartOpened(true)}/>

            <Route path="/" exact>
                <Home
                    items={items}
                    cartItems={cartItems}
                    searchValue={searchValue}
                    setSearchValue={searchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    onAddToFave={onAddToFave}
                    onAddToCart={onAddToCart}
                    isLoading={isLoading}
                />
            </Route>

            <Route path="/favorites" exact>
                <Favorites
                    items={favorites}
                    onAddToFave={onAddToFave}
                />
            </Route>
        </div>
    );
}

export default App;
