import { useState, useMemo } from 'react'
import ky from 'ky'
import { Loader } from './components/Loader.jsx'
import { ErrorMessage } from './components/ErrorMessage.jsx'
import { TornReviveData } from './components/TornReviveData.jsx'
import './App.scss'

const GET_ID_REGEX = /XID\=([0-9]+)(?:"\>|\>)(.+)\<.*/gm;
const STRIP_ANCHOR_REGEX = /(<\/?[a|A][^>]*>|)/gm;

function App() {
  const [state, setState] = useState('idle');
  const [userApiValue, setUserApiValue] = useState('')
  const [factionFilterValue, setFactionFilterValue] = useState('')
  const [reviveResponseArray, setReviveResponseArray] = useState([])
  const [eventResponseArray, setEventResponseArray] = useState([])

  const usersRevivedAsObject = useMemo(() => {
    return reviveResponseArray.reduce((accumulator, userReviveEntry) => {
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
    }, {})
  }, [reviveResponseArray])

  const parsedUserEventsAsObject = useMemo(() => {
    return eventResponseArray
      .map(item => ({
        match: GET_ID_REGEX.exec(item),
        message: item.replaceAll(STRIP_ANCHOR_REGEX, "")
      }))
      .filter(item => item.match !== null)
      .map(item => {
        return {
          id: parseInt(item.match[1]),
          message: item.message
        }
      })
  }, [eventResponseArray])

  const usersRevivedAsAnArray = useMemo (() => {
    return Object.values(usersRevivedAsObject)
  }, [usersRevivedAsObject])

  const parsedUserEventsAsAnArray = useMemo (() => {
    return Object.values(parsedUserEventsAsObject)
  }, [parsedUserEventsAsObject])

  const finalData = useMemo(() => {
    return usersRevivedAsAnArray.map(item => {
      return {
        ...item,
        reviveTotal: item.reviveSuccess + item.reviveFailure,
        events: parsedUserEventsAsAnArray.filter(log => log.id === item.id),
        faction: item.faction
      }
    })
  }, [usersRevivedAsObject, parsedUserEventsAsObject])

  const apiHandler = async (userApiValue) => {
    const search = userApiValue
    try {
      setState('loading')
      const reviveResponse = await ky.get(`https://api.torn.com/user/?selections=revives&key=${search}`).json()
      const eventResponse = await ky.get(`https://api.torn.com/user/?selections=events&key=${search}`).json()
      setReviveResponseArray(Object.values(reviveResponse.revives))
      setEventResponseArray(Object.values(eventResponse.events).map(item => item.event))
      setState('complete')
    } catch (err) {
      setState('error')
      console.log(err)
    }
  }

  const getData = () => apiHandler(userApiValue)
  const handleSearchChange = (e) => setUserApiValue(e.target.value)
  const handleFactionFilterChange = (e) => setFactionFilterValue(e.target.value)

  return (
    <div className="container">
      <header>
        <div className="screen-size"></div>
        <h1>Torn Revive Ledger</h1>
      </header>

      <div>
        <label htmlFor="userApi">Your API Key: </label>
        <input type="text" value={userApiValue} onChange={handleSearchChange} id="userApi" name="userApi" />
      </div>

      <div>
        <label htmlFor="factionFilter">Faction filter:</label>
        <input type="text" value={factionFilterValue} onChange={handleFactionFilterChange} id="factionFilter" name="factionFilter" />
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
          <TornReviveData finalData={finalData} />
        </div>
      )}

    </div>
  )
}

export default App