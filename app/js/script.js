//@file for click-events

//When a radio-button for chosing gender is clicked
//Removes intro and shows the radio-buttons for age-groups
$("input[name='gender']").change(function(){
	
	getAgeGroups();
	
	$(".age-form").fadeIn(1000);
});

//When a radio-button for choosing an age is clicked
$(document).on('change', "input[name='age']", function(){
	getPartyList();
    $(".party-form").fadeIn(1000);
});

//When a radio-button for choosing a political party is clicked
$(document).on('change', "input[name='party']", function(){
	getCountyList();
    $("#valgomat_intro").fadeOut(1000);
	$(".gender-form").fadeOut(1000);
	$(".age-form").fadeOut(1000);
	$(".party-form").fadeOut(1000, function(){
		$(".county-form").fadeIn(1000);
	});
});

//When a radio-button for choosing a county is clicked
$(document).on('change', "input[name='county']", function(){
	$county = $("input[name='county']:checked").val();
	$countyId = parseInt($county);
	
	getDistrictList($countyId);
    $(".district-form").fadeIn(1000);
});

//When a radio-button for choosing a district is clicked
$(document).on('change', "input[name='district']", function(){
	$(".county-form").fadeOut(1000);
	$(".district-form").fadeOut(1000, function(){
		$("#valgomat_content").addClass("questions-size");
		
		getNumberOfQuestions();
		getQuestion(0);
		$(".questionNum").find("p").html("1");
		$(".question-count").show();
		$(".questions-content").fadeIn(1000);
	});
});

//When an answer is clicked underneath the question
$(".answers").find(".ans").click(function(){
	var ansClass = this.className.split(' ')[0];
	$ans = ansClass.split("_").pop();
	$questionNumber = $(".questions").find("p").attr('id');
	
	if(this.className.indexOf('ans_3') != 0){
		//if answer is not neutral
		$(".weights").fadeIn(1000);
	}
	else {
		//if answer is neutral
		$nextQuestion = parseInt($questionNumber) + 1;
		$numOfQuestions = $(".numOfQuestions").find("p").html().split(' ')[2];
		$numOfQuestions = parseInt($numOfQuestions);
		
		//save answers to a form
		$ansForm = $(".saveAnswers-form");
		$ansForm.append("<input type='hidden' name='answer_"+$questionNumber+"' value='"+$ans+"' />");
		$ansForm.append("<input type='hidden' name='weight_"+$questionNumber+"' value='0' />");
		
		if($nextQuestion <= $numOfQuestions){ // if this was not the last question
			//count up the counter for questions
			$nextQuestion.toString();
			$(".questionNum").find("p").html($nextQuestion);
			getQuestion($questionNumber);
			$(".weights").hide();
		}
		else { //if this was last question
			submitValgomat();
		}
	}
});

//When weight-answer is clicked underneath the main answers and question
$(".weights").find(".weight").click(function(){
	var weigthClass = this.className.split(' ')[3];
	var weight = weigthClass.split("_").pop();
	$questionNumber = $(".questions").find("p").attr('id');
	
	//save answers to a form
	$ansForm = $(".saveAnswers-form");
	$ansForm.append("<input type='hidden' name='answer_"+$questionNumber+"' value='"+$ans+"' />");
	$ansForm.append("<input type='hidden' name='weight_"+$questionNumber+"' value='"+weight+"' />");
	
	$nextQuestion = parseInt($questionNumber) + 1;
	
	$numOfQuestions = $(".numOfQuestions").find("p").html().split(' ')[2];
	$numOfQuestions = parseInt($numOfQuestions);
	
	if($nextQuestion <= $numOfQuestions){ //if this was not the last question
		$nextQuestion.toString();
		$(".questionNum").find("p").html($nextQuestion);
		getQuestion($questionNumber);
		$(".weights").hide();
	}
	else { //if this was last question
		submitValgomat();
	}
});