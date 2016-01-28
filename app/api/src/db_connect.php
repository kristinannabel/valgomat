<?php
	/**
	 * A class for connecting to the database through PDO
	 */
	class PDO_Connect
	{
		private static $instance = null;
     	
		/**
		 * A function for connecting to the database
		 * @return the instance of the connection
		 */
		public static function get() {
			if(self::$instance == null) {
				require_once __DIR__ . '/db_config.php';
		    	$instance_name="mysql:host=localhost;dbname=".DB_DATABASE."; charset=utf8";
 
		    	try {
		    		self::$instance = new PDO($instance_name, DB_USER, DB_PASSWORD);
		    	} catch(PDOException $e) {
		    		// Handle this properly
		            throw $e;
		    	}
			}
			
			return self::$instance;
		}
	}