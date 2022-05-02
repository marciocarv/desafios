const InitialText = 'teste';

function reverseText(text){
    let finalText = '';
    for(let i = InitialText.length - 1; i>=0; i--){
        finalText += InitialText[i];
    }
    return finalText;

}
    
console.log(reverseText(InitialText));