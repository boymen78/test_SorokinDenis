import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserTable from "../userTable/UserTable";
import Modal from "../modal/Modal";

const UserForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/users")
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, []);

    const onSubmit = (data) => {
        fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((newUser) => {
                setUsers((prevUsers) => [...prevUsers, newUser]);
                reset();
                showModal("Пользователь успешно создан!");
            });
    };

    const showModal = (message) => {
        setModalMessage(message);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="field">
                    <label>Name</label>
                    <input {...register("name", { required: "Name is required" })} />
                    {errors.name && <span className="error">{errors.name.message}</span>}
                </div>
                <div className="field">
                    <label>Email</label>
                    <input {...register("email", { required: "Email is required" })} />
                    {errors.email && (
                        <span className="error">{errors.email.message}</span>
                    )}
                </div>
                <div className="field">
                    <label>Username</label>
                    <input
                        {...register("username", { required: "Username is required" })}
                    />
                    {errors.username && (
                        <span className="error">{errors.username.message}</span>
                    )}
                </div>

                <div className="buttons">
                    <button
                        type="submit"
                        className="addButton"
                        disabled={Object.keys(errors).length > 0}
                    >
                        Создать
                    </button>
                </div>
            </form>

            {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}

            <UserTable users={users} setUsers={setUsers} showModal={showModal} />
        </div>
    );
};

export default UserForm;