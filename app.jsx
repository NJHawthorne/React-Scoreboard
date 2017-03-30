var players = [
  {
    name: "Nate Hawthorne",
    score: 24,
    id: 1
  }, {
    name: "Bob Dylan",
    score: 75,
    id: 2
  }, {
    name: "Stephen Hawking",
    score: 75,
    id: 3
  }
];

function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
};

function Counter(props) {
  return (
      <div className="counter">
        <button className="counter-action decrement" onClick={() => props.adjustScore(-1)}> - </button>
        <div className="counter-score"> {props.score} </div>
        <button className="counter-action increment" onClick={() => props.adjustScore(1)}> + </button>
      </div>
    );
}
  
Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  adjustScore: React.PropTypes.func.isRequired  
}
  
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} adjustScore={props.onScoreChange}/>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired
};

var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired
    })).isRequired
  },
  getDefaultProps: function() {
    return {
      title: "Scoreboard"
    };
  },
  getInitialState: function() {
    return {
      players: this.props.initialPlayers
    };
  },
  onScoreChange: function(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  },
  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} />
        <div className="players">
          {this.state.players.map(function(player, index) {
            return (
              <Player
                onScoreChange={(delta) => this.onScoreChange(index, delta)}  
                name={player.name} 
                score={player.score} 
                key={player.id} />
            )
          }.bind(this))}
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Application players={players}/>, document.getElementById('container'));