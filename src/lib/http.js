import {camelizeKeys, decamelizeKeys} from 'humps'

export const param = (query = {}) => (
  Object.keys(decamelizeKeys(query))
    .map(key => {
      const value = query[key]
      if (value !== undefined && value !== null) {
        return `${key}=${encodeURIComponent(value)}`
      }
    })
    .join('&')
)

const isJson = (response) => {
  if (response.status === 204) {
    return false
  }

  if (response.headers.get('content-length') === '0') {
    return false
  }

  const type = response.headers.get('content-type')
  return type && type.indexOf('application/json') !== -1
}

const http = (url, options = {}) => {
  options = Object.assign({}, options, {
    mode: 'cors',
    credentials: 'include',
    headers: {
      'accept': 'application/json, text/plain, */*'
    }
  })

  if (typeof options.query === 'object') {
    url += (url.indexOf('?') === -1 ? '?' : '') + param(options.query)
    delete options.query
  }

  if (
    options.body &&
    (typeof options.body !== 'string') &&
    !(options.body instanceof FormData) &&
    (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH')
  ) {
    options.body = JSON.stringify(decamelizeKeys(options.body))
    Object.assign(options.headers, {
      'Content-Type': 'application/json'
    })
  }

  return fetch(url, options).then(r => {
    if (r.ok) {
      return isJson(r) ? r.json().then(j => camelizeKeys(j)) : r.text()
    } else {
      return isJson(r)
        ? r.json().then(j => Promise.reject({...j, status: r.status}))
        : r.text().then(t => Promise.reject(new Error(t)))
    }
  })
}

export default http
