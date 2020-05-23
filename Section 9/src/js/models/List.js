import uniqid from 'uniqid';

export default class List{
    constructor(){
        this.items = [];
    }

    addItem(count, unit, ingredient){
        const item = {
            id: uniqid(),
            count,
            unit, 
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id)
        //[2, 4, 8] SPLICE(1, 1) -> returns 4, original array is [2, 8] -> vraca mutirani niz
        //[2, 4, 8] SLICE(1, 2) -> returns 4, original array is [2, 4, 8]
        this.items.splice(index, 1);//Zelimo da uklonimo samo jedan elemenat
    }

    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;
    }
}