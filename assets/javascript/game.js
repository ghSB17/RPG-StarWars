$(document).ready( function() {
    
    var vBaseCharacter;
    var vDefenderCharacter;
    var vCounter=0;
    var vCharScore=0;
    var vDefenderScore=0;
    var mouseClickBaseChar=true;
    var mouseClickEnemyChar=true;
    var mouseClickAttack=false;
    var vscoreB;
    var vscoreD;
    var newScoreB;
    var newScoreD;
    var vAPB;
    var vAPD;
    var numberOfEnemies=0;
    
    //Function to Hide Elements of Div Tag, It accepts a string parameter which is "ID" of the tag to be hidden
    function hideElements(vID) { 
        var vHP;
        $(vID).children().each( function(index){ 
            vHP=$(this).children('.charValue').attr('data-hp-value') ;
            $(this).children('.charValue').text(vHP);
            $(this).hide();
        });
    };

    //Function to initialize Screen for the NewGame 
    //Only character to be chosen are visible
    function initializeScreen() {
        var vHP;
        hideElements('#idDefender');
        hideElements('#idEnimiesAvailable');
        $("#idEnemiesHeader").hide();
        $("#idDefenderHeader").hide();
        $("#idFightSection").hide();
        $('#idYourCharacter').children().each( function(index){ 
            vHP=$(this).children('.charValue').attr('data-hp-value') ;
            $(this).children('.charValue').text(vHP);
            $(this).show();
        });
        
        $('#idMessage').text("");
        mouseClickBaseChar=true;
        mouseClickEnemyChar=false;
        mouseClickAttack=false;
        vBaseCharacter="";
        vDefenderCharacter="";
        vCounter=0;
        numberOfEnemies=0;

    }

    //Once the character to be chosen is Visible, 
    //Display Enemy Characters avaiable 
    $('.baseCharacter').on('click', function() {
        $("#idEnemiesHeader").show();
        
        var charBName;
        vBaseCharacter=$(this).attr('data-character-name');
        
        if( mouseClickBaseChar ){
            mouseClickBaseChar=false;
            mouseClickEnemyChar=true;
            $(this).siblings().each( function(index)  {
                //Hide all the other characters in "Characters to be Chosen" area 
                //except the chosen Character
                charBName=$(this).attr('data-character-name');
                $(this).hide();
                //Show the Enemy Characters available based on the chosen Character
                $('#idEnimiesAvailable').children().each( function(index) {
                    if( $(this).attr('data-character-name') === charBName )  { 
                        numberOfEnemies++;
                        $(this).css({"border":"3px solid black","background-color":"red"});
                        $(this).show();
                    }
                });
            });
        }

    });

    //When Enemy Character is Chosen
    //Fight Section with "Attack" Button is Displayed
    $('.enemyCharacter').on('click', function() {
        console.log("Numberofenemies:"+numberOfEnemies);
        if( mouseClickEnemyChar) {
            $('#idMessage').text("");
            $("#idDefenderHeader").show();
            $("#idFightSection").show();
            //To avoid choosing another Enemy

            mouseClickEnemyChar=false;
            vDefenderCharacter=$(this).attr('data-character-name');
            mouseClickAttack=true;
            
            $('#idDefender').children().each( function(index) {
                if( $(this).attr('data-character-name') === vDefenderCharacter )  { 
                    $(this).css({"background-color":"black","color":"white"});
                    $(this).show();
                } else 
                    $(this).hide();
            });
            $(this).hide();
            
        }
    
    });

    //Triggered When Attack Button
    //Decrease the Defender Health Points by Chosen Character Attack Points(which increase by attack points on every attack) 
    //Decrease the Chosen Character Health Points by  Defender Attack Points(which are constant)
    $('#idAttack').on('click', function() {
        console.log("Numberofenemies:"+numberOfEnemies);
        //If No Enemies are Left to Attack
        if(numberOfEnemies===0) {
            $("#idMessage").text("Game Over!! Click Restart to Begin the Game!");
            $('#idEnemiesHeader').hide();
            $('#idFightSection').hide();
        } else if(mouseClickAttack===false){
            //If No Enemy is Chosen from the Available Enemies
            $("#idMessage").text("No Enemy to Attack!!");
        } else {
            var vIDBaseCharacter = "#"+vBaseCharacter;
            var vIDDefenderCharacter = "#"+vDefenderCharacter;
                
            vAPD=$('#idDefender').children(vIDDefenderCharacter).children('.charValue').attr('data-ap-value');
                
                if( vCounter===0) {
                    vAPB=$('#idYourCharacter').children(vIDBaseCharacter).children('.charValue').attr('data-ap-value');
                    vscoreB = $('#idYourCharacter').children(vIDBaseCharacter).children('.charValue').attr('data-hp-value');
                    vscoreD = $('#idDefender').children(vIDDefenderCharacter).children('.charValue').attr('data-hp-value');
                   
                }else {
                    vscoreB=$('#idYourCharacter').children(vIDBaseCharacter).children('.charValue').text();
                    vscoreD = $('#idDefender').children(vIDDefenderCharacter).children('.charValue').text();
                }
                vCounter++;
                newScoreD=parseInt(vscoreD)-vCounter*vAPB;
                newScoreB=parseInt(vscoreB)-vAPD;
                $('#idDefender').children(vIDDefenderCharacter).children('.charValue').text(newScoreD);

                //If Defender Health Points Decreased to "0"
                //Propt to Choose a New Enemy to continue the Game Or
                //If No Enemies are Available, Prompt to Restart the Game
                if ( newScoreD <= 0 ) {
                    numberOfEnemies--;
                    if(numberOfEnemies===0) {
                        $("#idMessage").html("<p><h2>You are the Winner!!</h2></p>"+
                                        "<p>Game Over!! Click Restart to Begin A New Game!</p>");
                        $('#idEnemiesHeader').hide();
                        $('#idFightSection').hide();
                    } else {
                        $('#idMessage').text("You have defeated "+vDefenderCharacter+". "+"You may choose to fight different Enemy character");
                        vDefenderCharacter="";
                        mouseClickEnemyChar=true;
                        newScoreB+=vAPD;
                        $('#idDefender').children(vIDDefenderCharacter).hide();
                        mouseClickEnemyChar=true;
                        mouseClickAttack=false;
                    }

                } else if( newScoreD > 0 && newScoreB <= 0 ) {
                //If Chosen Character Health Points are reduced to "0"
                //Prompt to Restart Game
                    $('#idYourCharacter').children(vIDBaseCharacter).children('.charValue').text(newScoreB);
                    $('#idMessage').html("<p>You have been defeated ........GAME OVER!!</p>"+"<p>Click Restart to Begin A New Game!</p>");
                    mouseClickEnemyChar=false;
                    mouseClickAttack=false;
                    
                    $("#idFightSection").hide();
                    
                    
                } else {
                    
                    $('#idMessage').html("<p>You attacked "+vDefenderCharacter+" with "+ vCounter*vAPB+" damage</p>" 
                    + "<p>"+vDefenderCharacter+" attacked with "+vAPD+" damage</p>");
                    $('#idYourCharacter').children(vIDBaseCharacter).children('.charValue').text(newScoreB);
                }
            
        }
    });

    //Reset the Game by Initializing all the Elements, variables for New Game
    $('#idReset').on('click', function() {
         initializeScreen();
    });

    initializeScreen();


});