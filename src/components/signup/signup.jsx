import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { userPostSignup, clearSnackbar } from '../../store/actions/authentication';
import { useInput } from '../hooks/input-hook';
import {PaperButton, PaperLayout, PaperCol, PaperForm, PaperInput, PaperSelect, PaperRadio, PaperCheckbox} from 'react-paper-css';
import '../../style/global.css';

const SignUp = props => {
    // state variables
    const [redirectPage, setRedirect] = useState(false);
    // import custom hook functionalities
    const { value: username, bind: bindUsername } = useInput('');
    const { value: email, bind: bindEmail } = useInput('');
    const { value: password, bind: bindPassword } = useInput('');
    // snackbar errors
    const { enqueueSnackbar } = useSnackbar();
    
    useEffect(() => {
        if (props.snackbar.message) {
            enqueueSnackbar(props.snackbar.message);
            props.clearSnackbar();
        }
    }, [props, enqueueSnackbar]);

    const submitForm = evt => {
        evt.preventDefault();
        // redux authentication action
        props.userPostSignup({
            username,
            email,
            password,
        }).then(response => {
            if (response) {
                setRedirect(true);
            }
        })
    };

    return (
        <>  { redirectPage ? <Redirect to='/' /> : null }
            <div className="container">
                <form onSubmit={submitForm} className="form form-group">
                    <h3 className="title">Sign Up</h3>
                    <section className="inputs">
                        <input type="text" {...bindUsername} placeholder="choose your username" />
                        <input type="text" {...bindEmail} placeholder="... a password ..." />
                        <input type="password" {...bindPassword} placeholder="... and a password!" />
                    </section>
                    <section className="action">
                        <button className="paper-btn btn-primary-outline" type="submit">Register</button>
                        <Link to='/'>
                            <button className="btn-success-outline">I have an account</button>
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
    userPostSignup: userInfo => dispatch(userPostSignup(userInfo)),
    clearSnackbar: () => dispatch(clearSnackbar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);