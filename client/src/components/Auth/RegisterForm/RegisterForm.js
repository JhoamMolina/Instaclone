import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useFormik} from 'formik';
import './RegisterForm.scss';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { useMutation } from '@apollo/client'
import { REGISTER } from '../../../gql/user';

function initialValue(){
    return {
        name: '',
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    }
}

function RegisterForm(props) {
    const { setShowLogin } = props
    const [ register ] = useMutation(REGISTER);

    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: Yup.object({
            name: Yup.string().required("Tu nombre es obligatorio"),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, 
                "El nombre del usuario no puede contener espacio").required("El nombre del usuario es obligatorio"),
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales"),
            repeatPassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),

        }),
        onSubmit: async (formData) => {
            try {
                const newUser = formData;
                delete newUser.repeatPassword;

                const result = await register({
                    variables: {
                        input: newUser,
                    },
                });
                toast.success("Usuario registarado correctamente");
                setShowLogin(true);
            } catch (error) {
                formik.handleReset();
                toast.error(error.message);
                console.log(error.message);
            }
        }
    });

    return (
        <>
            <h2 className='register-form-title'>Registrate para ver fotos y videos de tus amigos</h2> 
            <Form className='register-form' onSubmit={formik.handleSubmit}>
                <Form.Input 
                    type="text"
                    placeholder="Nombre y apellidos"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name && true}

                />
                <Form.Input 
                    type="text"
                    placeholder="Nombre de usuario"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.errors.username && true}
                />
                <Form.Input 
                    type="text"
                    placeholder="Correo electronico"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email && true}
                />
                <Form.Input 
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password && true}
                />
                <Form.Input 
                    type="password"
                    placeholder="Repetir contraseña"
                    name="repeatPassword"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.repeatPassword && true}                
                />
                <Button type="submit" className='btn-submit'>Registrarse</Button>                                                                                        
            </Form>
        </>
    )
}

export default RegisterForm
