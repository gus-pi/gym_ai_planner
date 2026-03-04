import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import ProfilePage from './pages/ProfilePage';
import Auth from './pages/Auth';
import Account from './pages/Account';
import Navbar from './components/layout/Navbar';

const App = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/onboarding" element={<Onboarding />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/auth/:pathname" element={<Auth />} />
                        <Route path="/account/:pathname" element={<Account />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};
export default App;
