// Objet cellule contenant le nombre de mine voisine,
//  si le nombre de voisin est une mine, la cellule est une mine

class Cellule {
    constructor(nVoisin, display) {
      this.nVoisin = nVoisin;
      this.display = display;
    }
  }

var input_height = document.getElementById("height");
var input_width = document.getElementById("width");
var input_mines = document.getElementById("mines");
var table = document.getElementById("table");
var button = document.getElementById('setting');
var tabDemi =[];
var case_a_reveler;
var parti_en_cours = 0;


button.addEventListener("click", function() {
    var height = input_height.value;
    var width = input_width.value;
    var mines = input_mines.value;
    case_a_reveler = height*width-mines;

    // initialisation tableau 
    parti_en_cours = 1;
    tabDemi = init_tab(height,width,mines,tabDemi);
    display_tab(height,width);
    // Suppression paramètres
    document.getElementById("set").style.display = "none";
    document.getElementById("etat_game").style.display = "flex";
    document.getElementById("etat_game").innerHTML="Parti en cours ...";

    // ---
    var liste=document.getElementsByClassName("cellule"),li=liste.length,i;
    for(i=0;i<li;i++){
    liste[i].addEventListener("click", function(){
        if (parti_en_cours){
            var i = parseInt(this.dataset.i);
            var j = parseInt(this.dataset.j);
            revel(tabDemi,i,j,height,width);
            if (case_a_reveler==0){
                parti_en_cours = 0;
                document.getElementById("etat_game").innerHTML="Vous avez gagnez !<a href='./index.html' id='replay'> Rejouer</a>";
            }
        }
        if (parti_en_cours==0 && case_a_reveler>0){
            document.getElementById("etat_game").innerHTML="Vous avez perdu !<a href='./index.html' id='replay'> Rejouer</a>";
        }
    });
    }
})
function revel(tab,i,j,height,width){
    if (tab[i][j].display==false){
        case_a_reveler--;
        if(tab[i][j].nVoisin==0){
            revel_tab(tab,i,j);
            revel_html(tab,i,j);
            for(var h=-1; h<2; h++){
                for(var l=-1; l<2; l++){  
                        if(h+i>=0 && l+j>=0 && h+i<height && l+j<width){
                            revel(tab,h+i,l+j,height,width);
                        }
                }
            }
            
        }
        else{
            revel_tab(tab,i,j);
            revel_html(tab,i,j);
        }
    }
}
function revel_tab(tab,i,j){
    tab[i][j].display=true;
}
function revel_html(tab,i,j){
    var ecrit = document.querySelector("div[data-i='"+i+"'][data-j='"+j+"']");
   
    if (tab[i][j].nVoisin == 9){
        parti_en_cours = 0;
        ecrit.innerHTML = "<button class='button_mine'></button>";
    }
    else{
        switch (tab[i][j].nVoisin){
            case 3:
                ecrit.innerHTML = "<button class='button_cellule_display text-red'>"+tab[i][j].nVoisin+"</button>";
                break;
            case 2:
                ecrit.innerHTML = "<button class='button_cellule_display text-green'>"+tab[i][j].nVoisin+"</button>";
                break;
            case 1:
                ecrit.innerHTML = "<button class='button_cellule_display text-blue'>"+tab[i][j].nVoisin+"</button>";
                break;
            case 0:
                ecrit.innerHTML = "<button class='button_cellule_display'></button>";
                break;
            default:
                ecrit.innerHTML = "<button class='button_cellule_display'>"+tab[i][j].nVoisin+"</button>";
        }
}
}
function display_tab(height,width){
var tabHTML = "";
for(var i = 0; i<height; i++){
    tabHTML += "<div class='ligne'>";
    for(var j = 0; j<width; j++) {
        tabHTML += "<div class='cellule' data-i='"+i+"' data-j='"+j+"'><button class='button_cellule'></button></div>"
    }
    tabHTML += "</div>";
}
    table.innerHTML = tabHTML;
}
function init_tab(height,width,mines){
    var tab =[];
    for(var i = 0; i<height; i++){
        tab[i]=new Array;
        for(var j = 0; j<width; j++) {
            tab[i][j]=new Cellule(0,false); 
        }
    }
    placemine(tab,height,width,mines)
    return tab;
}
function placemine(tab,height,width,mines){
    var nCellule = height*width;
    var pos = 0;
    var pos_actuelle = 0;
    for(var m=0 ;m < mines ;m++){
        pos_actuelle = 0;
        pos = Math.floor(Math.random() * (nCellule-m));
        for(var i = 0; i<height; i++){
            for(var j = 0; j<width; j++) {
                if (pos==pos_actuelle){
                    if (tab[i][j].nVoisin != 9){
                        tab[i][j].nVoisin = 9;
                        ajoute_voisin(tab,height,width,i,j);
                        i=height;
                        j=width;
                    }
                }
                else{
                    if (tab[i][j].nVoisin != 9){
                        pos_actuelle++;
                    }
                    
                }
            }
        }
    }    
}
function ajoute_voisin(tab,height,width,pos_i,pos_j){
    for(var i = -1; i<=1; i++){
        for(var j = -1; j<=1; j++) {
            if(pos_i+i>=0 && pos_j+j>=0 && pos_i+i<height && pos_j+j<width){
                if(tab[pos_i+i][pos_j+j].nVoisin != 9){
                    tab[pos_i+i][pos_j+j].nVoisin++;
                }
            }
        }
    }
}
