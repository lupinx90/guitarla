import { useState, useEffect } from "react";
import { Header } from "./Components/Header";
import { Guitar } from "./Components/Guitar";
import { db } from "./data/db";

function App() {
  /**
  // State
  const [auth, setAuth] = useState(false)
  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState([])

  // Effect
  useEffect( () => {
    if(auth) console.log("Usuario autenticado");
    console.log("Componente listo o escuchando por auth");
  }, [auth])
   */

  const defaultCart = (localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])

  const [data, setData] = useState([]);
  const [cart, setCart] = useState(defaultCart);

  useEffect(() => {
    setData(db);
  }, [data]);

  useEffect(() => {
    saveLocalStorage();
  }, [cart])

  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExist].qty++;
      setCart(updatedCart);
    } else {
      item.qty = 1;
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    setCart( prevCart => prevCart.filter( (item) => item.id !== id ) );
  }

  function increaseQty(id){
    const updatedCart = cart.map( item => {
      if(item.id === id && item.qty < 3){
        return {
          ...item,
          qty: item.qty + 1
        }
      }
      return item
      }
    );
    setCart(updatedCart);
  }

  function decreaseQty(id){
    const updatedCart = cart.map( item => {
      if(item.id === id && item.qty > 1){
        return {
          ...item,
          qty: item.qty - 1
        }
      }
      return item
      }
    );
    setCart(updatedCart);
  }

  function emptyCart(){
    setCart([]);
  }

  function saveLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        emptyCart={emptyCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} content={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
