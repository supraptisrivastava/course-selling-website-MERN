import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51QsKTbAG1GNHNTFYsC1NDIAOWyiW0X3po68ne0SZeF7TWns90Ewn6RS2h3oElSpDZpbImEzwTuk5VbG7f3Rjeo1W00NKB816Wi");
createRoot(document.getElementById('root')).render(
  <Elements stripe={stripePromise}>
            <BrowserRouter>   
             <App />
            </BrowserRouter>
          </Elements>

);
