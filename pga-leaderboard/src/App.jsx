import React, { useState } from 'react';
import './css/App.css';
import { generate } from 'shortid';
import playerData from './leaderboard-data.json';
import Leaderboard from './components/Leaderboard/Leaderboard';
import ManagePlayersForm from './components/Form/ManagePlayersForm';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [playerRows, setRows] = useState(playerData.leaderboard.players);
  const prepareData = (submitData) => {
    let {
      firstName,
      lastName,
      country,
      position,
      currentScore,
      totalStrokes,
    } = submitData;

    return {
      total: +currentScore,
      total_strokes: +totalStrokes,
      current_position: +position,
      player_id: generate(),
      player_bio: {
        first_name: firstName,
        last_name: lastName,
        country,
      },
    };
  };

  return (
    <ErrorBoundary>
      <div className='App container'>
        <ManagePlayersForm
          onSubmit={(data) => {
            let submitData = prepareData(data);
            console.log(data);
            setRows((currentRows) => {
              const dataToSubmit = [
                {
                  ...submitData,
                },
                ...currentRows,
              ];
              console.log(dataToSubmit);
              return dataToSubmit;
            });
          }}
        />
        <Leaderboard playerRows={playerRows} setRows={setRows} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
