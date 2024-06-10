import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import PropTypes from 'prop-types'

const Single = ({review}) => {
    const {reviewerName,ratingPoint,reviewerImage,} = review
    return (
        <div className='py-3 px-1 shadow-md rounded-md'>
            <div className="flex justify-center items-center">
            <img className="w-52 h-32" src={reviewerImage} alt="" />
            </div>
            <div className='text-xs md:text-base'>
                <p>Name: {reviewerName}</p>
                <p><Rating
                            style={{ maxWidth: 100 }}
                            value={ratingPoint}
                            readOnly
                        />
                        </p>
            </div>
        </div>
    );
};

Single.propTypes ={
    review:PropTypes.object
}

export default Single;