import React from 'react';
import ReactDOM from 'react-dom';

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request for REACT.');


    context.res = { 
        body: 
            ReactDOM.render(
                <h1>Hello, world!</h1>,
                document.getElementById('root')
    )};

    context.done();
};
