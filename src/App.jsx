import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Offres from './pages/Offres';
import Contrats from './pages/Contrats';
import MonCompte from './pages/MonCompte';
import MesCommandes from './pages/MesCommandes';
import Parametres from './pages/Parametres';
import APropos from './pages/APropos';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Composant pour protéger les routes sensibles
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Routes publiques (tout le monde peut voir) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/offres" element={<Offres />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Routes protégées (nécessitent connexion) */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/contrats" element={
            <PrivateRoute>
              <Contrats />
            </PrivateRoute>
          } />
          <Route path="/mon-compte" element={
            <PrivateRoute>
              <MonCompte />
            </PrivateRoute>
          } />
          <Route path="/mes-commandes" element={
            <PrivateRoute>
              <MesCommandes />
            </PrivateRoute>
          } />
          <Route path="/parametres" element={
            <PrivateRoute>
              <Parametres />
            </PrivateRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
