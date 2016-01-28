<?
/**
* @file
* Different get-functions for valgomat
*/
header('Access-Control-Allow-Origin: http://127.0.0.1:9000');
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
include 'db_connect.php';

/**
 * A class for getting the introductionary data from the database
 * Using PDO to fetch the data
 */
class GetIntroData
{
	/**
	 * A function for getting the age-groups from the DB
	 * @return An associative array of key-value pairs containg id and max-age in group
	 */
	static function getAgeGroups(){
		$pdo = PDO_CONNECT::get()->prepare("SELECT * FROM agescope");
		$pdo->execute(); 
        $result = $pdo->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}
	
	/**
	 * A function for getting the political parties from the DB
	 * @return The result from the DB with all parties
	 */
	static function getParties(){
		$pdo = PDO_CONNECT::get()->prepare("SELECT * FROM political_parties");
		$pdo->execute(); 
        $result = $pdo->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}
	
	/**
	 * A function for getting the list of counties from the DB
	 * @return An associative array of key-value pairs containg id and county
	 */
	static function getCounties(){
		$pdo = PDO_CONNECT::get()->prepare("SELECT * FROM county");
		$pdo->execute(); 
        $result = $pdo->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}
	
	/**
	* A function for getting the list of districts from the selected county
	* @param $countyId The ID for the selected county
	* @return An associative array of key-value pairs containg id and district
	*/
	static function getDistricts($countyId){
		$pdo = PDO_CONNECT::get()->prepare("SELECT * FROM district WHERE county_id = :countyId");
		$pdo->bindParam(':countyId', $countyId);
		$pdo->execute(); 
        $result = $pdo->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}
}

/**
* A class for getting the data for the questions
*/
class GetQuestionsData
{
	/**
	* A function for getting the number of questions in the DB table
	* @return the number of questions
	*/
	static function getQuestionsCount(){
		$pdo = PDO_CONNECT::get()->prepare("SELECT * FROM questions");
		$pdo->execute(); 
        $result = $pdo->rowCount();
		return $result;
	}
	
	/**
	* A function for getting the next questions in the DB table
	* @param $qId The id of the current question
	* @return The next question in the DB table
	*/
	static function getNextQuestion($qId){
		if($qId == 0){
			//first questions
			$pdo = PDO_CONNECT::get()->prepare("SELECT * FROM questions ORDER BY id ASC limit 1");
		}
		else {
			$pdo = PDO_CONNECT::get()->prepare("SELECT * FROM questions WHERE id = (SELECT min(id) FROM questions where id > :qId)");
			$pdo->bindParam(':qId', $qId);
		}
		$pdo->execute(); 
        $result = $pdo->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}
}

/**
* A class for setting the valgomat data and running the algorithms for selecting the right political party
*/
class SetValgomatData
{
	/**
	* A function for finding the right political party for the user
	* @param $post The post-data from the Client
	* @return The name of the chosen political party
	*/
	static function partyAlgorithm($post){
		//Do some calculations to find the right party
		$party = $post['party'];
		return $party;
	}
}

?>