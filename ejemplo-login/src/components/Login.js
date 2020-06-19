import React from "react";
import { Input, Label, Button } from "reactstrap";
import { API } from "../services/env";
import axios from "axios";
import swal from "sweetalert";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            lastname1: "",
            lastname2: "",
            emailRegister: "",
            passwordRegister: "",
            emailTest:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
        this.handleSubmitCheck = this.handleSubmitCheck.bind(this);
        this.handleSubmitEmailTest = this.handleSubmitEmailTest.bind(this);
    }

    componentDidMount() {
        localStorage.clear();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(user)
        const result = await axios.post(`${API}/login`, user);
        console.log(result.data.token)
        if (result.data.token != null) {
            swal(
                "¡Inicio de Sesión Satisfactorio!",
                "Datos correctos",
                "success"
            );
            localStorage.setItem('token', result.data.token);
        }
        else {
            swal(
                "¡Inicio de Sesión Erroneo!",
                "Datos incorrectos",
                "error"
            );
            localStorage.clear();
        }
    }

    async handleSubmitRegister(event) {
        event.preventDefault();
        const user = {
            name: this.state.name,
            lastname1: this.state.lastname1,
            lastname2: this.state.lastname2,
            email: this.state.emailRegister,
            password: this.state.passwordRegister
        }
        this.setState({
            name: "",
            lastname1: "",
            lastname2: "",
            emailRegister: "",
            passwordRegister: ""
        });
        console.log(user)
        await axios.post(`${API}/login/register`, user);
        swal(
            "¡Listo!",
            "Se creó el usuario exitosamente.",
            "success"
        );
    }

    async handleSubmitCheck(event) {
        event.preventDefault();
        const body = {
            token: localStorage.getItem("token")
            // token: "tokenquemeinvente"
        }
        console.log(body)
        const result = await axios.post(`${API}/login/test`, body);
        console.log(result.data.msg);
        if (result.data.msg) {
            swal(
                "¡Token Válido!",
                "Ya ha iniciado sesión y su token es válido",
                "success"
            );
        }
        else{
            swal(
                "¡Token Inálido!",
                "No ha iniciado sesión o el token que posee ya expiró/inválido",
                "error"
            );
        }
    }

    async handleSubmitEmailTest(event) {
        event.preventDefault();
        const body = {
            email: this.state.emailTest
        }
        console.log(body)
        await axios.post(`${API}/login/mail`, body);
        // const result = await axios.post(`${API}/login/test`, body);
        // console.log(result.data.msg);
        // if (result.data.msg) {
        //     swal(
        //         "¡Token Válido!",
        //         "Ya ha iniciado sesión y su token es válido",
        //         "success"
        //     );
        // }
        // else{
        //     swal(
        //         "¡Token Inálido!",
        //         "No ha iniciado sesión o el token que posee ya expiró/inválido",
        //         "error"
        //     );
        // }
    }

    render() {
        return (
            <div>
                <h1>Registro</h1>
                <Label>Nombre</Label>
                <Input name="name" onChange={this.handleChange} value={this.state.name}></Input>
                <br></br>
                <Label>Primer Apellido</Label>
                <Input name="lastname1" onChange={this.handleChange} value={this.state.lastname1}></Input>
                <br></br>
                <Label>Segundo Apellido</Label>
                <Input name="lastname2" onChange={this.handleChange} value={this.state.lastname2}></Input>
                <br></br>
                <Label>Correo Electrónico</Label>
                <Input name="emailRegister" onChange={this.handleChange} type="email" value={this.state.emailRegister}></Input>
                <br></br>
                <Label>Contraseña</Label>
                <Input name="passwordRegister" onChange={this.handleChange} type="password" value={this.state.passwordRegister}></Input>
                <br></br>
                <Button color="primary" type="button" onClick={(e) => this.handleSubmitRegister(e)}>Registrarse</Button>
                <hr></hr>
                <h1>Inicio de Sesión</h1>
                <br></br>
                <Label>Correo Electrónico</Label>
                <Input name="email" onChange={this.handleChange} type="email"></Input>
                <br></br>
                <Label>Contraseña</Label>
                <Input name="password" onChange={this.handleChange} type="password"></Input>
                <br></br>
                <Button color="primary" type="button" onClick={(e) => this.handleSubmit(e)}>Ingresar</Button>
                <br></br>
                <hr></hr>
                <h1>Prueba Token</h1>
                <br></br>
                <Button color="primary" type="button" onClick={(e) => this.handleSubmitCheck(e)}>Probar Token</Button>
                <br></br>
                <hr></hr>
                <h1>Enviar correo de prueba</h1>
                <br></br>
                <Label>Correo al que desea enviar la prueba:</Label>
                <Input name="emailTest" onChange={this.handleChange} type="email"></Input>
                <br></br>
                <Button color="primary" type="button" onClick={(e) => this.handleSubmitEmailTest(e)}>Enviar Correo</Button>
                <br></br>
                <br></br>
            </div>
        )
    };
}

export default Login;