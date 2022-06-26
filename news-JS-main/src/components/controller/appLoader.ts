import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '96527e9e66f5469ba4cf1914dac88972', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
