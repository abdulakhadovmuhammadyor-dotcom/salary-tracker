import React, { createContext, useContext, useState, useEffect } from 'react';
import { getIncomes, addIncome, updateIncome, deleteIncome } from '../services/incomeService';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../services/expenseService';

// Контекст для данных
const DataContext = createContext(null);

/**
 * Хук для использования контекста данных
 */
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

/**
 * Провайдер контекста данных
 */
export const DataProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка данных при монтировании
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Сервисы теперь возвращают { data: [...], pagination: {...} }
        // Запрашиваем с большим лимитом, чтобы получить все данные для дашборда
        const incomesRes = await getIncomes({ limit: 1000 });
        const expensesRes = await getExpenses({ limit: 1000 });
        
        // Извлекаем именно массивы данных
        setIncomes(incomesRes.data || []);
        setExpenses(expensesRes.data || []);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        alert('Не удалось загрузить данные. Проверьте, запущен ли сервер.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Методы для доходов
  const handleAddIncome = async (incomeData) => {
    const newIncome = await addIncome(incomeData);
    setIncomes((prev) => [...prev, newIncome]);
    return newIncome;
  };

  const handleUpdateIncome = async (id, incomeData) => {
    const updatedIncome = await updateIncome(id, incomeData);
    if (updatedIncome) {
      setIncomes((prev) => prev.map((inc) => (inc.id === id ? updatedIncome : inc)));
    }
    return updatedIncome;
  };

  const handleDeleteIncome = async (id) => {
    await deleteIncome(id);
    setIncomes((prev) => prev.filter((inc) => inc.id !== id));
    return true;
  };

  // Методы для расходов
  const handleAddExpense = async (expenseData) => {
    const newExpense = await addExpense(expenseData);
    setExpenses((prev) => [...prev, newExpense]);
    return newExpense;
  };

  const handleUpdateExpense = async (id, expenseData) => {
    const updatedExpense = await updateExpense(id, expenseData);
    if (updatedExpense) {
      setExpenses((prev) => prev.map((exp) => (exp.id === id ? updatedExpense : exp)));
    }
    return updatedExpense;
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    return true;
  };

  // Универсальные методы
  const addTransaction = async (transactionData) => {
    if (transactionData.type === 'income') {
      return await handleAddIncome(transactionData);
    } else {
      return await handleAddExpense(transactionData);
    }
  };

  const updateTransaction = async (id, transactionData) => {
    if (transactionData.type === 'income') {
      return await handleUpdateIncome(id, transactionData);
    } else {
      return await handleUpdateExpense(id, transactionData);
    }
  };

  const deleteTransaction = async (id, type) => {
    if (type === 'income') {
      return await handleDeleteIncome(id);
    } else {
      return await handleDeleteExpense(id);
    }
  };

  const value = {
    incomes,
    expenses,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};