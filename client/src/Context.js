import { createContext } from "react";

export const DeckContext = createContext({
  deck: [],
  setDeck: ()=>{}
}
);