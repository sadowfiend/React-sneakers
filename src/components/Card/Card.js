import { useState } from 'react'
import styles from './Card.module.scss'

function Card({onFave, id, imageUrl, title, price, onPlus, favorited = false}) {
    const [isAdded, setIsAdded] = useState(false);
    const [isFave, setIsFave] = useState(favorited);

    const onClickPlus = ()=> {
        onPlus({title, imageUrl, price})
        setIsAdded(!isAdded);
    };

    const onClickFave = () => {
        setIsFave(!isFave);
        onFave({id, title, imageUrl, price})
    };

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFave}>
                <img
                    onClick={onClickFave}
                    src={isFave ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'}
                    alt="Unliked"
                />
            </div>
            <img width={133} height={112} src={imageUrl} alt="2"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                <img className={styles.plus}
                     onClick={onClickPlus}
                     src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                     alt="plus"
                />
            </div>
        </div>
    )
}

export default Card