import React, { useState } from 'react';
import './css/App.css';
import data from './leaderboard-data.json';
import Leaderboard from './components/Leaderboard/Leaderboard';
import ManagePlayersForm from './components/Form/ManagePlayersForm';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [playerRows, setRows] = useState(data.leaderboard.players);
  const prepareData = ({
    firstName,
    lastName,
    country,
    currentScore,
    totalStrokes,
  }) => {
    return {
      total: +currentScore,
      total_strokes: +totalStrokes,
      player_id: 33,
      player_bio: {
        first_name: firstName,
        last_name: lastName,
        country,
      },
      current_position: null,
    };
  };

  return (
    <ErrorBoundary>
      <div className='App container'>
        <ManagePlayersForm
          onSubmit={(data) => {
            let submitData = prepareData(data);
            setRows((currentRows) => {
              const dataToSubmit = [
                {
                  ...submitData,
                },
                ...currentRows,
              ];
              return dataToSubmit;
            });
          }}
        />
        <Leaderboard playerRows={playerRows} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
