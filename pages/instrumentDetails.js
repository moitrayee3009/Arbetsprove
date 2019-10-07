import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Cookies from 'universal-cookie'
import Link from 'next/link';


class instrumentDetails extends React.Component {

    render() {
        return (
            <div>
                <Head>
                    <title>Instrument-Detail</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>

                <h1> Instrument Details</h1>

                <div className="instrument-container">
                    <li>
                        <span className="instrument-label">Id : </span><span className="instrument-value">{this.props.instrument.id}</span>
                    </li>
                    <li>
                        <span className="instrument-label">Rating : </span><span className="instrument-value">{this.props.instrument.rating}</span>
                    </li>
                    <li>
                        <span className="instrument-label">Identifier : </span><span className="instrument-value">{this.props.instrument.identifier}</span>
                    </li>
                    <li>
                        <span className="instrument-label">Name : </span><span className="instrument-value">{this.props.instrument.name}</span>
                    </li>
                    <li>
                        <span className="instrument-label">Slug : </span><span className="instrument-value">{this.props.instrument.slug}</span>
                    </li>
                    <li>
                        <span className="instrument-label">Currency: </span><span className="instrument-value">{this.props.instrument.currency}</span>
                    </li>
                    <li>
                        <span className="instrument-label">Country: </span><span className="instrument-value">{this.props.instrument.country}</span>
                    </li>
                    <li>
                        <span className="instrument-label">Symbol: </span><span className="instrument-value">{this.props.instrument.symbol}</span>
                    </li>
                    <li>
                        <span className="instrument-label">isin: </span><span className="instrument-value">{this.props.instrument.isin}</span>
                    </li>
                    <li>
                        <span className="instrument-label">Model: </span><span className="instrument-value">{this.props.instrument.model}</span>
                    </li>
                    <li>
                        <span className="instrument-label">Kind: </span><span className="instrument-value">{this.props.instrument.kind}</span>
                    </li>
                    {/* <li>
                        <span className="instrument-label">Company-description: </span><span className="instrument-value">{this.props.instrument.company.description}</span>
                    </li> */}
                </div>

                <style jsx>{`

            h1{
                display: flex;
                justify-content: left;
                color: #0cc10c;
            }
            .instrument-label{
                padding-left : 10px;
                display: inline;
                float: left;
                width:150px;
            }
            .instrument-value{
                padding-left : 10px;
                display: inline;
                float: left;
            }

            .instrument-container li {
                margin: 0 auto;
                padding: 10px;
                display: flex;
                text-decoration: none;
            }
            `}</style>
            </div>
        )
    }
}
instrumentDetails.getInitialProps = async function ({ req, res, query }) {
    let alias;
    let token;

    const isServer = !!req;
    if (isServer) {
        const cookies = new Cookies(req.headers.cookie);
        token = cookies.get('token');
    }

    else {
        alias = query.alias;
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

    // https://beta.stockzoom.com/api/v1/instruments/18151/ 
    const response = await fetch('https://beta.stockzoom.com/api/v1/instruments/' + alias + '/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
    const instrument = await response.json();

    return {
        instrument
    }
}


export default instrumentDetails;





