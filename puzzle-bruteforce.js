const listeComplète = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//FX Permet de produire l'ensemble des permutations de n éléments à partir d'une liste d'éléments.
//Résultat expected: [[1,2], [2,3], [4,5]]. Ce sont des integers dans les arrays.
//Fonction produite par Gémini! 
function permutations(liste, n) {
    if (n === 0) {
        return [[]];
    }

    const permutationsResultats = [];
    for (let i = 0; i < liste.length; i++) {
        const element = liste[i];
        const sousListe = liste.slice(0, i).concat(liste.slice(i + 1));
        const permutationsRec = permutations(sousListe, n - 1);
        permutationsResultats.push(...permutationsRec.map(permutation => [element, ...permutation]));
    }

    return permutationsResultats;
}
let toutesLesCombinaisonsPossibles = permutations(listeComplète, 9);
console.log(toutesLesCombinaisonsPossibles[1]);

function bruteForce() {

    
    for (let z = 0; z < toutesLesCombinaisonsPossibles.length; z++) {
        
        let a = toutesLesCombinaisonsPossibles[z][0];
        let b = toutesLesCombinaisonsPossibles[z][1];
        let c = toutesLesCombinaisonsPossibles[z][2];
        let d = toutesLesCombinaisonsPossibles[z][3];
        let e = toutesLesCombinaisonsPossibles[z][4];
        let f = toutesLesCombinaisonsPossibles[z][5];
        let g = toutesLesCombinaisonsPossibles[z][6];
        let h = toutesLesCombinaisonsPossibles[z][7];
        let i = toutesLesCombinaisonsPossibles[z][8];


        if ((a * 10 + b) * c == (d * 10 + e) && (d * 10 + e) + (f * 10 + g) == (h * 10 + i)) {
            console.log((a * 10 + b));
            console.log("x");
            console.log(c);
            console.log("--------");
            console.log((d * 10 + e));
            console.log("+");
            console.log((f * 10 + g));
            console.log("--------");
            console.log((h * 10 + i));
            console.log("Résultat trouvé après " + z + " tentatives!");
        }

    }
}

bruteForce();