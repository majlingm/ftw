<?php
// Protect from direct access.
defined('API_GUARD') or die('Access denied');


/**
 * Class with static methods, ensuring one single connection to the database.
 * 
 * The values <code>host</code>, <code>user</code>, <code>password</code>
 * and <code>password</code> are parsed from <code>db.ini</code>.
 *
 * @author Anders O Johansson
 */
class Database {
	
	// Singleton connection resource
	private static $connection;
	
	// Latest error
	private static $error;
    	
    /**
     * Execute an SQL query.
     *
     * @param string $sql	the SQL query to execute
     * @return	A <code>DbResult</code> on success.
     * 			FALSE on failure. Latest error can be retrieved through getError().
     * @access public
     * @static
     */
    public static function query(&$sql) {
        $connection = Database::_getConnection();
        $result = mysql_query($sql, $connection);
        if (!$result) {
            Database::$error = new DBError(mysql_errno($connection), mysql_error($connection), $sql);
            return FALSE;
        }
        
        return new DbResult($result);
    }
    
    /**
     * Escapes a string properly before sending it to queries.
     *
     * @param $string the string to escape.
     * @return the escaped string.
     */
    public static function escape(&$string) {
        if (is_numeric($string)) {
            return $string;
        }
        return mysql_real_escape_string($string, Database::_getConnection());
    }
    
    /**
     * Get the last inserted ID.
     *
     * @return the last inserted ID.
     * @static
     */
    public static function getLatestInsertId() {
        return mysql_insert_id(Database::_getConnection());
    }
    
    /**
     * Get the latest error.
     *
     * @return	DbError - the latest error, if any. FALSE otherwise.
     * @static
     */
    public static function getError() {
        return Database::$error === null ? FALSE : Database::$error;
    }
    
    /**
     * Close the database connection.
     */
    public static function close() {
        @mysql_close(Database::_getConnection());
    }
    
	/**
     * Connect to the database. Should only be invoked once every page load.
     *
     * @return the connection resource
     * @access private
     * @static
     */
    private static function _connect() {
    	$dbConfig = parse_ini_file(APP."db.ini", true);
    	Database::$connection = mysql_connect($dbConfig['MySQL']['host'], $dbConfig['MySQL']['user'], $dbConfig['MySQL']['password']);
        if (!Database::$connection) {          
        	Database::$result = new DbError(0, "Kunde inte ansluta databas-servern '{$dbConfig['MySQL']['host']}'.", "");
        }
        if (!@mysql_set_charset("utf8")) {
            Database::$result = new DbError(0, "Kunde inte ange teckenkodning 'utf8'.", "");
        }
        if (!@mysql_select_db($dbConfig['MySQL']['database'])) {
            Database::$result = new DbError(0, "Kunde inte välja databas '{$dbConfig['MySQL']['database']}'.", "");
        }
        return Database::$connection;
    }
    
    /**
     * Get a database connection. If none exists, create a new one.
     * 
     * @return the connection resource
     * @access private
     * @static
     */
    private static function _getConnection() {
        if (Database::$connection === null) {
            Database::$connection = Database::_connect();
        }
//        if (!Database::$connection) {
//    	echo json_encode(array("game" => "1"));
//    	exit;
//        }
        return Database::$connection;
    }
    
}

/**
 * A successful database result.
 */
class DbResult {
    
    /**
     * The result set.
     * @access private
     */
    private $result;
    
    /**
     * Array representation of the result set. Used as cache.
     * @access private
     */
    private $rows;
    
    /**
     * The insert id, 0 if not an insert.
     * @var int
     * @access private
     */
    private $insertId;
    
    /**
     * Create a new result.
     *
     * @param $result	DbResult - the mysql result set
     */
    public function __construct(&$result) {
        $this->result	= $result;
//        echo "insertId 0:" . $this->insertId;
        $this->insertId	= Database::getLatestInsertId();
//        echo "insertId 1:" . $this->insertId;
    }
    
    /**
     * Get the insert id.
     * @return	int - the insert id, or 0 if not an insert result.
     */
    public function getInsertId() {
    	return $this->insertId;
    }
    
    /**
     * Get the next row in the result set as an associative array.
     *
     * @return Next row in the result set as an associative array.
     */
    public function next() {
        return mysql_fetch_assoc($this->result);
    }
    
    /**
     * Get the number of rows in the result set.
     *
     * @return Number of rows in the result set.
     */
    public function size() {
        return mysql_num_rows($this->result);
    }
    
    /**
     * Return the full result set in an array.
     *
     * @return All rows are returned as an array.
     */
    public function toArray() {
        if (is_null($this->rows)) { 
            $this->rows = array();
            while ($row = $this->next()) {
                $this->rows[] = $row;
            }
        }
        return $this->rows;
    }
}

/**
 * A database error.
 */
class DbError {
    
    /**
     * The error number.
     * @access private
     */
    private $errno;
    
    /**
     * The error message.
     * @access private
     */
    private $message;
    
    /**
     * The SQL query that caused the error.
     * @access private
     */
    private $query;
    
    /**
     * Create a new DB error.
     *
     * @param $errno the error number
     * @param $message error message
     * @param $query the SQL query that caused the error
     */
    public function __construct($errno, $message, $query) {
        $this->errno = $errno;
        $this->message = $message;
        $this->query = $query;
    }
    
    /**
     * Get the error message.
     *
     * @return the error message
     */
    public function getMessage() {
        return $this->message;
    }
    
    /**
     * Get the error number.
     *
     * @return the error number
     */
    public function getErrno() {
        return $this->errno;
    }
    
    /**
     * Get the SQL query.
     *
     * @return the SQL query
     */
    public function getQuery() {
        return $this->query;
    }
}