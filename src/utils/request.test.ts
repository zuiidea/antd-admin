import { message } from 'antd';
import api from './request';

describe('api', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (global as any).fetch = jest.fn();
    localStorage.clear();
  });

  test('successful response and query params', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, data: { id: 1 } }),
    });
    const data = await api<{ id: number }>('/items', { params: { q: 'a' } });
    expect(data).toEqual({ id: 1 });
    expect(global.fetch).toBeCalledWith(
      '/api/v1/items?q=a',
      expect.any(Object),
    );
  });

  test('injects Authorization header from localStorage', async () => {
    localStorage.setItem('app-auth-token', 'tok');
    let capturedReq: any;
    (global.fetch as jest.Mock).mockImplementation((url, opts) => {
      capturedReq = opts;
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ success: true, data: null }),
      });
    });
    await api('/me', {});
    expect(capturedReq.headers.Authorization).toBe('Bearer tok');
  });

  test('network error shows message and throws', async () => {
    const err = new Error('net fail');
    (global.fetch as jest.Mock).mockRejectedValue(err);
    const spy = jest.spyOn(message, 'error') as jest.SpyInstance<any, any>;
    spy.mockImplementation(() => ({} as any));
    await expect(api('/x')).rejects.toThrow('net fail');
    expect(spy).toBeCalledWith('net fail');
    spy.mockRestore();
  });

  test('invalid response format shows message and throws', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });
    const spy = jest.spyOn(message, 'error') as jest.SpyInstance<any, any>;
    spy.mockImplementation(() => ({} as any));
    await expect(api('/x')).rejects.toThrow('Invalid API response format');
    expect(spy).toBeCalledWith('Invalid API response format');
    spy.mockRestore();
  });
});
