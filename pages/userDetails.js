import fetch from 'isomorphic-unfetch';
// import Navbar from '../components/Navbar';
import Head from 'next/head';
//import { withRouter } from 'next/router';
import Cookies from 'universal-cookie'
import Link from 'next/link';


class UserDetails extends React.Component {

    render() {

        console.log(this.props.portfolio.positions)
        return (
            <div>
                <Head>
                    <title>Portfolio-Detail</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>

                <h1> My Portfolio Detail</h1>

                <div className="portfolia-container">
                    <li>
                        <span className="portfolia-label">Name : </span><span className="portfolia-value">{this.props.portfolio.name}</span>
                    </li>
                    <li>
                        <span className="portfolia-label">Alias : </span><span className="portfolia-value">{this.props.portfolio.alias}</span>
                    </li>
                    <li>
                        <span className="portfolia-label">Account Number : </span><span className="portfolia-value">{this.props.portfolio.account_number}</span>
                    </li>
                    <li>
                        <span className="portfolia-label">Currency : </span><span className="portfolia-value">{this.props.portfolio.currency}</span>
                    </li>
                    <li>
                        <span className="portfolia-label">Kind : </span><span className="portfolia-value">{this.props.portfolio.kind}</span>
                    </li>
                    <li>
                        <span className="portfolia-label">Provider: </span><span className="portfolia-value">{this.props.portfolio.provider}</span>
                    </li>

                    <h2> Positions </h2>
                </div>

                <div>
                    {
                        this.props.portfolio.positions.map((position, i) => (
                            <React.Fragment key={i} >
                                <div className="list-container">
                                    <Link href={`/instrumentDetails?alias=${position.instrument.id}&token=${this.props.token}`}>
                                        <a>{position.instrument.name}</a>
                                    </Link>
                                </div>
                            </React.Fragment>
                        ))
                    }

                </div>

                <style jsx>{`

            h1,h2{
                display: flex;
                justify-content: left;
                color: #0cc10c;
            }
            .portfolia-label{
                padding-left : 10px;
                display: inline;
                float: left;
                width:150px;
            }
            .portfolia-value{
                padding-left : 10px;
                display: inline;
                float: left;
            }

            .portfolia-container li {
                margin: 0 auto;
                padding: 10px;
                display: flex;
                text-decoration: none;
            }

            .list-container{
                margin: auto;
                padding-left: 10px;
                display: flex;
                justify-content: left;
                list-style: none;
            }

            `}</style>
            </div>
        )
    }
}
UserDetails.getInitialProps = async function ({ req, res, query }) {
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


    const response = await fetch('https://beta.stockzoom.com/api/v1/me/portfolios/' + alias + '/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
    const portfolio = await response.json();

    return {
        portfolio: portfolio,
        token: token

    }
}


export default UserDetails;





