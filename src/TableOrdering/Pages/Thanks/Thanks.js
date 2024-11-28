import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

import './Thanks.css';
import thanksImg from '../../../Assets/Thank-you.jpg';
import { context } from '../../../Store';

function ThanksPage() {

    const [, dispatch] = useContext(context);
    const [stars, setStars] = useState([false, false, false, false, false]);
    const [email, setEmail] = useState("");

    const reviewLink = "https://www.google.com/search?q=naan+n+curry+halifax&rlz=1C1CHBF_enCA1100CA1101&oq=naan+n&gs_lcrp=EgZjaHJvbWUqDwgAECMYJxjjAhiABBiKBTIPCAAQIxgnGOMCGIAEGIoFMhUIARAuGCcYrwEYxwEYgAQYigUYjgUyBggCEEUYOTIMCAMQABgUGIcCGIAEMgcIBBAuGIAEMgcIBRAAGIAEMgcIBhAAGIAEMgcIBxAAGIAEMgcICBAAGIAEMgcICRAAGI8C0gEINDE5MWowajmoAgCwAgE&sourceid=chrome&ie=UTF-8#lrd=0x4b5a2177f7d843fd:0x241e50630b601f3d,3,,,,"

    const renderStars = () => {
        return stars.map((star, index) => {
            return (
                <FontAwesomeIcon key={index} icon={star ? solidStar : regularStar} className="thanks-review-star" onClick={() => updateStars(index)} />
            )
        })
    }

    const updateStars = (index) => {
        let newStars = [...stars].fill(false).fill(true, 0, index + 1);
        setStars(newStars);
    }


    const sendInvoice = () => {
        console.log("Invoice sent");
    }

    useEffect(() => {
        dispatch({
            type: 'payment_done'
        });
        // eslint-disable-next-line
    }, [])

    return (
        <div className='thanks-bg'>
            <div className="thanks-banner-div">
                <img src={thanksImg} className='thanks-banner' alt='Thank you' />
                <p className="thanks-title-text poppins-semibold">Please enter your email for the invoice!!</p>
                <div className='thanks-email-div'>
                    <input
                        name="email"
                        type='email'
                        placeholder='john@email.com'
                        className='thanks-email-input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faCircleArrowRight} className="thanks-email-btn" onClick={() => sendInvoice()} />
                </div>
                <div className='thanks-hr-line' />
                <p className="thanks-review-text">How was you dining experience at</p>
                <p className="thanks-review-text poppins-semibold">Naan N Curry?</p>
                <div className="thanks-review-star-div">
                    {renderStars()}
                </div>
                <div className="thanks-rate-us-div">
                    <a href={reviewLink} target='_blank' rel="noreferrer"><p className='thanks-rate-us-text'> Rate Us !</p></a>
                </div>
            </div>
        </div>
    )
}

export default ThanksPage;