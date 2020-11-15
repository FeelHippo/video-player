import React from 'react';
import { Link } from 'react-router-dom';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

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
                    <section>
                        <h1 className="title">Enjoy this video by {video.user.name}</h1>
                    </section>
                    <div class="video-container">
                        <iframe width="853" height="480" src={video.video_files[0].link} frameborder="0" allowfullscreen title="video-player"></iframe>
                    </div>
                    <div className="video-input">
                        <Link to={`/home`}>
                            <button className="paper-btn btn-primary-outline">Back to Home Page</button>
                        </Link>
                        <div>
                            {
                                authenticated === true ? (
                                    <div>
                                        <label>Favorite</label>
                                        <div onClick={() => markFavorite()}>
                                            {
                                                favorite ? (
                                                    <MdFavorite />
                                                ) : (
                                                    <MdFavoriteBorder />
                                                )
                                            }
                                        </div>
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