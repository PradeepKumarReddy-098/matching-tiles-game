import './index.css'

const Tiles = ({show,index,tile,tileClicked}) => {
    return(
        <li key={index} className="tile">
            {<button className='tile-btn' onClick={()=>tileClicked(index)}>{show?tile:""}</button>}
        </li>
    )
}

export default Tiles