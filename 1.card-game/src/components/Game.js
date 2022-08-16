import Card from "./Card";
import { cardsData } from "../cards";
import { useState,  useRef, useLayoutEffect } from "react";

function Game() {
  const [cards, setCards] = useState(cardsData);
  const [showedCards, setShowedCards] = useState([]);
  const freeze = useRef(false);

  useLayoutEffect(() => {
    if (!freeze.current) {
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      async function hideCards() {
        if (showedCards.length === 2) {
          const [x, y] = showedCards;
          if (cards[x].image !== cards[y].image) {
            freeze.current = true;
            await sleep(1500);
            freeze.current = false;
            cards[x].isFlipped = false;
            cards[y].isFlipped = false;
          }
          setCards([...cards]);
          setShowedCards([]);
        }
      }
      hideCards();
    }
  }, [cards, showedCards]);

  function handleCardClick() {
    if (!freeze.current && cards[this].isFlipped === false) {
      cards[this].isFlipped = true;
      showedCards.push(this);
      setShowedCards([...showedCards]);
      setCards([...cards]);
    }
  }

  const cardsList = cards.map((card, index) => (
    <Card key={card.id} card={card} onClick={handleCardClick.bind(index)} />
  ));

  return <section className="memory-game">{cardsList}</section>;
}

export default Game;
