import { useState, useEffect } from 'react'
import '../styles/ModalRaffle.css'
import { UserIcon, PhoneIcon, MailIcon, CheckIcon, PendingIcon, PdfIcon, CloseIcon } from './Icons.jsx'
import { useRequestDB } from '../services/useRequestDB.js'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

export function ModalRaffle({ showModal, setShowModal, selectedNumber, dataSelected, setRechargeData }) {
  const { requestDB } = useRequestDB()
  const [formData, setFormData] = useState({
    nombre: '',
    celular: '',
    correo: '',
    estado: 'PO' // 'PO' = Por Pagar, 'PA' = Pagado
  })

  useEffect(() => {
    if (dataSelected) {
      setFormData({
        nombre: dataSelected.cavnomusu || '',
        celular: dataSelected.cavcel || '',
        correo: dataSelected.cavemail || '',
        estado: dataSelected.cavestado || 'PO'
      })
    } else {
      setFormData({
        nombre: '',
        celular: '',
        correo: '',
        estado: 'PO'
      })
    }
  }, [dataSelected, showModal])

  if (!showModal) return null

  const handleClickSave = async () => {
    const body = {
      cavnum: String(selectedNumber),
      cavnomusu: formData.nombre,
      cavcel: formData.celular,
      cavemail: formData.correo,
      cavestado: formData.estado
    }

    const responseDB = await requestDB('raffles/save-number-user', 'POST', body)
    if (!responseDB.ok) return toast.error(responseDB.message)    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
    toast.success('Número vendido exitosamente')
    setRechargeData(true)
    setShowModal(false)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={() => setShowModal(false)}>
          <CloseIcon />
        </button>
        
        <h2 className="modal-subtitle">
          Número a vender: <span>{selectedNumber}</span>
        </h2>

        <div className="form-group">
          <label>Nombre Completo</label>
          <div className="input-wrapper">
            <UserIcon />
            <input 
              type="text" 
              placeholder="Ej. Juan Pérez" 
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label>Número de Celular</label>
            <div className="input-wrapper">
              <PhoneIcon />
              <input 
                type="text" 
                placeholder="3145678900" 
                value={formData.celular}
                onChange={(e) => setFormData({...formData, celular: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group half">
            <label>Correo Electrónico <span>(opcional)</span></label>
            <div className="input-wrapper">
              <MailIcon />
              <input 
                type="email" 
                placeholder="correo@ejemplo.com" 
                value={formData.correo}
                onChange={(e) => setFormData({...formData, correo: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Estado de Pago</label>
          <div className="payment-status-toggle">
            <button 
              className={`status-btn ${formData.estado === 'PA' ? 'active-paid' : ''}`}
              onClick={() => setFormData({...formData, estado: 'PA'})}
            >
              <CheckIcon /> Pagado
            </button>
            <button 
              className={`status-btn ${formData.estado === 'PO' ? 'active-pending' : ''}`}
              onClick={() => setFormData({...formData, estado: 'PO'})}
            >
              <PendingIcon /> Por Pagar
            </button>
          </div>
        </div>

        <button className="generate-pdf-btn" onClick={handleClickSave}>
          <PdfIcon /> Guardar
        </button>
      </div>
    </div>
  )
}
