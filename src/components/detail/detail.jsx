import React from 'react';
import { Link } from 'react-router-dom';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import ReactHlsPlayer from 'react-hls-player';

const PrintDetail = ({
    video,
    markFavorite,
    authenticated,
    favorite
}) => (
    <div className="container detail">
        {
            video.id ? (
                <>
                    <div class="video-container">
                        <ReactHlsPlayer
                            url={ video.url }
                            autoplay={false}
                            controls={true}
                            width="100%"
                            height="auto"
                    />
                    </div>
                    <div className="video-input">
                        <Link to={`/home`}>
                            <button className="paper-btn btn-primary-outline">Back to Home Page</button>
                        </Link>
                        <div className="favSection">
                            {
                                authenticated === true ? (
                                    <div onClick={() => markFavorite()}>
                                        {
                                            favorite ? (
                                                <MdFavorite />
                                            ) : (
                                                <MdFavoriteBorder />
                                            )
                                        }
                                    </div>
                                ) : ('')
                            }
                        </div>
                    </div>
                </>
            ) : (
                <div>We are waiting to your video</div>
            )
        }
    </div>
)

export default PrintDetail;