import './index.css'

const GameSuccess = ({score,time}) => {
    return (
        <div className="success-view">
            <h1>Game Finished</h1>
            <section>
                <h2>Score: {score}</h2>
                <h2>Time Taken: {time}</h2>
            </section>
            <p>Refresh page to play again</p>
        </div>
    )
}

export default GameSuccess