import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App';
import './stylings/application.scss';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
