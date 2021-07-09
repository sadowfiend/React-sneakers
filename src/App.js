import axios from 'axios'
import Header from "./components/Header";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";
import { useState, useEffect } from 'react'


function App() {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        axios.get('https://api.fake.rest/899e3b8d-6259-4aa8-b2f4-5d7bac95e85f/items').then((res)=>{
            setItems(res.data)
        })
    },[]);

    const onAddToCart = (obj) =>{
        axios.post('https://api.fake.rest/899e3b8d-6259-4aa8-b2f4-5d7bac95e85f/cart', obj);
        setCartItems((prev) =>[...prev, obj])
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    };

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} onClose={()=> setCartOpened(false)} />}
            <Header onClickCart={()=> setCartOpened(true)}/>
            <div className="content p-40">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все Кросовки'}</h1>
                    <div className="search-block">
                        <img src="/img/search.svg" alt="search"/>
                        {searchValue && <img onClick={() => setSearchValue('')}
                                             className="clean cu-p"
                                             src="/img/btn-remove.svg"
                                             alt="clean"
                        />}
                        <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {items
                        .filter((item) => item.title.toLowerCase().includes(searchValue))
                        .map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            onFave={()=> console.log('добавили закладки')}
                            onPlus={(obj)=> onAddToCart(obj)}
                        />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default App;
