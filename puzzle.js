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
let permutationsPossibles = permutations(listeComplète, 2);


//FX prend en entrée deux array et produit un autre array qui correspond au premier array sans les éléments du deuxième array.
//Produit par Gemini: https://g.co/gemini/share/9788aebca884
function difference(tab1, tab2) {
    // Convertir les tableaux en ensembles pour une comparaison plus rapide
    const set1 = new Set(tab1);
    const set2 = new Set(tab2);

    // Créer un nouveau tableau pour stocker les éléments uniques
    const difference = [];

    // Itérer sur le premier ensemble
    for (const element of set1) {
        // Si l'élément n'est pas dans le deuxième ensemble, l'ajouter au nouveau tableau
        if (!set2.has(element)) {
            difference.push(element);
        }
    }

    // Retourner le nouveau tableau
    return difference;
}



//FX permet de transformer les nombres décomposés dans des Array du genre [[1,2], [2,3], [4,5], [5,6,7]] en des nombres recomposés dans des arrays, genre [[12], [23], [45], [567]]
function transformeEnNombre(arrayDeArrayDécomposés) {
    let arrayOutput = [];
    let nbreOutput = [];
    for (let i = 0; i < arrayDeArrayDécomposés.length; i++) {
        stringCréé = "";
        for (let j = 0; j < arrayDeArrayDécomposés[i].length; j++) {
            stringCréé = stringCréé + arrayDeArrayDécomposés[i][j]; //J'aggrège les charactères dans un string
        }
        arrayOutput.push(stringCréé); //J'ajoute le string à mon array
        //console.log(arrayOutput);
    }

    for (let i = 0; i < arrayOutput.length; i++) {
        nbreOutput.push(Number(arrayOutput[i])); //Je transforme les strings de chaque array en nombres exploitables et ajoute le résultat à nbreOutput
    }
    return nbreOutput;
}


//FX permet de transformer les arrays avec des nombres genre [12,23,45,567] en array de nombres décomposés du genre [[1,2], [2,3], [4,5], [5,6,7]]
//Bref, l'inverse de transformeEnNombre(arrayDeArrayDécomposés)
function transformeEnSingleDigitDansArray(arrayDeNombres) {
    let arrayOutput = [];
    let arrayDeString = arrayDeNombres.map(String);


    for (let i = 0; i < arrayDeString.length; i++) {
        stringCréé = [];
        for (let j = 0; j < arrayDeString[i].length; j++) {
            stringCréé.push(Number(arrayDeString[i][j])); //Je transforme les characters en chiffre puis les aggrège dans un array
        }
        arrayOutput.push(stringCréé); //J'ajoute le string à mon array
    }

    return arrayOutput;
}


//FX permet de multiplier les valeurs d'un array par une valeur donnée
function multiplier(liste, n) {
    let produit = [];
    for (let i = 0; i < liste.length; i++) {
        produit.push(liste[i] * n);
    }
    return produit;
}

//FX permet d'additionner les valeurs d'un array par une valeur donnée
function additionner(liste, n) {
    let somme = [];
    for (let i = 0; i < liste.length; i++) {
        somme.push(liste[i] + n);
    }
    return somme;
}

