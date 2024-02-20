import styles from'../../styles/authentication.module.css';
import React, {useState} from "react";
import {useCookies} from "react-cookie";

function Authentication() {

    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const [registration, setRegistration] = useState(false);
    const [form, setForm] = useState({
        anonyme: false,
        username: "",
        password: "",
        confirm_password: "",
    });

    const handleFormChange = (e: React.FormEvent<HTMLInputElement>) => {
        setForm(
            {
                ...form,
                [e.currentTarget.name] :e.currentTarget.value,
            });
    }

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        if(registration){

            if(form.password != form.confirm_password){
                alert("Les mots de passe ne correspondent pas")
                return;
            }

            fetch("api/v1/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password,
                })
            }).then(request => request.json())
                .then((response) => {
                    if(response.message == "success"){
                        setRegistration(false)
                    } else {
                        alert("Erreur lors de l'inscription, le pseudo est peut-être déjà pris.")
                    }
            });

            return;

        }

        if(e.currentTarget.name == "anonymous"){

            fetch("api/v1/users/login/anonymous", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    },
            }).then(request => request.json())
                .then((response) => {
                    removeCookie("user", {path: "/"})
                    setCookie("user", response.data, {path: "/"})
            });

            return;
        }

        fetch("api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password,
            })
        }).then(request => request.json())
            .then((response) => {
                if(response.message == "success"){
                    console.log(response.data)
                    setCookie("user", response.data, {path: "/"})
                } else {
                    alert("Identifiant incorrect")
                }
        });

    }

    return (
        <>
        
            <div className={styles.container}>

                <form className={styles.box}>

                    {!registration ? ( <>

                        <h1 className={styles.title}>Connexion</h1>

                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            className={styles.input}
                            onChange={handleFormChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            className={styles.input}
                            onChange={handleFormChange}
                        />

                        <input
                            type="submit"
                            name="connect"
                            value="Connect"
                            className={`${styles.submit} ${styles.input}`}
                            onClick={handleSubmit}
                        />

                        <input
                            type="submit"
                            name="anonymous"
                            value="Connect as anonymous"
                            className={`${styles.anonymous} ${styles.input}`}
                            onClick={handleSubmit}
                        />

                    </>) : ( <>

                        <h1 className={styles.title}>Registration</h1>

                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            className={styles.input}
                            onChange={handleFormChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            className={styles.input}
                            onChange={handleFormChange}
                        />

                        <input
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={form.confirm_password}
                            className={styles.input}
                            onChange={handleFormChange}
                        />

                        <input
                            type="submit"
                            name="Register"
                            value="Register"
                            className={`${styles.submit} ${styles.input}`}
                            onClick={handleSubmit}
                        />

                    
                    </> )}

                    <p className={styles.paragraph}> 
                    {registration ? (
                        <>
                            You already have an account? <a href="#" onClick={() => setRegistration(false)}>Login</a>
                        </>
                    ) : (
                        <>
                            You don't have an account? <a href="#" onClick={() => setRegistration(true)}>Register</a>
                        </>
                    )}
                    </p>

                </form>

            </div>

        </>
    );
}

export default Authentication;