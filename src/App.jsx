import { useState } from 'react'
import './App.scss'

function App() {
  const [state, setState] = useState('idle');

  return (
    <div className="container">
      <header>
        <div className="screen-size"></div>
        <h1>Torn Revive Ledger</h1>
      </header>

      <div>
        <label htmlFor="userApi">Your API Key:</label>
        <input type="text" id="userApi" name="userApi" />
      </div>

      <div>
        <label htmlFor="factionFilter">Faction filter:</label>
        <input type="text" id="factionFilter" name="factionFilter" />
      </div>

      <div>
        <button>Get Data!</button>
      </div>

      {state === 'loading' && (
        <div>
          <p>loading...</p>
        </div>
      )}

      {state === 'error' && (
        <div>
          <p>error message</p>
        </div>
      )}

      {state === 'complete' && (
        <div>
          <p>App</p>
        </div>
      )}

    </div>
  )
}

export default App
