import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import AppContext from './helpers/context';
import Header from './components/header';
import Drawer from './components/drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://87cbc8bfb5e8e5dc.mokky.dev/cart');
      const itemsResponse = await axios.get('https://87cbc8bfb5e8e5dc.mokky.dev/items');
      const favoritesResponse = await axios.get('https://87cbc8bfb5e8e5dc.mokky.dev/favorites');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://87cbc8bfb5e8e5dc.mokky.dev/cart/${obj.id}`)
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://87cbc8bfb5e8e5dc.mokky.dev/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://87cbc8bfb5e8e5dc.mokky.dev/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    console.log(id);
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://87cbc8bfb5e8e5dc.mokky.dev/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post('https://87cbc8bfb5e8e5dc.mokky.dev/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded }}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
        )}

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path={"/"} exact
            element={
              <Home
                items={items}
                searchValue={searchValue}
                onAddToCart={onAddToCart}
                setSearchValue={setSearchValue}
                onAddToFavorite={onAddToFavorite}
                cartItems={cartItems}
                //onClearSearchInput={onClearSearchInput}
                onChangeSearchInput={onChangeSearchInput}
                isLoading={isLoading}
              />
            }>
          </Route>
          <Route path={"/favorites"} exact
            element={<Favorites onAddToFavorite={onAddToFavorite} />}>
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
