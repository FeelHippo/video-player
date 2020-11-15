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
        <div>
            <Formik 
                initialValues={{
                    query: '',
                    locale: 'en-US',
                    per_page: 20,
                }}
                validationSchema={ searchSchema }
                enableReinitialize={ true }
                onSubmit={
                    values => {
                        searchVideos(values);
                    }
                }
            >
                {
                    ({
                        values, errors, touched, setFieldValue
                    }) => (
                        <Form className="search-nav">
                            <Field name='query' placeholder='search our archive' />
                            {/* {
                                errors.query && touched.query ?
                                    (
                                        <div>{errors.query}</div>
                                    ) : null
                            } */}
                            <Field name="locale" as="select" id="locale">
                                <option value="" key="default">Select your language</option>
                                {locales && locales.length ? (
                                    locales.map((tag, i) => {
                                        return ( <option value={tag} key={i}>{tag}</option> )
                                    })
                                ) : (
                                    ''
                                )
                                }
                            </Field>
                            {
                                errors.locale && touched.locale ?
                                    (
                                        <div>{errors.locale}</div>
                                    ) : null
                            }
                            <button className="btn-success-outline" type="submit">search</button>   
                        </Form>
                    )
                }
            </Formik>
        </div>
        <div className="favorite-list">
            {
                favoriteVideos.length ? (
                    <section>
                        <div className="title">Your Favorites!</div>
                        <ul className="favorite-list-ul">
                            {
                                favoriteVideos.map(video => (
                                    <div className="row" key={video.id}>
                                        <div className="col s12 m7">
                                        <div className="card small">
                                            <div className="card-image">
                                                <img src={video.image} alt="thumbnail" />
                                                <span className="card-title">Card Title</span>
                                            </div>
                                            <div className="card-content">
                                                <p>Courtesy of: {video.user.name} - follow him: {video.user.url}</p>
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
            {
                videos && videos.length ? (
                    <ul className="popular-list-ul">
                        {
                            videos.map(video => (
                                <div className="row" key={video.id}>
                                    <div className="col s12 m7">
                                    <div className="card small">
                                        <div className="card-image">
                                            <img src={video.image} alt="thumbnail" />
                                            <span className="card-title">Card Title</span>
                                        </div>
                                        <div className="card-content">
                                            <p>Courtesy of: {video.user.name} - follow him: {video.user.url}</p>
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