// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import styles from './App.module.css';

// Временные заглушки для страниц (будут заменены в Фазе C)
const Dashboard = () => <div className={styles.container}>Страница: Главная</div>;
const History = () => <div className={styles.container}>Страница: История</div>;
const Analytics = () => <div className={styles.container}>Страница: Аналитика</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/history" element={<Layout><History /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;