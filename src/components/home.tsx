import React, { useState, useEffect  } from "react";
import Header from "./header";
import Footer from "./footer";
import Game from "./game";


type HomeProps = {
    games: Array<any>;
};

const Home: React.FC<HomeProps> = ({games}) =>
{
    const [allGames, setGames] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
   
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        setIsLoading(true);
        if (games) {
            setGames(games);
            setIsLoading(false);
        } 
        else {
          fetch("/games/get")
            .then(res => res.json())
            .then(data => {
              if (data) {
                setGames(data);
                setIsLoading(false);
              }
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
        }
    }, []);

    return (
        <React.Fragment>
          <Header user={null} />
          <h1 className="col-12 title">Games</h1>
          <div className="container main-container">
            <div className="row game-section">
                {isLoading && !error && <span> Loading...</span>}
                {!isLoading && !error && allGames.length > 0 &&
                allGames.map((game: { id: number; play_url: string; name: string; logo_url: string }) => {
                 return <Game game={game}/>
                })}
                {error && <span> Error! {error}</span>}
            </div>
          </div>
          <Footer/>
        </React.Fragment>
      );
}
export default Home;
