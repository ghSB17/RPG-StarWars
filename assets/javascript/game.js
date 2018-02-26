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
    
    function hideElements(vID) { 
        var vHP;
        $(vID).children().each( function(index){ 
            vHP=$(this).children('.charValue').attr('data-hp-value') ;
            console.log("17: "+index+": "+vHP);
            $(this).children('.charValue').text(vHP);
            $(this).hide();
        });
    };
    function initializeScreen() {
        var vHP;
        $('#idYourCharacter').children().each( function(index){ 
            vHP=$(this).children('.charValue').attr('data-hp-value') ;
            console.log(index+": "+vHP);
            $(this).children('.charValue').text(vHP);
            $(this).show();
        });
        
        hideElements('#idDefender');
        hideElements('#idEnimiesAvailable');
        $('#idMessage').text("");
        mouseClickBaseChar=true;
        mouseClickEnemyChar=true;
        vBaseCharacter="";
        vDefenderCharacter="";
        vCounter=0;

    }

    $('.baseCharacter').on('click', function() {
        var charBName;
        vBaseCharacter=$(this).attr('data-character-name');
        
        if( mouseClickBaseChar ){
            mouseClickBaseChar=false;

            $(this).siblings().each( function(index)  {
                console.log(index+": "+ $(this).attr('data-character-name'));
                charBName=$(this).attr('data-character-name');
                $(this).hide();
                $('#idEnimiesAvailable').children().each( function(index) {
                    console.log("in children: "+index+": "+ $(this).attr('data-character-name'));
                    if( $(this).attr('data-character-name') === charBName )  { 
                        $(this).css({"border":"1px solid black","background-color":"red"});
                        $(this).show();
                    }
                });
            });
        }

    });

    $('.enemyCharacter').on('click', function() {
        
        if( mouseClickEnemyChar) {
            vDefenderCharacter=$(this).attr('data-character-name');
            mouseClickAttack=true;
            $('#idDefender').children().each( function(index) {
                console.log("in children: "+index+": "+ $(this).attr('data-character-name'));
                if( $(this).attr('data-character-name') === vDefenderCharacter )  { 
                    $(this).css({"background-color":"black","color":"white"});
                    $(this).show();
                } else 
                 $(this).hide();
            });
            $(this).hide();
            mouseClickEnemyChar=false;
        }
    
    });

    $('#idAttack').on('click', function() {
        
        var vIDBaseCharacter = "#"+vBaseCharacter;
        console.log("BaseChar: "+ vBaseCharacter+" ID:"+vIDBaseCharacter);
        var vIDDefenderCharacter = "#"+vDefenderCharacter;
        console.log("DefenderChar: "+vDefenderCharacter+" ID:"+vIDDefenderCharacter);
        // vCounter++
        if(mouseClickAttack) {
            
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
                
                $('#idMessage').text("You have defeated "+vDefenderCharacter+". "+"You may choose to fight different Enemy character");
                vDefenderCharacter="";
                mouseClickEnemyChar=true;
                newScoreB+=vAPD;
                $('#idDefender').children(vIDDefenderCharacter).hide();
                mouseClickEnemyChar=true;
                mouseClickAttack=false;

            } else if( newScoreD > 0 && newScoreB <= 0 ) {

                $('#idYourCharacter').children(vIDBaseCharacter).children('.charValue').text(newScoreB);
                $('#idMessage').text("You have been defeated ........GAME OVER!!");
                mouseClickAttack=false;
                
                
            } else {
                $('#idMessage').html("You attacked "+vDefenderCharacter+" with "+ vCounter*vAPB+" damage" 
                + "<br><br>"+"  "+vDefenderCharacter+" attacked with "+vAPD+" damage");
                $('#idYourCharacter').children(vIDBaseCharacter).children('.charValue').text(newScoreB);
            }
        
        } else if(newScoreB>0) {
            $('#idMessage').text("No Enemy to Fight!");
            mouseClickEnemyChar=true;
        }
    });

    $('#idReset').on('click', function() {

        initializeScreen();
    });

    initializeScreen();


});