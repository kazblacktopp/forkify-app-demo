import { async } from 'regenerator-runtime';

export async function AJAX(url, dataObj = undefined) {
  try {
    const response = dataObj
      ? await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataObj),
        })
      : await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function setLocalStorage(objName, obj) {
  localStorage.setItem(objName, JSON.stringify(obj));
}

export function getLocalStorage(objName) {
  return JSON.parse(localStorage.getItem(objName));
}
