

//Recupérer la class qui contient ..
function getCards(){
    var x = $('div[class*="MuiGrid-root"]')
    //Récuperer nombre de carte sur la page(40 normalement)
    var y = x.getElementsByClassName("MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-3")

    
    for (let i =0; i<y.length;i++){
        var card = y[i].getElementsByClassName('MuiBadge-root')
        var url = card[0].getElementsByTagName('a')[0].getAttribute("href")
        url = url.substring(7) // retire les 7 premiers caractères ("/cards/")
        var url_split = url.split('-') // transforme url en tableau
        url_split = url_split.slice(-0,-3) // retire type de carte, année,et numéro
        var slug = url_split.join('-') // generation du slug de la carte 
        if (!arrayPlayersSlug.includes(slug)){
            arrayPlayersSlug.push(slug)
        }
        
    }
    arrayPlayersSlug = JSON.stringify(arrayPlayersSlug)
    console.log(arrayPlayersSlug)
}

//Send GraphQL request 
function sendRequest(slugs) {
    var test;
    fetch('https://api.sorare.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `   
            {
                players(slugs: `+slugs+`){
                slug
                displayName
                }
            }
            `
        }),
        })
        .then((res) => res.json())
        .then((result) => setHTML(result.data.players))
        console.log('true')  
      
        
    }


function setHTML(arrayResult){
    for (let i = 0; i< arrayResult.length; i++){
        player = arrayResult[i]
        slug = player.slug
        playerName = player.displayName
        playerPresence = document.querySelectorAll('a[href*="'+slug+'"')
        
        for(let j = 0; j<playerPresence.length; j++){

            //Select in the DOM the good area to inject link
            parent = playerPresence[j].parentNode
            parentGetDiv = parent.getElementsByTagName('div')
            addToClass = parentGetDiv[2] //Add to good class

            
            var link = document.createElement("a")
            var image = document.createElement("img")
            link.setAttribute('href', 'https://www.soraredata.com/playerSearch/'+playerName)
            link.setAttribute('target','_blank')
            image.setAttribute('alt', 'soraredata')
            image.setAttribute('src', 'https://i.postimg.cc/63cf7Xzd/X6-Qnd4-Lk-200x200-2.jpg')
            link.appendChild(image)
            addToClass.appendChild(link)

        }
    }
    return true
}


var arrayPlayersSlug = []
function start(){
    
    getCards()
    sendRequest(arrayPlayersSlug)
    setHTML

}
 start()