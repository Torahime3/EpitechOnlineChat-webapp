import styles from'../../styles/authentication.module.css';
import React, {useState} from "react";
import {useCookies} from "react-cookie";

function Authentication() {

    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const [form, setForm] = useState({
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch("api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        }).then(request => request.json())
            .then((response) => {
                if(response.message == "success"){
                    setCookie("user", response.data, {path: "/"})
                    console.log(response.data);
                } else {
                    alert("Identifiant incorrect")
                }
        });

    }

    return (
        <>
            <div className={styles.container}>

                <form className={styles.box}>
                    <h1 className={styles.title}>Connection</h1>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className={styles.input}
                        onChange={handleFormChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={styles.input}
                        onChange={handleFormChange}
                    />

                    <input
                        type="submit"
                        value="Submit"
                        className={`${styles.submit} ${styles.input}`}
                        onClick={handleSubmit}
                    />

                </form>

            </div>

        </>
    );
}

export default Authentication;