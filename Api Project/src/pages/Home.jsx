import React, { useEffect, useState } from "react";
import Loading from "./../components/Loading";
import Cocktail from "./../components/Cocktail";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [searchItem, setsearchItem] = useState("");
  const [cocktail, setCocktail] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const fetchDrinks = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${url}${searchItem}`);

      const data = await response.json();

      const { drinks } = data;

      console.log(drinks);

      if (drinks) {
        const newItem = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });

        setCocktail(newItem);
      } else {
        setCocktail([]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, [searchItem]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <section className="section search">
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label>search your favorite cocktail</label>
            <input
              type="text"
              value={searchItem}
              onChange={(e) => setsearchItem(e.target.value)}
            />

            <button className="btn" type="submit">
              Search
            </button>
          </div>
        </form>
      </section>

      <section className="section">
        <h2 className="section-title"> Cocktail</h2>
        <div className="cocktails-center">
          {cocktail.map((item) => {
            return <Cocktail key={item.id} {...item} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
