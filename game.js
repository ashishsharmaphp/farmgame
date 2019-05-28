/*
* Created by Ashish Sharma
* Date: 27/05/2019
* Time: 04:50 PM

* This file contains the js logic code for AVADOLearning/farmgame
*/

$( document ).ready(function() {

    createTable(50, 8);

    $("#btnFeed").click(function () {
        Feed();
    });
});

/*
*@author: Ashish Sharma
*@description: This function is used to create initial html table for the game
*/
function createTable(rows, cols){
    var row = '';
    //Starting the rows
	for (var i = 1; i <= rows; i++) {
		row += '<tr id="'+i+'">';

		//Starting the columns
		for (var j = 0; j < cols; j++) {
		    if(j == 0){
               row += '<td>'+i+'</td>';
		    }else{
		       row += '<td>&nbsp;</td>';
		    }
		}

        row += '</tr>'
      }

      $('#gameTbl > tbody').append(row)
}

/*
*@author: Ashish Sharma
*@description: This function is used to feed the persons/animal
*/
function Feed(){
    var allList = [1, 2, 3, 4, 5, 6, 7]; //Define the each person/animal in list

    //Remove the died elements from list
    allList = removeDied(allList);

    if (allList.length == 0) {
        $('#lblWon').show();
        return ''
    }

    if (!allList.includes(1)) {
        $('#lblLost').show();
        return ''
    }

    var animal_no = allList[Math.floor(Math.random()*allList.length)]; //Pick the random animal from list to feed
    var column_no = animal_no + 1;
    var round = $('#txtRound').val() //Get the current round


    //Step1 - Update the feeded element
    $('#gameTbl tbody tr:nth-child('+round+') td:nth-child('+column_no+')').html('Fed').css('background-color','green')

    //Step2 - Update the current round
    round++;
    $('#txtRound').val(round);

    //Update the number of times animal is fed
    var fedCount = parseInt($('#gameTbl thead tr th:nth-child('+column_no+')').attr('FedCount'))
    $('#gameTbl thead tr th:nth-child('+column_no+')').attr('FedCount',fedCount+1)

    //Set the animal as died
    var element = $('#gameTbl thead tr th:nth-child('+column_no+')');
    setDied(element, animal_no, column_no);
}

function setDied(element, animal_no, column_no){
    var fedCount = parseInt($(element).attr('FedCount'))

    if(fedCount >= 7){
        $('#gameTbl tbody tr td:nth-child('+column_no+')').css('background-color','red');

        $("#txtDied").val(function() {
            return this.value +','+ animal_no;
        });
    }
}

function removeDied(allList){
    diedList = $("#txtDied").val();

    if(diedList != ''){
        diedList = '[' + diedList.substr(1) + ']';
        allList = allList.filter( function( el ) {
          return diedList.indexOf(el) < 0;
        });
    }

    return allList;
}
