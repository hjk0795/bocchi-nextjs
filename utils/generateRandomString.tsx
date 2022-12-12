export const generateRandomString = (length: number) => {
    const RANDOM_SOURCE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += RANDOM_SOURCE.charAt(Math.floor(Math.random() * RANDOM_SOURCE.length));
    }

    return randomString;
};