//FX aggrège dans un array d'arrays opérandes 1 et 2 possibles, les produits possibles et les produits valides
function Multiplication(liste) {
    let arrayDesPossibles = [];
    let matriceDesPossible = [];
    let permutationsPossiblesChiffresDansArray = permutations(liste, 2);
    let permutationsPossiblesNbre = transformeEnNombre(permutations(listeComplète, 2));
    let opérande2Possibles = [];
    let chiffresValides = [];

    for (let i = 0; i < permutationsPossiblesChiffresDansArray.length; i++) {

        let opérande1 = permutationsPossiblesNbre[i];//GG
        //console.log(opérande1);
        opérande2Possibles = difference(liste, permutationsPossiblesChiffresDansArray[i]);
        let listeDesProduits = multiplier(opérande2Possibles, opérande1);
        let listeDesProduitsPossiblesDécomposés = transformeEnSingleDigitDansArray(listeDesProduits);
        let produitsValidesPostMultiplication = listeDesProduitsPossiblesDécomposés;

        for (let j = 0; j < listeDesProduitsPossiblesDécomposés.length; j++) {
            chiffresValides = opérande2Possibles.filter((chiffre_OK) => chiffre_OK !== opérande2Possibles[j]); //Si je multiplie 12 * 3, je dois retirer 3 de la liste des chiffres valides. Mais quand je multiplie par 4, c'est 4 qui ne doit plus faire partie de la liste des chiffres valides.

            for (let k = 0; k < listeDesProduitsPossiblesDécomposés[j].length; k++) {

                if (!chiffresValides.includes(listeDesProduitsPossiblesDécomposés[j][k])) { //Si au moins un chiffre qui compose le produit n'est pas inclus dans la liste des chiffres valides…
                    produitsValidesPostMultiplication = produitsValidesPostMultiplication.filter((chiffre) => chiffre !== listeDesProduitsPossiblesDécomposés[j]); //Alors on retire ce produit de la liste des produitsValidesPostMultiplication.
                    break;
                } else if (listeDesProduitsPossiblesDécomposés[j].length > 2) {  //Si le produit est supérieur à 100 (plus de 2 chiffres), et que donc ça ne matche pas avec le problème…
                    produitsValidesPostMultiplication = produitsValidesPostMultiplication.filter((chiffre) => chiffre !== listeDesProduitsPossiblesDécomposés[j]); //Alors on retire ce produit de la liste des produitsValidesPostMultiplication.
                    break;
                }
            }
        }

        arrayDesPossibles = []; // Je ré initialise arrayDesPossibles avant d'y ajouter les nouvelles valeurs, pour avoir un truc clean
        arrayDesPossibles.push(opérande1, opérande2Possibles, listeDesProduits, listeDesProduitsPossiblesDécomposés, produitsValidesPostMultiplication, transformeEnNombre(produitsValidesPostMultiplication));

        matriceDesPossible[i] = new Array(1).fill(arrayDesPossibles);

    }

    return (matriceDesPossible);
}

console.log(Multiplication(listeComplète));

//FX qui clean la matriceDesPossibles post multiplication pour donner la matrice des valides
function nettoyageMatricielPostMultiplication(matriceAnettoyer) {
    let matriceDesValides = [];
    let arrayDesValides = [];
    for (let i = 0; i < matriceAnettoyer.length; i++) {
        if (matriceAnettoyer[i][0][4].length !== 0) {
            arrayDesValides = []; // Je ré initialise arrayDesPossibles avant d'y ajouter les nouvelles valeurs, pour avoir un truc clean
            arrayDesValides.push(matriceAnettoyer[i][0][0], multiplier(matriceAnettoyer[i][0][5], (1 / matriceAnettoyer[i][0][0])), matriceAnettoyer[i][0][5]); //Je me sers de la fonction multiplier, mais j'inverse la valeur pour obtenir une division à la place
            matriceDesValides[matriceDesValides.length] = new Array(1).fill(arrayDesValides);
        }
    }
    return (matriceDesValides);
}



//FX qui clean la matriceDesPossibles post addition pour donner la matrice des valides
function nettoyageMatricielPostAddition(matriceAnettoyer) {
    let matriceDesValidesPostAddition = [];
    let arrayDesValides = [];
    for (let i = 0; i < matriceAnettoyer.length; i++) {
        if (matriceAnettoyer[i][0][8].length !== 0) {
            arrayDesValides = []; // Je ré initialise arrayDesPossibles avant d'y ajouter les nouvelles valeurs, pour avoir un truc clean
            arrayDesValides.push(matriceAnettoyer[i][0][0], matriceAnettoyer[i][0][1], matriceAnettoyer[i][0][2], matriceAnettoyer[i][0][4], matriceAnettoyer[i][0][5], additionner(matriceAnettoyer[i][0][8], -matriceAnettoyer[i][0][2]), matriceAnettoyer[i][0][8], matriceAnettoyer[i][0][7]);
            matriceDesValidesPostAddition[matriceDesValidesPostAddition.length] = new Array(1).fill(arrayDesValides);
        }
    }
    return (matriceDesValidesPostAddition);
}




