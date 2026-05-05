import './App.css'
import { useRequestDB } from '../services/useRequestDB.js'
import { InfoIcon, LotteryIcon, UserIcon, NumbersIcon, MoneyIcon, CalendarIcon } from '../components/Icons.jsx'
import { ModalRaffle } from '../components/ModalRaffle.jsx'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function App() {
  const [dataRuffle, setDataRuffle] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [dataSelected, setDataSelected] = useState(null)
  const [rechargeData, setRechargeData] = useState(false)
  const { requestDB } = useRequestDB()

  useEffect(() => {
    const getDataRaffles = async () => {
      const responseDB = await requestDB('raffles', 'GET', '')
      if (!responseDB.ok) return toast.error(responseDB.message)
    
      if (responseDB.data[0].numbers_sellers !== null) {
        responseDB.data[0].numbers_sellers = JSON.parse(responseDB.data[0].numbers_sellers)
      }
     
      setDataRuffle(responseDB.data[0])
    }
    if (rechargeData) {
      getDataRaffles()
      setRechargeData(false)
    } else {
      getDataRaffles()
    }
  }, [rechargeData])

  if (dataRuffle === null) return null

  console.log(dataRuffle)

  const handleSelectedNumber = (number, dataSelected) => {
    setSelectedNumber(number)
    setDataSelected(dataSelected)
    setShowModal(true)
  }
    

  return (
    <section className='principal-container-app'>
      <ModalRaffle 
        showModal={showModal} 
        setShowModal={setShowModal} 
        selectedNumber={selectedNumber} 
        dataSelected={dataSelected} 
        setRechargeData={setRechargeData}
      />
      <header className='header-app'>
        <div className="card total-objective">
          <h3 className='title-card'>Objetivo Total</h3>
          <span className='value-card'>
            ${Number(dataRuffle.carvaltotal).toLocaleString('es-ES')}
          </span>
        </div>
        <div className="card total-collected">
          <h3 className='title-card'>Recaudado</h3>
          <span className='value-card'>
            ${Number(dataRuffle.carvalrec).toLocaleString('es-ES')}
          </span>
        </div>
        <div className="card total-solds">
          <h3 className='title-card'>Boletas vendidas</h3>
          <span className='value-card'>
            {dataRuffle.quantity_sellers}
            {' '}
            <span>/ {parseInt(dataRuffle.carnumfin) + 1}</span>
          </span>
        </div>
      </header>
      <section className="raffle-details-card">
        <h2 className="details-title">
          <InfoIcon /> Detalles del Sorteo
        </h2>
        <div className="details-grid">
          
          <div className="detail-item">
            <span className="detail-label">LOTERÍA</span>
            <div className="detail-value">
              <LotteryIcon />
              <span>Boyacá</span>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-label">RESPONSABLE</span>
            <div className="detail-value">
              <UserIcon />
              <span>Anderson<br/>Romero</span>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-label">JUEGA CON</span>
            <div className="detail-value">
              <NumbersIcon />
              <span>Últimas<br/>2 cifras</span>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-label">VALOR BOLETA</span>
            <div className="detail-value">
              <MoneyIcon />
              <span>$10.000</span>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-label">FECHA DEL SORTEO</span>
            <div className="detail-value">
              <CalendarIcon />
              <span>30 de<br/>mayo,<br/>2026</span>
            </div>
          </div>

        </div>
      </section>

      <section className="grid-numbers-ruffle">
        {Array(Number(dataRuffle.carnumfin) + 1).fill(null).map((_, index) => {
          const numToShow = index < 10 ? `0${index}` : index
          const isSold = dataRuffle.numbers_sellers?.find(number => Number(number.cavnum) === index)
          const initialsNameUser = isSold !== undefined ? isSold.cavnomusu.split(' ')[0][0].toUpperCase() + isSold.cavnomusu.split(' ')[1][0].toUpperCase() : ''
          return (
            <button 
              key={index}
              className={`btn-numbers-ruffle ${isSold !== undefined ? 'sold' : ''} ${isSold !== undefined && isSold.cavestado === 'PA' ? 'paid' : 'not-paid'}`}
              onClick={() => handleSelectedNumber(numToShow, isSold)}
            >
              {isSold !== undefined 
                ? <span className={`initials-user ${isSold.cavestado === 'PA' ? 'paid' : 'not-paid'}`}>
                  {initialsNameUser}
                  </span> 
                : numToShow
              }
            </button>
          )
        })}
      </section>

    </section>
  )
}

export default App
