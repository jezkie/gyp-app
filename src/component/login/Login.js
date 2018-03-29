import React, { Component } from 'react';
import { FormGroup, Col, ControlLabel, Button, Form, FormControl, Checkbox, Grid, Row } from 'react-bootstrap';
import { fakeAuth } from './auth';
import { Redirect } from 'react-router-dom';
import { auth, provider } from '../../conf/fire';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook';
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';
import { Divider } from 'semantic-ui-react';


const appTokenKey = "appToken";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { redirectToReferer: false }
        this.login = this.login.bind(this);
        this.loginWithFacebook = this.loginWithFacebook.bind(this);
    }

    login(event) {
        event.preventDefault();
        fakeAuth.authenticate((isAuthenticated) => {
            this.setState(
                { redirectToReferer: isAuthenticated }
            );
        });
    }

    loginWithFacebook() {
        auth.signInWithPopup(provider).then((result) => {
            let user = Object.assign({}, (({ displayName, photoURL }) => ({ displayName, photoURL }))(result.user));
            localStorage.setItem(appTokenKey, '1');
            localStorage.setItem('user', JSON.stringify(user));
            this.setState(
                { redirectToReferer: true }
            );
        })
    }

    render() {
        let { from } = this.props.location.state || { from: { pathname: '/home' } };
        from = (typeof from !== undefined) ? from : { from: { pathname: '/home' } };

        const { redirectToReferer } = this.state;
        if (redirectToReferer) {
            return (<Redirect to={from} />)
        }

        return (
            <div>
                <Grid>
                    <Form horizontal onSubmit={this.login}>
                        <Row>
                            <Col lg={6} lgOffset={3}>
                                
                                <Button type="button" onClick={() => this.loginWithFacebook()} block className="btnFacebook" ><FontAwesomeIcon icon={faFacebook} /> Login with Facebook</Button>
                                <Divider horizontal>OR</Divider>
                                <Button type="button" onClick={() => this.loginWithFacebook()} block className="btnGoogle" ><FontAwesomeIcon icon={faGoogle} /> Login with Google</Button>
                                <Divider horizontal>OR</Divider>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} lgOffset={3}>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={2}>Email</Col>
                                    <Col sm={10}>
                                        <FormControl type="email" placeholder="Email" />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={2}>Password</Col>
                                    <Col sm={10}>
                                        <FormControl type="password" placeholder="Password" />
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Checkbox>Remember me</Checkbox>
                                    </Col>
                                </FormGroup>
                                <Button type="submit" block bsStyle="primary">Sign in</Button>
                            </Col>
                        </Row>
                    </Form>
                </Grid>
            </div>

        );
    }
}

export default Login;