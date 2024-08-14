export async function fetchMaps() {
    let response = await fetch('https://valorant-api.com/v1/maps');
    let data = await response.json();
    return data.data;
}