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

var nextId = 4;

var AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired
  },
  onSubmit: function(e) {
    e.preventDefault();
    this.props.onAdd(this.refs.playerName.value);
    this.refs.playerName.value = "";
  },
  render: function() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" ref="playerName"/>
          <input type="submit" value="Add Player" />
        </form>
      </div>
    )
  }
});  
  
function Stats(props) {
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);
  
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )  
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired
};

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired
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
        <a className="remove-player" onClick={props.onRemove}>X</a>
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
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
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
  onPlayerAdd: function(name) {
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId
    });
    this.setState(this.state);
    nextId++;
  },
  onRemovePlayer: function(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },
  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players}/>
        <div className="players">
          {this.state.players.map(function(player, index) {
            return (
              <Player
                onScoreChange={(delta) => this.onScoreChange(index, delta)} 
                onRemove={() => this.onRemovePlayer(index)}
                name={player.name} 
                score={player.score} 
                key={player.id} />
            )
          }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd}/>
      </div>
    );
  }
});

ReactDOM.render(<Application players={players}/>, document.getElementById('container'));