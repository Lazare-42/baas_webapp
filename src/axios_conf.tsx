import axios from 'axios'

// Récupération de l'URL de base depuis les variables d'environnement
const BASE_URL = import.meta.env.VITE_API_SERVER_BASEURL || '//'

// Configuration initiale d'axios
axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

// Log pour vérifier
console.log('baseURL:', axios.defaults.baseURL)

// Fonction pour définir les headers
export function setDefaultHeader(name: string, value: string) {
    axios.defaults.headers.common[name] = value
}
