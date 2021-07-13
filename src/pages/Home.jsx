import Card from "../components/Card/Card";

function Home({items,
                  searchValue,
                  setSearchValue,
                  onChangeSearchInput,
                  onAddToFave,
                  onAddToCart}) {
    return(
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
                            onFave={(obj) =>onAddToFave(obj)}
                            onPlus={(obj) => onAddToCart(obj)}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Home