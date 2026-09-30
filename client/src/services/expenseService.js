import { get, post, put, del } from './api.js';

/**
 * Получение всех расходов с опциональными фильтрами и пагинацией
 * @param {Object} filters - Фильтры (category, startDate, endDate, isRecurring, page, limit)
 * @returns {Promise<Object>} Объект с data (массив расходов) и pagination
 */
export const getExpenses = async (filters = {}) => {
  const result = await get('/expenses', filters);
  return result;
};

/**
 * Получение расхода по ID
 * @param {string} id - Идентификатор расхода
 * @returns {Promise<Object>} Объект расхода
 */
export const getExpenseById = async (id) => {
  const result = await get(`/expenses/${id}`);
  return result.data;
};

/**
 * Добавление нового расхода
 * @param {Object} expenseData - Данные расхода (amount, date, category, comment, isRecurring)
 * @returns {Promise<Object>} Созданный расход
 */
export const addExpense = async (expenseData) => {
  const result = await post('/expenses', expenseData);
  return result.data;
};

/**
 * Обновление существующего расхода
 * @param {string} id - Идентификатор расхода
 * @param {Object} expenseData - Новые данные расхода
 * @returns {Promise<Object>} Обновлённый расход
 */
export const updateExpense = async (id, expenseData) => {
  const result = await put(`/expenses/${id}`, expenseData);
  return result.data;
};

/**
 * Удаление расхода
 * @param {string} id - Идентификатор расхода
 * @returns {Promise<void>}
 */
export const deleteExpense = async (id) => {
  await del(`/expenses/${id}`);
};

/**
 * Удаление всех расходов (если бэкенд поддерживает)
 * @returns {Promise<void>}
 */
export const clearAllExpenses = async () => {
  // Если бэкенд не поддерживает массовое удаление, можно удалить по одному
  const { data: expenses } = await get('/expenses', { limit: 1000 });
  for (const expense of expenses) {
    await del(`/expenses/${expense.id}`);
  }
};