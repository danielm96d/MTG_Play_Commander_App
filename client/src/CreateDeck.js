import React, {useState, useContext, useEffect} from 'react'
import { Box,Modal} from "@mui/material";
import { DeckContext } from './Context';

function CreateDeck(){
  const[deck, setDeck] = useState(false)
  const [deckName, setDeckName] = useState(false)
  const [deckCards, setDeckCards] = useState([])
  let value = {deckCards, setDeckCards}

  
  //this use effect will go grab the card images once the list has been imported and attach them to object.
  useEffect(()=>{
    deckCards.map((card)=>{
      fetch(`https://api.scryfall.com/cards/named?exact=${card.name}`)
      .then(resp=>resp.json())
      .then(cardObj =>{
        card.url = cardObj.image_uris.normal;
        console.log('card: ', card)
      })
    })
  },[deckCards])
  
  //--------------custom function to handle storing the data in a text area to a variable-----------------\\
  const handleDataChange = (event)=>{
    setDeckName(event.target.value)
    console.log(event.target.value)
  }
  
  return (
    <div className="App">
      <>
        <label htmlFor='deckName'>Deck Name: </label>
        <input onChange={handleDataChange} id='deckName' type='text'/><br/>
      </>
      <>
        <label htmlFor='cardSearch'>Card Search: </label>
        <input type='text' id='cardSearch'/>
      </>
      <DeckContext.Provider value={value}>
        <ImportModal/>
      </DeckContext.Provider>
      
      {
        //----------Assign url information to the deck's cards-------------\\
        deckCards.map((card)=>{
          return(
            <>
              {/* <img src={card.url} alt='noIMG'/> */}
              <li>{card.quantity} - {card.name}</li>
            </>
          )
        })
      }

      {/* //----------Save the deck to local storage-------------\\ */}
      <button onClick={()=>{
        let deckObj={
          name: '',
          commander: '',
          cards: []
        }
        deckObj.name = deckName
        deckObj.cards = deckCards
        //deckObj.commander = something
        setDeck({...deckObj})
        localStorage.setItem(deck.name, JSON.stringify(deck))
        // console.log('local storage: ', JSON.parse(localStorage.getItem(deck.name)))
      }}>Save Deck</button>
      
    </div>
  );
}

function ImportModal(){
  const {deckCards, setDeckCards} = useContext(DeckContext)
  const [open, setOpen] = useState(false)
  const [textData, setTextData] = useState('')
  const [importData, setImportData] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  //--------------custom function to handle storing the data in a text area to a variable-----------------\\
  const handleDataChange = (event)=>{
    setTextData(event.target.value)
    console.log(event.target.value)
  }
  
  //--------------custom function to handle the storing of the imported cards-----------------\\
  const handleStoredData = ()=>{
    let storedData = importData;
    storedData = textData.split('\n');
    //take each line and split it into an object consisting of the quantity and name
    storedData = storedData.map((item)=>{
      let info = item.split(' ')
      let card = {
        quantity: info[0],
        name: info[1],
        url: ''
      }
      return card;
    })
    storedData = storedData.filter((item)=>{
      if(item.name !== undefined) return item
    })

    setDeckCards(storedData);
    setImportData(storedData);
  }

  return(
    <>
      <button onClick={handleOpen}>mass Import</button>
      <Modal open={open} onClose={handleClose}>
        <Box>
          <h1>Paste decklist</h1>
          <textarea 
            id='importList' 
            onChange={handleDataChange}
          />
          <button onClick={handleStoredData}>Import</button>
        </Box>
      </Modal>
    </>
  )
}

export default CreateDeck