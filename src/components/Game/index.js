import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Tiles from "../Tiles"
import GameSuccess from "../GameSuccess"
import './index.css'

const tilesEmojies = ["🐶","🚵‍♀️","🎳","🛝","🍀", "🌈", "💎","🏴","❤️","⏳","📡","🔋","🚀","🛸","🚁","🛶","🐶","🚵‍♀️","🎳","🛝","🍀", "🌈", "💎","🏴","❤️","⏳","📡","🔋","🚀","🛸","🚁","🛶"]

const Game = () => {
    const [score,setScore] = useState(0)
    const [time,setTime] = useState(0)
    const [timerId,setTimerId] = useState(null)
    const [username,setUsername]= useState("")
    const [tiles,setTiles]=useState([])
    const [matchedList,setMatchedList] = useState([])
    const [openList,setOpenList] = useState([])
    const [isComplected,setIsComplected] = useState(false)
    const nav = useNavigate()

    const timerFormat=(secs)=>{
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    useEffect(() => {
        const name = localStorage.getItem('username')
        if(name){
            setUsername(name)
            setTiles(tilesEmojies.sort(()=>Math.random()-0.5))
            //setTiles(tilesEmojies)
            const intervalId = setInterval(() => setTime(time => time + 1), 1000);
            setTimerId(intervalId)
            return () => clearInterval(intervalId);
        }else{
            nav('/login')
        }
      }, [nav]);

      useEffect(()=>{
        console.log(matchedList,tiles)
        if(matchedList.length===tiles.length && matchedList.length!==0){
            clearInterval(timerId)
            setIsComplected(true)
        }
      },[matchedList,timerId,tiles])

      const tileClicked = (index) => {
        if (openList.length<2){
            const newList=[...openList,index]
            setOpenList(newList)
            console.log(newList)
            if(newList.length===2){
                if(tiles[newList[0]]===tiles[newList[1]]){
                    setMatchedList([...matchedList,tiles[newList[0]],tiles[newList[1]]])
                    setScore(prevScore=>prevScore+2)
                    setOpenList([])
                }else{
                    setScore(prevScore=>prevScore-1)
                    let count=1
                    const intervel = setInterval(()=>{
                        if (count===2){
                            setOpenList([])
                            clearInterval(intervel)
                        }
                        count+=1
                    },1000)
                }
            }
        }
      }


    return(
        <div className="game-container">
            <h1>Mahajone Game</h1>

            <section className="score-time-container">
                <p>Score: {score} </p>
                <p>Time: {timerFormat(time)}</p>
            </section>

            <div className="game">
                <h3 className="username">Welcome {username} 👋</h3>
                {isComplected?<GameSuccess score={score} time={timerFormat(time)} />:
                <ul>
                    {tiles.map((tile,index)=>(<Tiles key={index} 
                        tile={tile} index={index} 
                        show={matchedList.includes(tile) || openList.includes(index)}
                        tileClicked={tileClicked} 
                    />))}
                </ul>}
            </div>
        </div>
    )
}

export default Game