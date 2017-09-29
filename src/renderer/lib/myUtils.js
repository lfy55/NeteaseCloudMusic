export function interceptors(res) {
  if (res.status !== 200 || res.data.code !== 200) {
    return Promise.reject(res.data)
  }
  return Promise.resolve(res)
}