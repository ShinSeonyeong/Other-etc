import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register' // PWA 서비스 워커 등록

registerSW()

createRoot(document.getElementById('root')).render(
    <App />
)
