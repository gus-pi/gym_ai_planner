import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import ProfilePage from './pages/ProfilePage';
import Auth from './pages/Auth';
import Account from './pages/Account';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/auth/:pathname" element={<Auth />} />
                <Route path="/account/:pathname" element={<Account />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;
