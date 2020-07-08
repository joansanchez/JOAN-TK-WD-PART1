
function getInfo(){
    let name = "Dan";
    let lastName ="Brown";
    getBio(name, lastName, function(bio, authorid){
        console.log(bio);
        getBooks(authorid, function(books){
            console.log(books);
            document.getElementById('authorName').innerHTML = name + " " + lastName;
            document.getElementById('authorBio').innerHTML = bio;
            var booksHTML = "";
            books.forEach(book => {
                booksHTML += book + "<br>";
            });
            document.getElementById('authorBooks').innerHTML = booksHTML;
        });
    });
}


function getBio(name, lastName, callback){
    var url = "https://reststop.randomhouse.com/resources/authors?firstName=";
    url = url + name + "&lastName=" + lastName; 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                let json = JSON.parse(xmlHttp.response);
                console.log(json);
                let bio = json.author[0].spotlight;
                let authorid = json.author[0].authorid;
                callback(bio, authorid);
            }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.setRequestHeader("Accept", "application/json"); 
    xmlHttp.send(null);
}

function getBooks(authorid, callback){
    var url = "https://reststop.randomhouse.com/resources/titles?authorid=";
    url = url + authorid; 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                let json = JSON.parse(xmlHttp.response);
                console.log(json);
                var books = [];
                json.title.forEach(book => {
                    books.push(book.titleweb);
                });
                callback(books);
            }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.setRequestHeader("Accept", "application/json"); 
    xmlHttp.send(null);
}