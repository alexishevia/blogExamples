var showTodos = require('../actions/showTodos');

module.exports = {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        label: 'Home',
        action: showTodos
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        label: 'About'
    }
};
