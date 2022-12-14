import { useState } from 'react'
import ky from 'ky'
import { Loader } from './components/Loader.jsx'
import { ErrorMessage } from './components/ErrorMessage.jsx'
import { TornReviveData } from './components/TornReviveData.jsx'
import './App.scss'

function App() {
  const [state, setState] = useState('idle');
  const [userApiValue, setUserApiValue] = useState([])

  const apiHandler = async (userApiValue) => {
    const search = userApiValue
    try {
        setState('loading')
        const response = await ky.get(`https://api.torn.com/user/?selections=revives&key=${search}`).json()
        console.log(response)
        setState('complete')
    } catch (err) {
        setState('error')
        console.log(err)
    }
}

const getData = () => apiHandler(userApiValue)
const handleSearchChange = (e) => setUserApiValue(e.target.value)

  return (
    <div className="container">
      <header>
        <div className="screen-size"></div>
        <h1>Torn Revive Ledger</h1>
      </header>

      <div>
        <label htmlFor="userApi">Your API Key:</label>
        <input type="text" value={userApiValue} onChange={handleSearchChange} id="userApi" name="userApi" />
      </div>

      {/* <div>
        <label htmlFor="factionFilter">Faction filter:</label>
        <input type="text" value={factionSearchValue} id="factionFilter" name="factionFilter" />
      </div> */}

      <div>
        <button onClick={getData}>Get Data!</button>
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
          <TornReviveData getData={getData} userApiValue={userApiValue} setUserApiValue={setUserApiValue} setState={setState} />
        </div>
      )}

    </div>
  )
}

export default App
