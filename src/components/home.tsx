import React, { useState, useEffect  } from "react";
import Header from "./header";
import Footer from "./footer";
import Game from "./game";
import { connect } from "react-redux";
import { setAllGames } from "../redux/actions";

const Home: React.FC<HomeProps> = ({setAllGames}) =>
{
    const [allGames, setGames] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
   
    // Similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        setIsLoading(true);
        if (allGames.length >0) {
            setIsLoading(false);
        } 
        else {
          fetch("/games/get")
            .then(res => res.json())
            .then(data => {
              if (data) {
                setGames(data);
                setAllGames(allGames);
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
                 return <Game key={game.id} game={game}/>
                })}
                {error && <span> Error! {error}</span>}
            </div>
          </div>
          <Footer/>
        </React.Fragment>
      );
}

const mapDispatchToProps = () => ({
  setAllGames
});



type HomeProps =  ReturnType<typeof mapDispatchToProps>;

export default connect(
  null,
  mapDispatchToProps
)(Home);
