
export const TornReviveData = ({ userDataAsAnArrayFilteredByFaction }) => {

    return (
        <div className="user-card-wrapper">
            {userDataAsAnArrayFilteredByFaction.map((item) => (
                <div className="user-card">
                    <div className="card-container">
                        <div>{item.name}[{item.id}]</div>
                        <div>Revives: {item.reviveTotal}</div>
                        <div>Successes: {item.reviveSuccess}</div>
                        <div>Failures: {item.reviveFailure}</div>
                        <div className="event-log-box">
                            {item.events.map((log) => (
                                <p><a target="_blank"
                                    href={`http://www.torn.com/profiles.php?XID=${log.id}`}>
                                    {log.message}
                                </a></p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}