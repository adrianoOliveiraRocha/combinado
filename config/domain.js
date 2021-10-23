module.exports = () => {
    return (process.env.USER == 'adriano' ?
        'http://localhost:8001' : 'https://w3software.net.br:81');
}