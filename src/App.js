import Card from "./components/Card";
import Drawer from "./components/drawer";
import Header from "./components/header";

const cardData = [
  {
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 12999,
    imageUrl: "/img/sneakers/1.jpg"
  },
  {
    title: "Мужские Кроссовки Nike Air Max 270",
    price: 15632,
    imageUrl: "/img/sneakers/2.jpg"
  },
  {
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 12999,
    imageUrl: "/img/sneakers/3.jpg"
  },
  {
    title: "Мужские Кроссовки Nike Air Max 270",
    price: 15632,
    imageUrl: "/img/sneakers/4.jpg"
  }
]

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/searchIcon.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex justify-between">
          {cardData.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