//FX qui se sert de la matriceDesValides pour procéder à l'addition finale, pour aggréger dans une nouvelle matrice les opérandes possibles et valides de l'addition, ainsi que les résultats possibles et valides.
function addition(listeComplète) {
    let listeDesChiffresUtilisés = [];
    let matriceDesPossiblesNettoyée = nettoyageMatricielPostMultiplication(Multiplication(listeComplète));
    let matriceDesPossiblesPourAddition = [];
    console.log(matriceDesPossiblesNettoyée);

    for (let i = 0; i < matriceDesPossiblesNettoyée.length; i++) {

        listeDesChiffresUtilisés = transformeEnSingleDigitDansArray(matriceDesPossiblesNettoyée[i][0])[0]; //J'ajoute les chiffres de l'opérande1 à la liste des chiffres utilisés

        for (let j = 0; j < matriceDesPossiblesNettoyée[i][0][1].length; j++) {
            listeDesChiffresUtilisés.push(matriceDesPossiblesNettoyée[i][0][1][j]); //J'ajoute le chiffre de l'opérande2 à la liste des chiffres utilisés

            loopChoixQuotien: for (let k = 0; k < matriceDesPossiblesNettoyée[i][0][2].length; k++) {
                for (let l = 0; l < transformeEnSingleDigitDansArray(matriceDesPossiblesNettoyée[i][0][2])[j].length; l++) { //J'utilise j au lieux de K, comme ça l'opérande 2 et le produit associé sont traités ensemble. Faire absolument toutes les combinaisons n'a pas de sens.

                    listeDesChiffresUtilisés.push(transformeEnSingleDigitDansArray(matriceDesPossiblesNettoyée[i][0][2])[j][l]);

                    if (listeDesChiffresUtilisés.length === 5) {
                        let opérande1 = matriceDesPossiblesNettoyée[i][0][0];
                        let opérande2 = matriceDesPossiblesNettoyée[i][0][1][j];
                        let produit = matriceDesPossiblesNettoyée[i][0][2][j];
                        let listeChiffresPourAddition = difference(listeComplète, listeDesChiffresUtilisés);

                        let opérande3Possibles = transformeEnNombre(permutations(listeChiffresPourAddition, 2));
                        let listeDesSommesPossibles = additionner(transformeEnNombre(permutations(listeChiffresPourAddition, 2)), matriceDesPossiblesNettoyée[i][0][2][j]);
                        let listeDesSommesPossiblesDécomposées = transformeEnSingleDigitDansArray(listeDesSommesPossibles);
                        let ListeSommesValidesDécomposées = listeDesSommesPossiblesDécomposées;

                        listeDesChiffresUtilisés = listeDesChiffresUtilisés.slice(0, -3); //!!!Je réinitialise la listeDesChiffresUtilisés en supprimant l'opérande 2 et le produit. La loop va push l'opérande 2 et le produit suivant.


                        for (let m = 0; m < listeDesSommesPossiblesDécomposées.length; m++) {

                            for (let n = 0; n < listeDesSommesPossiblesDécomposées[m].length; n++) {

                                if (!listeChiffresPourAddition.includes(listeDesSommesPossiblesDécomposées[m][n])) { //Si au moins un chiffre qui compose la somme obtenue n'est pas inclus dans la liste des chiffres valides…
                                    ListeSommesValidesDécomposées = ListeSommesValidesDécomposées.filter((chiffre) => chiffre !== listeDesSommesPossiblesDécomposées[m]); //Alors on retire cette somme de ListeSommesValidesDécomposées.
                                    break;
                                } else if (listeDesSommesPossiblesDécomposées[m].length > 2) { //Si le produit est supérieur à 100 (plus de 2 chiffres), et que donc ça ne matche pas avec le problème…
                                    ListeSommesValidesDécomposées = ListeSommesValidesDécomposées.filter((chiffre) => chiffre !== listeDesSommesPossiblesDécomposées[m]); //Alors on retire cette somme de ListeSommesValidesDécomposées.
                                    break
                                }
                            }
                        }

                        arrayDesPossiblesPourAddition = []; // Je ré initialise arrayDesPossibles avant d'y ajouter les nouvelles valeurs, pour avoir un truc clean

                        arrayDesPossiblesPourAddition.push(opérande1, opérande2, produit, listeChiffresPourAddition, opérande3Possibles, listeDesSommesPossibles, listeDesSommesPossiblesDécomposées, ListeSommesValidesDécomposées, transformeEnNombre(ListeSommesValidesDécomposées));

                        matriceDesPossiblesPourAddition[matriceDesPossiblesPourAddition.length] = new Array(1).fill(arrayDesPossiblesPourAddition);

                        break loopChoixQuotien; // On break la loop externe
                    }
                }
            }
        }
    }

    return (matriceDesPossiblesPourAddition);
}
console.log(addition(listeComplète));


