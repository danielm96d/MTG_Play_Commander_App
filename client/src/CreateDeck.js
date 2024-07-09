import React, {useState, useContext, useEffect} from 'react'
import { Box,Modal} from "@mui/material";
import { DeckContext } from './Context';

function CreateDeck(){
  const [deck, setDeck] = useState([])
  let value = {deck, setDeck}

  //this use effect will go grab the card images once the list has been imported and attach them to object.
  useEffect(()=>{
    deck.map((card)=>{
      fetch(`https://api.scryfall.com/cards/named?exact=${card.name}`)
      .then(resp=>resp.json())
      .then(cardObj =>{
        card.url = cardObj.image_uris.normal;
        console.log('card: ', card)
      })
    })
  },[deck])

  return (
    <div className="App">
      <input type='text' className='cardSearch'/>
      <DeckContext.Provider value={value}>
        <ImportModal/>
      </DeckContext.Provider>
        {
          // console.log('deck: ', deck)
          deck.map((card)=>{
            return(
              <>
                {/* <img src={card.url} alt='noIMG'/> */}
                <li>{card.quantity} - {card.name}</li>
              </>
            )
          })
        }
    </div>
  );
}

function ImportModal(){
  const {deck, setDeck} = useContext(DeckContext)
  const [open, setOpen] = useState(false)
  const [textData, setTextData] = useState('')
  const [importData, setImportData] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  //--------------custom function to handle the storing of the imported cards-----------------\\
  const handleDataChange = (event)=>{
    setTextData(event.target.value)
    console.log(event.target.value)
  }

  const handleStoredData = ()=>{
    let storedData = textData.split('\n');
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
    setDeck(storedData);
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