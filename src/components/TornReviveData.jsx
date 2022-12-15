
export const TornReviveData = ({reviveData}) => {

    return (
        <div className="user-card-wrapper">
            {reviveData.map((item) => (
            <div className="user-card">
                <div className="card-container">
                    <div>{item.target_name}[{item.target_id}]</div>
                    <div>Revives: 12</div>
                    <div>Successes: 10</div>
                    <div>Failures: 2</div>
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