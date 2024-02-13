import styles from'../../styles/authentication.module.css';
import React, {useState} from "react";
import {useCookies} from "react-cookie";

function Authentication() {

    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const [form, setForm] = useState({
        anonyme: false,
        username: "",
        password: "",
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

        if(e.currentTarget.name == "anonymous"){

            fetch("api/v1/users/login/anonymous", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    },
            }).then(request => request.json())
                .then((response) => {
                    removeCookie("user", {path: "/"})
                    setCookie("user", response, {path: "/"})
            });

            return;
        }

        fetch("api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        }).then(request => request.json())
            .then((response) => {
                console.log(response)
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

                </form>

            </div>

        </>
    );
}

export default Authentication;