import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import locales from '../../services/locales';
import {PaperButton, PaperLayout, PaperCol, PaperForm, PaperInput, PaperSelect, PaperRadio, PaperCheckbox} from 'react-paper-css';
import '../../style/global.css';

const searchSchema = Yup.object().shape({
    query: Yup.string().required(),
    locale: Yup.string(),
    per_page: Yup.number(),
})

const Home = ({
    videos,
    searchVideos,
    favoriteVideos,
}) => (
    <div className="container">
        <div className="favorite-list">
            {
                favoriteVideos.length ? (
                    <section className="list-container">
                        <div className="title animate__animated animate__tada">Your Favorites!</div>
                        <ul className="favorite-list-ul">
                            {
                                favoriteVideos.map(video => (
                                    <div className="row video-card" key={video.id}>
                                        <div className="col s12 m7">
                                        <div className="card small">
                                            <div className="card-image">
                                                <img src={video.cover} alt="thumbnail" />
                                            </div>
                                            <div className="card-content">
                                                {video.title}
                                            </div>
                                            <div className="card-action">
                                                <Link to={`/${video.id}`}>
                                                    <button className="paper-btn btn-primary-outline">Watch this video</button>
                                                </Link>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </ul>
                    </section>
                ) : ('')
            }
        </div>
        <div className="popular-list">
        <div className="title animate__animated animate__tada">Most Popular Videos!</div>
            {
                videos && videos.length ? (
                    <ul className="popular-list-ul">
                        {
                            videos.map(video => (
                                <div className="row video-card" key={video.id}>
                                    <div className="col s12 m7">
                                    <div className="card small">
                                        <div className="card-image">
                                            <img src={video.cover} alt="thumbnail" />
                                        </div>
                                        <div className="card-content">
                                            <p>{video.title}</p>
                                        </div>
                                        <div className="card-action">
                                            <Link to={`/${video.id}`}>
                                                <button className="paper-btn btn-primary-outline">Watch this video</button>
                                            </Link>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            ))
                        }
                    </ul>
                ) : (null)
            }
        </div>
    </div>
)

export default Home;