// components/AuthModal.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';


export const AuthModal = ({ show, onClose }) => {
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        let result;

        if (isLogin) {
            result = await login(form.email, form.password);
        } else {
            if (!form.name.trim()) {
                Swal.fire('Error', 'El nombre es obligatorio para registrarse', 'warning');
                return;
            }
            result = await register(form.name, form.email, form.password);
        }

        console.log(result)

        if (result.user) {
            Swal.fire('Éxito', isLogin ? 'Sesión iniciada' : 'Usuario registrado', 'success');
            onClose();
        } else {
            Swal.fire('Error', result.message || 'Algo salió mal', 'error');
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            {!isLogin && (
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        name="name"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={form.name}
                                        required={!isLogin}
                                    />
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={form.email}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={form.password}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">
                                {isLogin ? 'Ingresar' : 'Registrarse'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setForm({ name: '', email: '', password: '' }); // limpiar campos
                                }}
                            >
                                {isLogin ? '¿No tenés cuenta? Registrate' : '¿Ya tenés cuenta? Ingresar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
