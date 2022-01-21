let martian = 0;
let maxTrees = 50;
let guesses = [];
let isGameOver = false;

const previous = document.querySelector('.previous');
const trees = document.querySelector('.trees');
const form = document.querySelector('form.guess');

form.addEventListener( 'submit', event => {
    event.preventDefault();
    guess(form.guess.value);
});

let setBoard = () => {
    isGameOver = false;
    guesses = [];
    while (trees.firstChild) {
        trees.firstChild.remove();
    }
    while (previous.firstChild){
        previous.firstChild.remove();
    }
    for(let i = 1; i <= maxTrees; i++){
        let tree=document.createElement("div");
        tree.className = "tree";
        tree.id = i;
        tree.onclick = ev => guessClick(ev);
        let number=document.createElement("div");
        number.className = "tree-number";
        number.innerHTML = i.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        //number.onclick = ev => guess(ev.target.parentElement.id);
        let symbol = document.createElement("div");
        symbol.className = "tree-symbol";
        symbol.innerHTML = "♣";
        //symbol.onclick = ev => guess(ev.target.parentElement.id);
        tree.appendChild(symbol);
        tree.appendChild(number);
        trees.appendChild(tree);
    }
    martian = Math.ceil(Math.random()*maxTrees);
}

let guessClick = (event) => {
    if(event.target.id){
        guess(event.target.id);
    } else {
        guess(event.target.parentElement.id)
    }
}

let guess = (n) => {
    if(isGameOver) return setBoard();
    if(n>=1 && n<=maxTrees){
        if(guesses.includes(n)) return taken(n);
        guesses.push(n);
        if(martian < n){
            setIsLess(n);
        }
        if(martian > n){
            setIsMore(n);
        }
        if(martian == n){
            gameOver(n);
        }
    }
    document.getElementById("guess-input").value = '';
}

let setIsLess = n => {
    let p = document.createElement("div");
        p.innerHTML = "O marciano está numa árvore MENOR que " + n;
    previous.appendChild(p);
    
    let tree = document.getElementById(n);
    let treeNumber = tree.querySelector('.tree-number');
    let treeSymbol = tree.querySelector('.tree-symbol');
    treeNumber.classList.add('selected');
    treeSymbol.innerHTML = "<";
}

let setIsMore = n => {
    let p = document.createElement("div");
        p.innerHTML = "O marciano está numa árvore MAIOR que " + n;
    previous.appendChild(p);
    
    let tree = document.getElementById(n);
    let treeNumber = tree.querySelector('.tree-number');
    let treeSymbol = tree.querySelector('.tree-symbol');
    treeNumber.classList.add('selected');
    treeSymbol.innerHTML = ">";
}

let gameOver = n => {
    isGameOver = true;
    let p = document.createElement("div");
        p.innerHTML = "Você encontrou o marciano em " + guesses.length + " tentativas!";
    previous.appendChild(p);
    
    let tree = document.getElementById(n);
    let treeNumber = tree.querySelector('.tree-number');
    let treeSymbol = tree.querySelector('.tree-symbol');
    treeNumber.classList.add('win');
    treeSymbol.innerHTML = "☺";
}

let taken = n => {
    let p = document.createElement("div");
        p.innerHTML = "Você já tentou a árvore " + n;
    previous.appendChild(p);
}
setBoard();
