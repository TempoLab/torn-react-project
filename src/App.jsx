import { useState } from 'react'
import ky from 'ky'
import { Loader } from './components/Loader.jsx'
import { ErrorMessage } from './components/ErrorMessage.jsx'
import { TornReviveData } from './components/TornReviveData.jsx'
import './App.scss'

function App() {
  const [state, setState] = useState('idle');
  const [userApiValue, setUserApiValue] = useState('')
  const [reviveData, setReviveData] = useState([])

  const apiHandler = async (userApiValue) => {
    const search = userApiValue
    try {
        setState('loading')
        const response = await ky.get(`https://api.torn.com/user/?selections=revives&key=${search}`).json()
        const responseArray = Object.values(response.revives)
        const usersRevivedAsObject = responseArray.reduce((accumulator, userReviveEntry) => {
          const localAccumulator = accumulator[userReviveEntry.target_id] !== undefined ? accumulator : {
            ...accumulator,
            [userReviveEntry.target_id]: {
              name: userReviveEntry.target_name,
              id: userReviveEntry.target_id,
              faction: userReviveEntry.target_factionname,
              reviveSuccess: 0,
              reviveFailure: 0,
            }
          }
          const target = localAccumulator[userReviveEntry.target_id]
          if (userReviveEntry.result === 'success') {
            return {
              ...localAccumulator,
              [userReviveEntry.target_id]: {
                ...target,
                reviveSuccess: target.reviveSuccess + 1
              }
            }
          }
          return {
            ...localAccumulator,
            [userReviveEntry.target_id]: {
              ...target,
              reviveFailure: target.reviveFailure + 1
            }
          }
        })
        const usersRevivedAsAnArray = Object.values(usersRevivedAsObject)
        setReviveData(usersRevivedAsAnArray)
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

      <div>
        <label htmlFor="factionFilter">Faction filter:</label>
        <input type="text" id="factionFilter" name="factionFilter" />
      </div>

      <div>
        <button disabled={state === 'loading'} onClick={getData}>Get Data!</button>
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
          <TornReviveData reviveData={reviveData} />
        </div>
      )}

    </div>
  )
}

export default App