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
    
    function hideElements(vID) { 
        var vHP;
        $(vID).children().each( function(index){ 
            vHP=$(this).children('.charValue').attr('data-hp-value') ;
            $(this).children('.charValue').text(vHP);
            $(this).hide();
        });
    };

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

    $('.baseCharacter').on('click', function() {
        $("#idEnemiesHeader").show();
        
        var charBName;
        vBaseCharacter=$(this).attr('data-character-name');
        
        if( mouseClickBaseChar ){
            mouseClickBaseChar=false;
            mouseClickEnemyChar=true;
            $(this).siblings().each( function(index)  {
                // console.log(index+": "+ $(this).attr('data-character-name'));
                charBName=$(this).attr('data-character-name');
                $(this).hide();
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

    $('.enemyCharacter').on('click', function() {
        console.log("Numberofenemies:"+numberOfEnemies);
        if( mouseClickEnemyChar) {
            $('#idMessage').text("");
            $("#idDefenderHeader").show();
            $("#idFightSection").show();
        
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


    $('#idAttack').on('click', function() {
        console.log("Numberofenemies:"+numberOfEnemies);
        if(numberOfEnemies===0) {
            $("#idMessage").text("Game Over!! Click Restart to Begin the Game!");
            $('#idAttack').hide();
        } else if(mouseClickAttack===false){
            $("#idMessage").text("No Enemy to Attack!!");
        } else {
            var vIDBaseCharacter = "#"+vBaseCharacter;
            var vIDDefenderCharacter = "#"+vDefenderCharacter;
                
            vAPD=$('#idDefender').children(vIDDefenderCharacter).children('.charValue').attr('data-ap-value');
                console.log("Defender Attack Points: "+vAPD);
                
                if( vCounter===0) {
                    vAPB=$('#idYourCharacter').children(vIDBaseCharacter).children('.charValue').attr('data-ap-value');
                    console.log("base Attack Points: "+vAPB);
                    console.log($('#idYourCharacter').children(vIDBaseCharacter).children('.charValue'));
                    vscoreB = $('#idYourCharacter').children(vIDBaseCharacter).children('.charValue').attr('data-hp-value');
                    vscoreD = $('#idDefender').children(vIDDefenderCharacter).children('.charValue').attr('data-hp-value');
                    console.log("83): scoreB "+ vscoreB+" ,vscoreD "+ vscoreD );
                    
                }else {
                    vscoreB=$('#idYourCharacter').children(vIDBaseCharacter).children('.charValue').text();
                    vscoreD = $('#idDefender').children(vIDDefenderCharacter).children('.charValue').text();
                    console.log("88): scoreB "+ vscoreB+" ,vscoreD "+ vscoreD );
                }
                vCounter++;
                newScoreD=parseInt(vscoreD)-vCounter*vAPB;
                newScoreB=parseInt(vscoreB)-vAPD;
                console.log("D:"+newScoreD);
                console.log("B:"+newScoreB);
                $('#idDefender').children(vIDDefenderCharacter).children('.charValue').text(newScoreD);
                if ( newScoreD <= 0 ) {
                    numberOfEnemies--;
                    if(numberOfEnemies===0) {
                        $("#idMessage").text("Game Over!! Click Restart to Begin the Game!");
                        $("#idAttack").hide();
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

                    $('#idYourCharacter').children(vIDBaseCharacter).children('.charValue').text(newScoreB);
                    $('#idMessage').html("You have been defeated ........GAME OVER!!"+"<br><br>Click Restart to Begin the Game!");
                    mouseClickEnemyChar=false;
                    mouseClickAttack=false;
                    $("#idFightSection").hide();
                    
                    
                } else {
                    
                    $('#idMessage').html("<p>You attacked "+vDefenderCharacter+" with "+ vCounter*vAPB+" damage</p>" 
                    + "<p>"+vDefenderCharacter+" attacked with "+vAPD+" damage</p>");
                    $('#idYourCharacter').children(vIDBaseCharacter).children('.charValue').text(newScoreB);
                }
            
            // } else if(newScoreB>0) {
            //     $('#idMessage').text("No Enemy to Fight!");
            //     mouseClickEnemyChar=true;
            // }
        }
    });

    $('#idReset').on('click', function() {
         initializeScreen();
    });

    initializeScreen();


});