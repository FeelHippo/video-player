import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { userPostLogin, clearSnackbar } from '../../store/actions/authentication';
import {PaperButton, PaperLayout, PaperCol, PaperForm, PaperInput, PaperSelect, PaperRadio, PaperCheckbox} from 'react-paper-css';
import '../../style/global.css';

// custom hook
import { useInput } from '../hooks/input-hook';

const Login = props => {
    // state variables
    const [redirectPage, setRedirect] = useState(false);
    // custom hook functionalities
    const { value: username, bind: bindUsername } = useInput('');
    const { value: password, bind: bindPassword } = useInput('');
    // snackbar errors
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (props.snackbar.message) {
            enqueueSnackbar(props.snackbar.message);
            props.clearSnackbar();
        }
    }, [props, enqueueSnackbar])

    const submitForm = evt => {
        evt.preventDefault();

        props.userPostLogin({
            username,
            password,
        }).then(response => {
            if (response) {
                setRedirect(true);
            }
        })
    };

    return (
        <> {redirectPage ? <Redirect to='/home' /> : null}
            <div className="container">
                <form onSubmit={submitForm} className="form form-group">
                    <h3 className="title">Login</h3>
                    <section className="inputs">
                        <input type="text" {...bindUsername} placeholder="Username" />
                        <input type="password" {...bindPassword} placeholder="Password" />
                    </section>
                    <section className="action">
                    <button className="paper-btn btn-primary-outline" type="submit">Access</button>
                        <Link to='/signup'>
                            <button className="btn-success-outline">I am not registered</button>
                        </Link>
                    </section>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        redirect: state.redirect,
        snackbar: state.snackbar,
    }
}

const mapDispatchToProps = dispatch => ({
    userPostLogin: userInfo => dispatch(userPostLogin(userInfo)),
    clearSnackbar: () => dispatch(clearSnackbar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)