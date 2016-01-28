<?php
/**
* @file
* Route function for get/set/post
*/
include 'functions.php';
// Routes

function json_response($response, $result){
	$response->getBody()->write(json_encode($result));
	$newResponse = $response->withHeader(
	     'Content-type',
	     'application/json; charset=utf-8'
	);
	return $newResponse;
}

/**
 * A function for getting the age-groups from the DB
 * @return JSON containing objects with id and max-age in group
 */
$app->get('/getAgeGroups', function ($request, $response, $args)
{
	$result = GetIntroData::getAgeGroups();
	return json_response($response, $result);
});

/**
 * A function for getting the list of political parties from the DB
 * @return JSON containing the list of ids and political parties
 */
$app->get('/getParties', function ($request, $response, $args)
{
	$result = GetIntroData::getParties();
	return json_response($response, $result);
});
	
/**
 * A function for getting the counties from the DB
 * @return JSON containing objects with id and county
 */
$app->get('/getCounties', function ($request, $response, $args)
{
	$result = GetIntroData::getCounties();
	return json_response($response, $result);
});

/**
* A function for getting the dirstricts from the DB for the selected county
* @param cid The county id selected by the user
* @return JSON containing objects with id and district
*/
$app->get('/getDistricts/{cid}', function ($request, $response, $args)
{
	$cid = $args['cid'];
	$result = GetIntroData::getDistricts($cid);
	return json_response($response, $result);
});

/**
* A function for getting the number of questions from the DB table
* @return JSON containing the number of questions
*/
$app->get('/getQuestionsCount', function ($request, $response, $args)
{
	$result = GetQuestionsData::getQuestionsCount();
	return $response->getBody()->write(json_encode($result));
});

/**
* A function for getting the next question in the DB table
* @param The id for the current question
* @return JSON containing the id and question text
*/
$app->get('/getQuestion/{qnr}', function ($request, $response, $args)
{
	$qnr = $args['qnr'];
	$result = GetQuestionsData::getNextQuestion($qnr);
	return json_response($response, $result);
});

/**
* A function for posting the results from the Valgomat and calculating the answer
* @return JSON containg the right political party for the user
*/
$app->post('/postForm', function ($request, $response, $args)
{
	$parsedBody = $request->getParsedBody();
	//$gender = $parsedBody['gender'];
	//osv
	$result = SetValgomatData::partyAlgorithm($parsedBody);
	return json_response($response, $result);
});
