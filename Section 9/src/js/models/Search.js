//https://developer.edamam.com/admin/applications/1409618683753 API ZA PROJEKAT
import axios from 'axios';
import {key, proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    //Limit je 50 poziva dnevno za API
    async getResults() {
        //const proxy = 'http://cors-anywhere.herokuapp.com/'
        //const baseURL = 'http://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search';//'http://cors-anywhere.herokuapp.com/https://api.edamam.com';
        //const apiKey = '6b8c3ba91323f32ed3ba62bac3cced59'//'4f38b7a07b5110d3c4d9ec4e7ba35568';
        //const apiAppID = 'd415ea74';
        try {
            //REMOVE - from url to work
            //Proslijedili smo query u url, query je keyword koju ukucamo u search baru
            //const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            //U this.result spasimo dohvaceni objekat sa trazenim pojmom
            this.result = res.data.recipes;
            console.log(res);

        } catch (err) {
            alert('Error iz Search.js')
        }
    }
}
//---