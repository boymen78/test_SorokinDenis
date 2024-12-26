import React from "react";

const UserTable = ({ users, setUsers, showModal }) => {
    const handleDelete = (id) => {
        fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE",
        }).then(() => {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            showModal("Пользователь успешно удален!");
        });
    };

    return (
        <div className="tableContainer">
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="deleteButton"
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">Список пуст</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;