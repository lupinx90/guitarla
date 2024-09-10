import { Header } from "./Components/Header";
import { Guitar } from "./Components/Guitar";
import useCart from "./hooks/useCart";

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

  const {
    data,
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    emptyCart,
    isEmpty,
    cartTotal
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        emptyCart={emptyCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
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
