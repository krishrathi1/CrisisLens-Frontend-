import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const API_KEY = '5e07895c5c1f48e9803d869c5ad29a4c';

async function getCoordinates(location: any) {
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${API_KEY}`);
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    const {lat, lng} = data.results[0].geometry;
    return {lat, lng};
  } else {
    throw new Error('No results found');
  }
}

export function parseNewlines(jsonString: string): { [key: string]: any } {
  const data = JSON.parse(jsonString);

  for (let key in data) {
    if (typeof data[key] === 'string') {
      data[key] = data[key].replace(/\\n/g, '\n');
    }
  }

  return data;
}
