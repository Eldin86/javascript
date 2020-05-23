export default class Likes {
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const like = {id, title, author, img};
        this.likes.push(like);
        //Persist data in localStorage
        this.persistData();
        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id)//Nadjemo like po ID iz niza likes koji zelimo da pobrisemo
        //[2, 4, 8] SPLICE(1, 1) -> returns 4, original array is [2, 8] -> vraca mutirani niz
        //[2, 4, 8] SLICE(1, 2) -> returns 4, original array is [2, 4, 8]
        this.likes.splice(index, 1);//Zelimo da uklonimo samo jedan elemenat

        //Persist data in localStorage
        this.persistData();
    }

    isLiked(id){
        console.log(`Da li je liked recept ili ne ${this.likes.findIndex(el => el.id === id) !== -1}`)
        //Vraca true ili false
        //Vraca index od ID i provjeriti da li je razlicit od -1, ako je index -1 znaci da nije tu 
        return this.likes.findIndex(el => el.id === id) !== -1;//Ako je !== -1, ako ne mozemo naci nijedan item sa ovim id koji smo proslijedili onda je -1, onda vraca false
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));
        //Restore likes from the localStorage
        if(storage){
            this.likes = storage;
        }
    }
}