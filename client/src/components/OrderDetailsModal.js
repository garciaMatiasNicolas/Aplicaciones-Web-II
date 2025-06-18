import  { useState } from 'react';

export const OrderDetailsModal = ({ show, onClose, onConfirm }) => {
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onConfirm({ address, phone });
        setAddress('');
        setPhone('');
    };

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
            <div className="modal-content">
            <form onSubmit={handleSubmit}>
                <div className="modal-header">
                <h5 className="modal-title">Datos de envío</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                <div className="mb-3">
                    <label className="form-label">Domicilio</label>
                    <input
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                    name="phone"
                    className="form-control"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    />
                </div>
                </div>
                <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Confirmar compra</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
};