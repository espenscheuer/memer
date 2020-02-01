import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './App.css';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Search } from '@material-ui/icons';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [text, setText] = useState('')
  const[memes, setMemes] = useState([])
  const[loading, setLoading] = useState(false)
  const[value, setValue] = useState(50)
  const[rating, setRating] = useState('G')

  async function getMemes(){
    setLoading(true)
    const r = await fetch('https://api.giphy.com/v1/gifs/search?q=' + text + '&api_key=289mJgS4atI7JmmYEGLaCzK2RFHpqG0l&limit=' + value + "&rating=" + rating)
    const body = await r.json()
    setMemes(body.data)
    setText('')
    setLoading(false)
  }

  return (
    <div className="App">
      <header className="header">
        <div className = "search-bar">
          <div className = "search">
            <TextField fullWidth id="outlined" 
              label="find memes" 
              variant = "outlined" 
              value = {text}
              onChange={e=> setText(e.target.value)}
              onKeyPress={e => {
                if(e.key==='Enter'){
                  if(text){ 
                    getMemes()
                  }
                }
              }}/>
          </div>
          <div className = "btn"> 
            <Button variant="outlined" color="primary"
              onClick = {getMemes}>
                <Search/>
            </Button>
          </div>
          <div className = "loading">
            {loading && <CircularProgress />}
          </div>  
        </div>
        <div className = "search-settings">
          results
          <div className = "slider">
            <Slider
              defaultValue={50}
              getAriaValueText={setValue}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={50}
              marks
              min={50}
              max={500}
            />
          </div>
          rating
          <div className = "select">
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rating}
              onChange={e=> setRating(e.target.value)}
            >
              <MenuItem value={"G"}>G</MenuItem>
              <MenuItem value={"PG"}>PG</MenuItem>
              <MenuItem value={"PG13"}>PG-13</MenuItem>
            </Select>
          </FormControl>
 
          </div> 
        </div>
      </header>
      <div className = "meme-wrap">
        {memes.map((meme, i) =>  <Meme key = {i} {...meme}/> )}
      </div>
    </div>
  );
}

function Meme({title, images}) {
  const url = images.fixed_height.url
  return <div className = "meme" onClick = {() => window.open(url, '_blank')}>
    <img alt = "meme" src = {url}/> 
    <div className ="meme-title"> {title} </div> 
  </div>
}

export default App;
