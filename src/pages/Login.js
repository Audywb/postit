import React,{ useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useForm } from '../util/hooks';
import {AuthContext} from '../context/auth'


function Login(props) {

    const context = useContext(AuthContext)

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_,{data:{login:userData}}){
            context.login(userData)
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables:values
    });

    function loginUserCallback(){
        loginUser();
    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'กำลังโหลด':''}>
            <div>
             <img style={{width:120,marginLeft:85,marginTop:20}} src="https://sv1.picz.in.th/images/2021/03/14/D1gs9W.png"/>
             <span style={{fontSize:60,marginLeft:10}}>Login</span>
             <p style={{marginTop:20}}> </p>
            </div>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />

                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />

                <Button type="submit" primary>
                    Login
                </Button>

            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error massage">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        id
        email
        username
        createdAt
        token
    }
}
`;
export default Login;