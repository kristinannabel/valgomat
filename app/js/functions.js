//@file for javascript-functions


//Ajax call for getting age-groups from the DB usin PDO
//Putting the data in the HTML with jQuery
function getAgeGroups(){
	$.ajax({
	    type: "GET",
	    url: "http://127.0.0.1:8888/public/getAgeGroups",
		datatype: 'jsonp',
	    success: function(response){
			$prevAge = 0;
			for($i = 0; $i < response.length; $i++){
				$age = response[$i].maxage_ingroup;
				$(".age-form").find(".row").append("<div class='large-12 columns'><div class='radio'><input id='age_" + $age + "' type='radio' name='age' value='"+$age+"'><label for='age_" + $age + "'>" + $prevAge + " - "  + $age + "</label></div></div>")
				$prevAge = parseInt($age) + 1;
			}
			$age = parseInt($prevAge);
				
			//The last group for "AGE+"-group not located in the DB age-table
			$(".age-form").find(".row").append("<div class='large-12 columns'><div class='radio'><input id='age_" + $age + "' type='radio' name='age' value='"+$age+"'><label for='age_" + $age + "'>" + $age + "+ </label></div></div>")	
		}
	});
}

//Ajax call for getting the list of political parties from the DB
function getPartyList(){
	$.ajax({
		type: "GET",
		url: "http://127.0.0.1:8888/public/getParties",
		datatype: 'jsonp',
		success: function(response){
			for($i = 0; $i < response.length; $i++){
				$party = response[$i].name;
				$(".party-form").find(".row").append("<div class='large-12 columns'><div class='radio'><input id='party_" + $party + "' type='radio' name='party' value='"+$party+"'><label for='party_" + $party + "'>" + $party + "</label></div></div>");
			}
		}
	});
}

//Ajax call for getting the list of counties from the DB
function getCountyList(){
	$.ajax({
		type: "GET",
		url: "http://127.0.0.1:8888/public/getCounties",
		datatype: 'jsonp',
		success: function(response){
			for($i = 0; $i < response.length; $i++){
				$countyId = response[$i].id;
				$county = response[$i].name;
				$(".county-form").find(".row").append("<div class='large-12 columns'><div class='radio'><input id='county_" + $county + "'value='" + $countyId + "' type='radio' name='county' value='"+$countyId+"'><label for='county_" + $county + "'>" + $county + "</label></div></div>");
			}
		}
	});
}

//Ajax call for getting the list of districts for the selected county from the DB
function getDistrictList($countyId){
	$.ajax({
		type: "GET",
		url: "http://127.0.0.1:8888/public/getDistricts/" + $countyId + "",
		datatype: 'jsonp',
		success: function(response){
			for($i = 0; $i < response.length; $i++){
				$district = response[$i].name;
				$(".district-form").find(".row").append("<div class='large-12 columns'><div class='radio'><input id='district_" + $district + "' type='radio' name='district' value='"+$district+"'><label for='district_" + $district + "'>" + $district + "</label></div></div>");
			}
		}
	});
}

//Ajax call for getting the count of rows in the questions-table in the DB
function getNumberOfQuestions(){
	$.ajax({
		type: "GET",
		url: "http://127.0.0.1:8888/public/getQuestionsCount",
		datatype: 'jsonp',
		success: function(response){
			var questionCount = parseInt(response);
			$(".numOfQuestions").find("p").html(" av " + questionCount);
		}
	});
}

//Ajax call for getting the next question in the DB table
function getQuestion($qnr){
	$.ajax({
		type: "GET",
		url: "http://127.0.0.1:8888/public/getQuestion/" + $qnr + "",
		datatype: 'jsonp',
		success: function(response){
			$(".questions").find("p").attr('id', response[0].id);
			$(".questions").find("p").html(response[0].question);
		}
	});
}

//A function for merging all the forms into one final form that is submitted to the server
function mergeForms(){
	$result = $(".final-form");
	$(".gender-form input:checked, .age-form input:checked, .party-form input:checked, .county-form input:checked, .district-form input:checked, .saveAnswers-form input").each(function() {
		$result.append("<input type='hidden' name='"+$(this).attr('name')+"' value='"+$(this).val()+"' />");
	});
}

//Ajax call for submitting the final form with all selected data from the user to the server for calculations
//Should get a poltical party returned or a weighted list of parties
function submitValgomat(){
	mergeForms();
	$.ajax({
		type: "POST",
		url: "http://127.0.0.1:8888/public/postForm",
		data: $(".final-form").serializeArray(), // serializes the form's elements.
		success: function(response){
			//DO SOMETHING
			alert(response);
		}
	});
}