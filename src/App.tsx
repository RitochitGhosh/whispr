import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import GetStarted from './pages/GetStarted';
import { Home } from './pages/Home';
import { MessageCard } from './components/MessageCard';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/msg/:uid" element={<MessageCard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
