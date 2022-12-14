import { useState } from 'react'
import { Loader } from './components/Loader.jsx'
import { ErrorMessage } from './components/ErrorMessage.jsx'
import { TornReviveData } from './components/TornReviveData.jsx'
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
          <Loader />
        </div>
      )}

      {state === 'error' && (
        <div>
          <ErrorMessage />
        </div>
      )}

      {state === 'complete' && (
        <div>
          <TornReviveData />
        </div>
      )}

    </div>
  )
}

export default App
