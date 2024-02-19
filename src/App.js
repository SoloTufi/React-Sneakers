import React from 'react';

import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { Drawer } from "./components/drawer";
import { Header } from "./components/header";
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';

function App() {
  //items и cartItems - хранят массивы объектов с данными о товарах и добавленных в корзину товарах соответственно
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);

  const [favorites, setFavorites] = React.useState([]);

  //searchValue - хранит строку с текущим значением поиска
  const [searchValue, setSearchValue] = React.useState('');
  //cartOpened - хранит булево значение, отображает открыта ли корзина
  const [cartOpened, setCartOpened] = React.useState(false);

  //Hook useEffect - выполняет асинхронный запрос на сервер для получения данных о товарах с помощью метода fetch. 
  //После получения данных, они преобразуются в формат JSON и установятся в состояние items
  React.useEffect(() => {
    //res - ответ сервера
    axios.get('https://87cbc8bfb5e8e5dc.mokky.dev/items').then((res) => {
      setItems(res.data);
      console.log(res.data);
    })
    axios.get('https://87cbc8bfb5e8e5dc.mokky.dev/cart').then((res) => {
      setCartItems(res.data);
    })
    axios.get('https://87cbc8bfb5e8e5dc.mokky.dev/favorites').then((res) => {
      setFavorites(res.data);
      console.log(res.data);
    })
  }, []);

  //onAddToCart - добавляет объект товара в массив cartItems с помощью функции setCartItems, используя оператор расширения массива
  const onAddToCart = (obj) => {
    axios.post('https://87cbc8bfb5e8e5dc.mokky.dev/cart', obj);
    setCartItems((prev) => [...prev, obj]);
    console.log(obj);
  }

  //onRemoveItem - удаляет объект из массива cartItems используя фильтрацию по id
  const onRemoveItem = (id) => {
    axios.delete(`https://87cbc8bfb5e8e5dc.mokky.dev/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const onAddToFavorite = (obj) => {
    if (favorites.find(obj => obj.id === obj.id)) {
      axios.delete(`https://87cbc8bfb5e8e5dc.mokky.dev/favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      axios.post('https://87cbc8bfb5e8e5dc.mokky.dev/favorites', obj);
      setFavorites((prev) => [...prev, obj]);
    }

  }


  //onChangeSearchInput - обрабатывает событие изменения значения инпута поиска и выводит его в функцию setSearchValue
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  //onClearSearchInput - очищает поле инпута, передавая в setSearchValue пустую строку
  const onClearSearchInput = () => {
    setSearchValue('');
  }

  return (
    <div className="wrapper clear">

      {/*Drawer - компонент для отображения корзины, который будет отображаться только при условии setCartOpened*/}
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      {/*Header - компонент для отображения шапки сайта, при клике на который будет открываться корзина*/}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route path={"/"}
          element={
            <Home
              items={items}
              searchValue={searchValue}
              onAddToCart={onAddToCart}
              setSearchValue={setSearchValue}
              onAddToFavorite={onAddToFavorite}
              onClearSearchInput={onClearSearchInput}
              onChangeSearchInput={onChangeSearchInput}
            />
          }>
        </Route>
        <Route path={"/favorites"}
          element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />}>
        </Route>
      </Routes>
    </div>
  );
}



export default App;
