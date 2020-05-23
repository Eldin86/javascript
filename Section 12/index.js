const fs = require('fs');
const http = require('http');
const url = require('url');//U url su routing

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');//Sinhrono
//console.log(__dirname);//Pitanja do parent foldera?
//console.log(json)

const laptopData = JSON.parse(json);//Parsamo u objekat 
console.log(laptopData);//Dobili smo objekat sa kojim mozemo raditi

const server = http.createServer((req, res) => {
    //console.log('Someone did access the server')//Kad god otvorimo browser sa 127.0.0.1:1337 ispise nam ovu poruku
    const pathName = url.parse(req.url, true).pathname;
    console.log(pathName)
    const id = url.parse(req.url, true).query.id;


    //console.log(`${pathName} ${id}`)

    //console.log(url.parse(req.url, true).query)//Dohvacanje id (http://localhost:1337/products?id=4&name=apple&date=today)

    //PRODUCT OVERVIEW
    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        //Prvo ucitamo file template-overview.html
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {//asinhrono
            let overviewOutput = data; //data template spasimo u overviewOutput varijablu
            //Zatim Unutar template-overview.html template ucitamo template-card.html
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {//asinhrono
                //Provrtimo kroz sve objekte koji su u data.json i proslijedimo u funkciju data template(template-card.html) i el koji je pojedinacni objekat , zatim ih joinamo nakon svake iteracije u string i spasimo u cardsOutput
                const cardsOutput = laptopData.map(el => replaceTemplatE(data, el)).join('');//Nakon sto odradi jedan podatak, pozove join('') metodu i tako za sve ostale i poveze ih u string
                //OverviewOutput je templates-overview.html template i u njemu zamjenimo {%CARDS%} sa zamjenjenim sadrzajem i renderemo varijablu u view odnosno browser
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput)
                
                res.end(overviewOutput)
            })
        })
    } 
    //LAPTOP DETAIL
    else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, { 'Content-type': 'text/html' })
        //res.end(`<h2>This is the LAPTOP page for laptop ${id}</h2>`)

        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {//asinhrono
            const laptop = laptopData[id];
            console.log(laptop.storage)
            console.log(data)

            const output = replaceTemplatE(data, laptop)
            res.end(output)
        })
    } 
    //IMAGES
    else if((/\.(jpg|jpeg|png|gif)$/i).test(pathName)){//Test metoda testira da li url sadrzi dio koji je u regex-u. NPR(/products, /macbook-pro-15.jpg, /laptops i td da li sadrzi .png, .jpg i td)
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            res.writeHead(200, { 'Content-type': 'image/jpeg' });
            res.end(data)
        });
    }
    //URL NOT FOUND
    else {
        res.writeHead(404, { 'Content-type': 'text/html' })
        res.end('<h2>URL was not found on the server</h2>')
    }

    //console.log(req.url);
    //console.log(pathName)

})

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now')
});

function replaceTemplatE(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id)
    return output
}