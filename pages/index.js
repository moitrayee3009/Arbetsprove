import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import Head from 'next/head';
import React from 'react';
// import { Cookies } from 'react-cookie';
import Cookies from 'universal-cookie'
import Link from 'next/link';
import Layout from '../components/Layout';
//import Style from '../styles/sass/style.scss';


class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }



    onSubmit = async function () {
        const res = await fetch('https://beta.stockzoom.com/api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: this.state.password,
                email: this.state.email
            })
        })
        const resJson = await res.json();
        const cookies = new Cookies();
        cookies.set('token', resJson.token);
        //Router.push("/users?token=" + resJson.token);

        //https://stackoverflow.com/questions/55182529/next-js-router-push-with-state
        Router.push({
            pathname: '/users',
            query: { token: resJson.token }
        });
    }


    render() {
        return (
            < section >
                <Head>
                    <title>stockzoom </title>
                </Head>
                <div className="container">
                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={(e) => this.onChange(e)}
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => this.onChange(e)}

                    />
                    <button type="submit" onClick={() => this.onSubmit()}>Submit</button>


                    <style jsx > {`
                        .container {
                            position: relative;
                            width: 30%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            padding:  70px 0;
                            box-sizing: border-box;
                            margin:  auto;
                        }

                        .container input {
                            margin: 10px 0;
                            background-color: #fff;
                            background: #fff;
                            padding: 13px 16px 16px;
                            border: none;
                            font-size: 20px;
                            color: #242424;
                            outline: none;
                            border-radius: 3px;
                            font-weight: 600;
                            box-shadow: 0 0 0 1px rgba(41, 41, 41, 0.1) inset, 0 3px 4px 0px rgba(41, 41, 41, 0.1) inset;
                            transition: 0.15s;
                        }

                        .container button {
                            margin: 10px;
                            background: #40c3dd !important;
                            border-radius: 5px;
                            color: #fff !important;
                            font-size: 20px;
                            font-weight: 600;
                            height: 53px;
                            transition: all 0.2s ease;
                        }

                `} </style>
                </div>
                )
            </section >
        )
    }
};


export default Index;

