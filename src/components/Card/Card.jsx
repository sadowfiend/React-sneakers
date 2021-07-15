import {useState} from 'react'
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss'

function Card({
                  onFave,
                  id,
                  imageUrl,
                  title, price,
                  onPlus,
                  favorited = false,
                  added = false,
                  loading = false
              }) {
    const [isAdded, setIsAdded] = useState(added);
    const [isFave, setIsFave] = useState(favorited);

    const onClickPlus = () => {
        onPlus({id, title, imageUrl, price});
        setIsAdded(!isAdded);
    };

    const onClickFave = () => {
        setIsFave(!isFave);
        onFave({id, title, imageUrl, price})
    };

    return (
        <div className={styles.card}>
            {
                loading ? <ContentLoader
                    speed={2}
                    width={150}
                    height={190}
                    viewBox="0 0 150 190"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="101" rx="5" ry="5" width="150" height="15" />
                    <rect x="0" y="126" rx="5" ry="5" width="100" height="15" />
                    <rect x="0" y="162" rx="5" ry="5" width="80" height="24" />
                    <rect x="117" y="155" rx="10" ry="10" width="32" height="32" />
                </ContentLoader> : (
                    <>
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
                    </>
                )
            }
        </div>
    )
}

export default Card