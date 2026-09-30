// Базовый URL из .env (гарантируем наличие /api/v1 на конце)
const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const BASE_URL = rawBaseUrl.endsWith('/api/v1') 
  ? rawBaseUrl 
  : `${rawBaseUrl.replace(/\/$/, '')}/api/v1`;

/**
 * Вспомогательная функция для формирования URL с query-параметрами
 */
const buildUrl = (path, params) => {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });
  }
  return url.toString();
};

/**
 * Универсальная функция для выполнения HTTP-запросов
 */
const request = async (path, options = {}) => {
  const url = options.params ? buildUrl(path, options.params) : `${BASE_URL}${path}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Если есть body, сериализуем его в JSON
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const result = await response.json();

    // Если бэкенд вернул ошибку в формате { error: { code, message } }
    if (!response.ok) {
      const errorMessage = result.error?.message || `Ошибка HTTP: ${response.status}`;
      const error = new Error(errorMessage);
      error.code = result.error?.code || 'HTTP_ERROR';
      throw error;
    }

    // Возвращаем результат (обычно это { data: ..., pagination: ... } или { data: ... })
    return result;
  } catch (error) {
    // Перехватываем ошибки сети или парсинга JSON
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Ошибка сети. Проверьте, запущен ли сервер.');
    }
    throw error;
  }
};

/**
 * GET-запрос
 */
export const get = (path, params) => {
  return request(path, { method: 'GET', params });
};

/**
 * POST-запрос
 */
export const post = (path, body) => {
  return request(path, { method: 'POST', body });
};

/**
 * PUT-запрос
 */
export const put = (path, body) => {
  return request(path, { method: 'PUT', body });
};

/**
 * DELETE-запрос
 */
export const del = (path) => {
  return request(path, { method: 'DELETE' });
};