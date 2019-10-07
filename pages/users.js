import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Cookies from 'universal-cookie'
import Router from 'next/router';

class Users extends React.Component {
    static async  getInitialProps({ req, res, query }) {

        let token;

        const isServer = !!req;
        if (isServer) {
            const cookies = new Cookies(req.headers.cookie);
            token = cookies.get('token');
        }
        else {
            token = query.token;
        }

        if (token) {

            //verify token 
            const resTokenVerify = await fetch('https://beta.stockzoom.com/api-token-verify/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token
                })
            })
            const resTokenVerifyJson = await resTokenVerify.json();

            if (resTokenVerifyJson.token !== token) {
                //refresh token 
                const resTokenRefresh = await fetch('https://beta.stockzoom.com/api-token-refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token
                    })
                })
                const resTokenRefreshJson = await resTokenRefresh.json();
                token = resTokenRefreshJson.token;
            }
        }

        const response = await fetch('https://beta.stockzoom.com/api/v1/me/portfolios/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const resJson = await response.json();

        return {
            resJson: resJson,
            token: token
        }
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Portfolio-List</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <h1>My Portfolio List</h1>
                {
                    this.props.resJson.results.map((result, i) => (
                        <React.Fragment key={i} >
                            <div className="list-container">
                                <div>
                                    <span className="col-1">
                                        <Link href={`/userDetails?alias=${result.alias}&token=${this.props.token}`}>
                                            <a>{result.name}</a>
                                        </Link>
                                    </span>
                                    <span className="col-2">
                                        {result.account_number}
                                    </span>
                                </div>
                            </div>

                        </React.Fragment>
                    ))
                }

                <style jsx>
                    {`
                h1{
                    display: flex;
                    justify-content: center;
                    color: #0cc10c;
                }
                .col-1{
                    padding-left : 10px;
                    display: inline;
                    float: left;
                    width:150px;
                }
                .col-2{
                    padding-left : 10px;
                    display: inline;
                    float: left;
                }

                .list-container{
                    margin: auto;
                    padding-left: 0;
                    display: flex;
                    justify-content: center;
                    list-style: none;
                }
            `} </style>
            </div>
        )
    }
}

// Users.getInitialProps = async function () {
//     console.warn("Token", Users.state.val);
//     const res = await fetch('https://beta.stockzoom.com/api/v1/me/portfolios/', {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMTc1NDYsInVzZXJuYW1lIjoid2FycmVuLmJ1ZmZldEB3aWxsYW5kc2tpbGwuc2UiLCJleHAiOjE1NzE0MjcyNDQsImVtYWlsIjoid2FycmVuLmJ1ZmZldEB3aWxsYW5kc2tpbGwuc2UiLCJvcmlnX2lhdCI6MTU3MDIxNzY0NH0.loFdAfQINX4fsHMZMcUP7tuLPs8BJTyXMyQkoR-GHGs",

//         }
//     })
//     const resJson = await res.json();
//     console.log(resJson)

//     return {
//         resJson
//     }
// }

export default Users;