//FX qui retourne la solution, en calculant les valides depuis la matriceDesValidesPostAddition
function résultat(listeComplète) {
    let matriceDesRésultatsPossibles = nettoyageMatricielPostAddition(addition(listeComplète));
    console.log(matriceDesRésultatsPossibles);
    let listeDesChiffresUtilisés = [];
    let matriceDesRésultatsValides = [];



    for (let i = 0; i < matriceDesRésultatsPossibles.length; i++) {

        listeDesChiffresUtilisés = []; // Je réinitialise cette valeur avant de recommencer une boucle
        listeDesChiffresUtilisés = listeDesChiffresUtilisés.concat(transformeEnSingleDigitDansArray(matriceDesRésultatsPossibles[i][0])[0]).concat(transformeEnSingleDigitDansArray(matriceDesRésultatsPossibles[i][0])[1]).concat(transformeEnSingleDigitDansArray(matriceDesRésultatsPossibles[i][0])[2]); // J'aggrège les chiffres utilisés pour l'opérande 1, l'opérande 2 et le produit


        for (let j = 0; j < matriceDesRésultatsPossibles[i][0][5].length; j++) {
            listeDesChiffresUtilisés = listeDesChiffresUtilisés.concat(transformeEnSingleDigitDansArray(matriceDesRésultatsPossibles[i][0][5])[j]); // Je poursuis la construction de listeDesChiffresUtilisés en aggrègeant les chiffres utilisés pour l'opérande 3
            console.log("Liste des chiffres utilisés: " + listeDesChiffresUtilisés);
            console.log("Le résultat final est " + matriceDesRésultatsPossibles[i][0][6][j]);
            let listeDesChiffresUtilisésPourLeRésultatFinal = difference(listeComplète, listeDesChiffresUtilisés);
            console.log("Les 2 chiffres autorisés pour le résultat final sont " + listeDesChiffresUtilisésPourLeRésultatFinal);
            console.log("Donc le résultat final doit être " + Number((String(listeDesChiffresUtilisésPourLeRésultatFinal[0]) + String(listeDesChiffresUtilisésPourLeRésultatFinal[1]))) + " oubien " + Number((String(listeDesChiffresUtilisésPourLeRésultatFinal[1]) + String(listeDesChiffresUtilisésPourLeRésultatFinal[0]))));
            console.log("C'est le cas ? => " + matriceDesRésultatsPossibles[i][0][6][j] == Number((String(listeDesChiffresUtilisésPourLeRésultatFinal[0]) + String(listeDesChiffresUtilisésPourLeRésultatFinal[1]))) || matriceDesRésultatsPossibles[i][0][6][j] == Number((String(listeDesChiffresUtilisésPourLeRésultatFinal[1]) + String(listeDesChiffresUtilisésPourLeRésultatFinal[0]))));

            if (matriceDesRésultatsPossibles[i][0][6][j] == Number((String(listeDesChiffresUtilisésPourLeRésultatFinal[0]) + String(listeDesChiffresUtilisésPourLeRésultatFinal[1]))) || matriceDesRésultatsPossibles[i][0][6][j] == Number((String(listeDesChiffresUtilisésPourLeRésultatFinal[1]) + String(listeDesChiffresUtilisésPourLeRésultatFinal[0])))) {
                arrayFinaleDesValides = []; // Je ré initialise arrayDesPossibles avant d'y ajouter les nouvelles valeurs, pour avoir un truc clean
                arrayFinaleDesValides = matriceDesRésultatsPossibles[i][0];

                matriceDesRésultatsValides[matriceDesRésultatsValides.length] = new Array(1).fill(arrayFinaleDesValides);
            }



            listeDesChiffresUtilisés = listeDesChiffresUtilisés.slice(0, -2); //!!!Je réinitialise la listeDesChiffresUtilisés en supprimant l'opérande 3. La loop va push l'opérande 3 au tour suivant.
        }
    }

    matriceDesRésultatsValides = matriceDesRésultatsValides[0];
    console.log(matriceDesRésultatsValides);
    return matriceDesRésultatsValides;
}

résultat(listeComplète);

//Notes pour refactoring: Faut que je me serve de concat. pour créer listeDesChiffresUtilisés en utilisant moins de for loops




