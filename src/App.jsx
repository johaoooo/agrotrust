import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ToastNotification from './components/ToastNotification';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

// Import des pages publiques
import Offres from './pages/Offres';
import Contrats from './pages/Contrats';
import MicroCredit from './pages/MicroCredit';
import CalendrierSemis from './pages/CalendrierSemis';
import Certification from './pages/Certification';
import Formation from './pages/Formation';
import ConseilsSemis from './pages/ConseilsSemis';
import APropos from './pages/APropos';
import Contact from './pages/Contact';
import Support from './pages/Support';
import Parrainage from './pages/Parrainage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Communaute from './pages/Communaute';
import Aide from './pages/Aide';
import Entraide from './pages/Entraide';

// Import des pages du dashboard
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import MesCommandes from './pages/MesCommandes';
import MonCompte from './pages/MonCompte';
import Parametres from './pages/Parametres';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ToastNotification />
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Routes publiques */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/offres" element={<Offres />} />
                <Route path="/contrats" element={<Contrats />} />
                <Route path="/micro-credit" element={<MicroCredit />} />
                <Route path="/calendrier-semis" element={<CalendrierSemis />} />
                <Route path="/certification" element={<Certification />} />
                <Route path="/formation" element={<Formation />} />
                <Route path="/conseils-semis" element={<ConseilsSemis />} />
                <Route path="/a-propos" element={<APropos />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/support" element={<Support />} />
                <Route path="/parrainage" element={<Parrainage />} />
                <Route path="/communaute" element={<Communaute />} />
                <Route path="/entraide" element={<Entraide />} />
                <Route path="/aide" element={<Aide />} />
                
                {/* Routes du dashboard avec layout */}
                <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                  <Route index element={<DashboardHome />} />
                  <Route path="mes-commandes" element={<MesCommandes />} />
                  <Route path="offres" element={<Offres />} />
                  <Route path="micro-credit" element={<MicroCredit />} />
                  <Route path="conseils-semis" element={<ConseilsSemis />} />
                  <Route path="communaute" element={<Communaute />} />
                  <Route path="contrats" element={<Contrats />} />
                  <Route path="parametres" element={<Parametres />} />
                  <Route path="aide" element={<Aide />} />
                  <Route path="mon-compte" element={<MonCompte />} />
                  <Route path="calendrier-semis" element={<CalendrierSemis />} />
                  <Route path="entraide" element={<Entraide />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
