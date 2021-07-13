import Card from "../components/Card/Card";

function Favorites({items, onAddToFave}) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои закладки</h1>
            </div>

            <div className="d-flex flex-wrap">
                {items
                    .map((item, index) => (
                        <Card
                            key={index}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            favorited={true}
                            onFave={onAddToFave}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Favorites