import React, {useState} from 'react'
import { Box,Modal} from "@mui/material";

function CreateDeck(){
  const [deck, setDeck] = useState()
  let value = {deck, setDeck}
  return (
    <div className="App">
      <input type='text' className='cardSearch'/>
      <ImportModal value={value}/>
    </div>
  );
}

function ImportModal({deck, setDeck}){
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
        name: info[1]
      }
      
      return card;
    })
    setImportData(storedData);
    console.log(storedData)
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