function checkStatus (response) {
    if (response.status >= 200 && response.status < 300) {
        console.log('util request 请求成功！ ', response);
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    console.log('util request请求失败! ', error);
    throw error;
}
/**
 * Requests a URL, reurning a promise.
 * 
 * @param {string} url The URL we want to request
 * @param {object} options The options we want to pass to 'fetch'
 * @return {object}         An object containing either 'data' or 'err'
 */
export default async function request(url, options) {
    console.log('uril request: ', url);
    const response = await fetch(url, options);
    console.log('uril request: ', response);
    checkStatus(response);
    return await response.json();
}