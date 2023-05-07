import ReactDOM from 'react-dom/client';

import './styles/main.scss';
import App from './App';
import AuthContextProvider from './store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
);
