import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import locales from '../../services/locales';

const searchSchema = Yup.object().shape({
    query: Yup.string().required(),
    locale: Yup.string(),
    per_page: Yup.number(),
})

const Home = ({
    videos,
    searchVideos,
}) => (
    <div>
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
                        <Form>
                            <Field name='query' placeholder='search our archive' />
                            {
                                errors.query && touched.query ?
                                    (
                                        <div>{errors.query}</div>
                                    ) : null
                            }
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
                        </Form>
                    )
                }
            </Formik>
        </div>
        <div>
            {
                videos.length ? (
                    <ul>
                        {
                            videos.map(video => (
                                <div class="row">
                                    <div class="col s12 m7">
                                    <div class="card">
                                        <div class="card-image">
                                            <img src={video.image} />
                                            <span class="card-title">Card Title</span>
                                        </div>
                                        <div class="card-content">
                                            <p>Courtesy of: {video.user.name} // follow him: {video.user.url}</p>
                                        </div>
                                        <div class="card-action">
                                            <Link to={`/${video.id}`}>
                                                <a href="#">Watch this video</a>
                                            </Link>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    </div>
)