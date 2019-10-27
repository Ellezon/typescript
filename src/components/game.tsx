import React from "react";

type GameProps = {
    game:
    {
        id: number;
        name: string;
        play_url: string;
        logo_url: string;
    };
}
const Game:React.FC<GameProps> = ({game}) => {
    return (
        <div className="game-panel col-12 col-md-6 col-lg-3">
        <a href={game.play_url} target="_blank" rel="noopener noreferrer">
          <h4>{game.name}</h4>
          <img src={game.logo_url} alt={game.name} />
        </a>
      </div>
    )

}
export default Game;