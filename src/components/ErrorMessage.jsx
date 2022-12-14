import errorImg from '../assets/errorImg.jpg'

export const ErrorMessage = () => {

    return (
        <div>
            <div className='error-img-wrapper'>
                <img className='error-img' src={errorImg} />
            </div>
            <p>Woah there, looks like you've made a mistake! Maybe check your API Key?</p>
        </div>
    )
}