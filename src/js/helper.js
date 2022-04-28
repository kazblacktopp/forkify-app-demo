import { async } from 'regenerator-runtime';

export async function getJSON(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
