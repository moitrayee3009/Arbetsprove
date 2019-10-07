class FormBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }


    onSubmit = () => {

        FormBase.getInitialProps = async ({ req }) => {
            const res = await fetch('https://beta.stockzoom.com/api-token-auth/');
            const token = await res.json();
            localStorage.setItem('token', token);
            //localStorage.setItem('refreshToken', refreshToken);

            return {
                token
            };
        }
    };



    render() {
        const { email, password } = this.state;
        const { onSubmit } = this.props;
        return (
            <div className="container">
                <form method="POST">
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
                </form>

                <style jsx > {`

                    .container {
                        position: relative;
                        width: 30%;
                        margin: auto;
                        
                    }

                    h1{
                        display: flex;
                        justify-content: center;
                    }

                    form {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        padding:  70px 0;
                        box-sizing: border-box;
                        margin:  auto;
                    }

                    form input {
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

                    form button {
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
    }
}



export default FormBase;




