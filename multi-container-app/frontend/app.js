const express = require('express');
const axios = require('axios');
const app = express();
const fs = require('fs');
const path = require('path');

app.get('/', async (req, res) => {
    res.redirect('/home');
});

app.get('/home', async (req, res) => {
    const filePath = path.join(__dirname, 'home.html');
    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading home.html:', err);
            res.status(500).send('<h1>Internal Server Error</h1>');
        } else {
            try {
                const response = await axios.get('http://backend:5000/home');
                const updatedHtml = data.replace(
                    '<h1 id="message">Back end error 000</h1>',
                    `<h1 id="message">${response.data.message}</h1>`
                );
                res.send(updatedHtml);
            } catch (error) {
                console.error('Error connecting to backend:', error);
                res.send('<h1>Error connecting to backend</h1>');
            }
        }
    });
});

app.get('/hello', async (req, res) => {
    const filePath = path.join(__dirname, 'hello.html');
    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading hello.html:', err);
            res.status(500).send('<h1>Internal Server Error</h1>');
        } else {
            try {
                const response = await axios.get('http://backend:5000/hello');
                const updatedHtml = data.replace(
                    '<h1 id="message">Back end error 000</h1>',
                    `<h1 id="message">${response.data.message}</h1>`
                );
                res.send(updatedHtml);
            } catch (error) {
                console.error('Error connecting to backend:', error);
                res.send('<h1>Error connecting to backend</h1>');
            }
        }
    });
});

app.get('/goodbye', async (req, res) => {
    const filePath = path.join(__dirname, 'goodbye.html');
    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading goodbye.html:', err);
            res.status(500).send('<h1>Internal Server Error</h1>');
        } else {
            try {
                const response = await axios.get('http://backend:5000/goodbye');
                const updatedHtml = data.replace(
                    '<h1 id="message">Back end error 000</h1>',
                    `<h1 id="message">${response.data.message}</h1>`
                );
                res.send(updatedHtml);
            } catch (error) {
                console.error('Error connecting to backend:', error);
                res.send('<h1>Error connecting to backend</h1>');
            }
        }
    });
});

app.get('/first', async (req, res) => {
    const filePath = path.join(__dirname, 'template.html');
    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading template.html:', err);
            res.status(500).send('<h1>Internal Server Error</h1>');
        } else {
            try {
                const response = await axios.get('http://backend:5000/first');
                const updatedHtml = data.replace(
                    '<h1 id="headerMessage">Back end error 000</h1>',
                    `<h1 id="headerMessage">${response.data.headerMessage}</h1>`
                ) .replace(
                    '<p id="bodyMessage">Back end error 001</p>',
                    `<p id="bodyMessage">${response.data.bodyMessage}</p>`
                );
                res.send(updatedHtml);
            } catch (error) {
                console.error('Error connecting to backend:', error);
                res.send('<h1>Error connecting to backend</h1>');
            }
        }
    });
});

app.listen(3000, () => {
    console.log('Frontend running on http://localhost:3000');
});
