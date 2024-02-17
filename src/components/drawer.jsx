function Drawer() {
  return (
    <div className="overlay" style={{ display: "none" }}>
      <div className="drawer d-flex flex-column">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img src="/img/btn-remove.svg" alt="Remove" className="cu-p" />
        </h2>

        <div className="items flex">
          <div className="cartItem d-flex align-center mb-20">
            <div
              style={{ backgroundImage: "url(/img/sneakers/1.jpg)" }}
              className="cartItemImg"
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img src="/img/btn-remove.svg" alt="Remove" className="removeBtn" />
          </div>
          <div className="cartItem d-flex align-center mb-20">
            <div
              style={{ backgroundImage: "url(/img/sneakers/2.jpg)" }}
              className="cartItemImg"
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img src="/img/btn-remove.svg" alt="Remove" className="removeBtn" />
          </div>
          <div className="cartItem d-flex align-center mb-20">
            <div
              style={{ backgroundImage: "url(/img/sneakers/3.jpg)" }}
              className="cartItemImg"
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img src="/img/btn-remove.svg" alt="Remove" className="removeBtn" />
          </div>
        </div>

        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21498 руб.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ
            <img src="/img/arrow.svg" alt="Arrow" width={13} height={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
