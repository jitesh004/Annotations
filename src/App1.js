import React, { Fragment } from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMin: 0,
      inputSec: 0,
      countMin: 0,
      countSec: 0,
      paused: false,
      intervalId: "",
    };
  }

  startTimer = () => {
    clearInterval(this.state.intervalId);
    if (this.state.inputSec > 60 || this.state.countSec > 60) {
      const newMin = this.state.inputMin + Math.floor(this.state.inputSec / 60);
      this.setState({
        inputMin: newMin,
        inputSec: Math.round(this.state.inputSec % 60),
        countMin: newMin,
        countSec: Math.round(this.state.inputSec % 60),
        paused: false,
      });
    } else {
      this.setState({
        countMin: this.state.inputMin,
        countSec: this.state.inputSec,
        paused: false,
      });
    }

    const intervalId = setInterval(() => {
      if (
        (this.state.countMin !== 0 || this.state.countSec !== 0) &&
        !this.state.paused
      ) {
        this.setState({
          countSec: this.state.countSec - 1,
        });
        if (this.state.countSec == 0) {
          this.setState({
            countSec: 59,
            countMin: this.state.countMin - 1,
          });
        }
      }
    }, 1000);
    this.setState({
      intervalId,
    });
  };

  pauseResumeTimer = () => {
    this.setState({
      paused: !this.state.paused,
    });
  };

  reset = () => {
    this.setState({
      inputMin: 0,
      inputSec: 0,
      countMin: 0,
      countSec: 0,
    });
    clearInterval(this.state.intervalId);
  };

  render() {
    return (
      <Fragment>
        <label>
          <input
            value={this.state.inputMin}
            type="number"
            onChange={(e) =>
              this.setState({ inputMin: parseInt(e.target.value) })
            }
          />
          Minutes
        </label>
        <label>
          <input
            value={this.state.inputSec}
            type="number"
            onChange={(e) =>
              this.setState({ inputSec: parseInt(e.target.value) })
            }
          />
          Seconds
        </label>

        <button onClick={() => this.startTimer()}>START</button>
        <button onClick={() => this.pauseResumeTimer()}>PAUSE / RESUME</button>
        <button onClick={() => this.reset()}>RESET</button>

        <h1 data-testid="running-clock">
          {String(this.state.countMin).length > 1
            ? "" + this.state.countMin
            : "0" + this.state.countMin}
          :
          {String(this.state.countSec).length > 1
            ? "" + this.state.countSec
            : "0" + this.state.countSec}
        </h1>
      </Fragment>
    );
  }
}

export default App;
