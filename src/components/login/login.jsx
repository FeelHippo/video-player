import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { userPostLogin, clearSnackbar } from '../../store/actions/authentication';

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
        <> {redirectPage ? <Redirect to='/' /> : null}
            <div>
                <form onSubmit={submitForm}>
                    <h3>Login</h3>
                    <section>
                        <input type="text" {...bindUsername} placeholder="Username" />
                        <input type="password" {...bindPassword} placeholder="Password" />
                        <button type="submit">Access</button>
                    </section>
                    <section>
                        <Link to='/signup'>
                            <button>I am not registered</button>
                        </Link>
                        <Link to='/main'>
                            <button>Anonymous user</button>
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