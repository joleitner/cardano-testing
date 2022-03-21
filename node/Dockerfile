FROM node:17


COPY ./src /src 

RUN git clone https://github.com/Berry-Pool/cardanocli-js.git && cd cardanocli-js && npm install

CMD [ "node" "/src/index.js" ]