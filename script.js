document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getData = url =>
      new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          request.addEventListener('readystatechange', () => {
              if (request.readyState !== 4) return;
              if (request.status === 200) {
                  const data = JSON.parse(request.responseText);
                  resolve(data);
              } else {
                  reject(request.statusText);
              }
          });

          request.open('GET', url);
          request.setRequestHeader('Content-type', 'application/json');
          request.send();
      });

    select.addEventListener('change', () => {
        getData('cars.json')
          .then(({ cars }) => {
              cars.forEach(({ brand, model, price }) => {
                  if (brand === select.value) {
                      output.innerHTML = `Тачка ${brand} ${model} <br> Цена: ${price}$`;
                  }
              });
          })
          .catch((err) => {
              output.innerHTML = 'Произошла ошибка';
              console.error(err);
          });
    });

});
