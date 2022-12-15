
export const TornReviveData = ({reviveData}) => {

    return (
        <div className="user-card-wrapper">
            {reviveData.map((item) => (
            <div className="user-card">
                <div className="card-container">
                    <div>{item.name}[{item.id}]</div>
                    <div>Revives: {item.reviveSuccess + item.reviveFailure}</div>
                    <div>Successes: {item.reviveSuccess}</div>
                    <div>Failures: {item.reviveFailure}</div>
                    <div className="event-log-box">
                        <p>log box <br />
                            log box <br />
                            log box <br />
                            log box <br />
                            log box <br />
                            log box <br />
                            log box <br />
                            log box <br />
                            log box <br />
                            log box <br /></p>
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}