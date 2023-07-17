import { useState } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
import { useEffect } from "react";
const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);

    setTours(newTours);
  };

  const FetchTour = async () => {
    setLoading(true);
    try {
      const reponse = await fetch(url);
      const tours = await reponse.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    FetchTour();
  }, []);

  if (tours.length == 0) {
    return (
      <main>
        <div className="title">
          <h2>No Tours Left</h2>
          <button className="btn" onClick={() => FetchTour()}>
            Refresh
          </button>
        </div>
      </main>
    );
  }
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
