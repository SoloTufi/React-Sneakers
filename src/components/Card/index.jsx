import React from "react";

import styles from "./card.module.scss";

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = true,
}) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, price, imageUrl });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img
          src={isFavorite ? "/img/heartUnliked.svg" : "/img/heartLiked.svg"}
          alt="Favorite"
        />
      </div>
      <img src={imageUrl} alt="sneakers" width={133} height={112} />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          src={isAdded ? "/img/btnChecked.svg" : "/img/btnPlus.svg"}
          alt="Add"
          onClick={onClickPlus}
          className={styles.plus}
        />
      </div>
    </div>
  );
}

export default Card;
