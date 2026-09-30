import { get, post, put, del } from './api.js';

/**
 * Получение всех доходов с опциональными фильтрами и пагинацией
 * @param {Object} filters - Фильтры (category, startDate, endDate, page, limit)
 * @returns {Promise<Object>} Объект с data (массив доходов) и pagination
 */
export const getIncomes = async (filters = {}) => {
  const result = await get('/incomes', filters);
  return result;
};

/**
 * Получение дохода по ID
 * @param {string} id - Идентификатор дохода
 * @returns {Promise<Object>} Объект дохода
 */
export const getIncomeById = async (id) => {
  const result = await get(`/incomes/${id}`);
  return result.data;
};

/**
 * Добавление нового дохода
 * @param {Object} incomeData - Данные дохода (amount, date, category, comment)
 * @returns {Promise<Object>} Созданный доход
 */
export const addIncome = async (incomeData) => {
  const result = await post('/incomes', incomeData);
  return result.data;
};

/**
 * Обновление существующего дохода
 * @param {string} id - Идентификатор дохода
 * @param {Object} incomeData - Новые данные дохода
 * @returns {Promise<Object>} Обновлённый доход
 */
export const updateIncome = async (id, incomeData) => {
  const result = await put(`/incomes/${id}`, incomeData);
  return result.data;
};

/**
 * Удаление дохода
 * @param {string} id - Идентификатор дохода
 * @returns {Promise<void>}
 */
export const deleteIncome = async (id) => {
  await del(`/incomes/${id}`);
};

/**
 * Удаление всех доходов (если бэкенд поддерживает)
 * @returns {Promise<void>}
 */
export const clearAllIncomes = async () => {
  // Если бэкенд не поддерживает массовое удаление, можно удалить по одному
  const { data: incomes } = await get('/incomes', { limit: 1000 });
  for (const income of incomes) {
    await del(`/incomes/${income.id}`);
  }
};