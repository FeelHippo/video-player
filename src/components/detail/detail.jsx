import React from 'react';
import { Link } from 'react-router-dom';

const PrintDetail = ({
    _id,
    video,
    markFavorite,
    authenticated,
    favorite
}) => (
    <div>
        <section>
            <h1>Enjoy this video by {video.user.name}</h1>
        </section>
        <div class="video-container">
            <iframe width="853" height="480" src={video.video_files.link} frameborder="0" allowfullscreen></iframe>
        </div>
        <div>
            <Link to={`/`}>
                <button>Back to Home Page</button>
            </Link>
            <div>
                {
                    authenticated === true ? (
                        <div>
                            <label>Favorite</label>
                            <div onClick={() => markFavorite()}>
                                {
                                    favorite ? (
                                        <img src={require('../../icons/star_full.svg')} alt='favorite' />
                                    ) : (
                                        <img src={require('../../icons/star_empty.svg')} alt='favorite' />
                                    )
                                }
                            </div>
                        </div>
                    ) : ('')
                }
            </div>
        </div>
    </div>
)

export default PrintDetail;