<?php

require_once __DIR__ . "/../config.php";

class ExamDao {
    protected $conn;
    private $table;

    public function __construct($table) {
        $this->table = $table;
        try {
            $this->conn = new PDO("mysql:host=" . Config::DB_HOST() . ";dbname=" . Config::DB_NAME() . ";charset=utf8;", Config::DB_USER(), Config::DB_PASSWORD(), [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        } catch (PDOException $e) {
            throw $e;
        }
    }  

    public function get_customers() {
        $query = "SELECT * FROM customers";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    protected function query($query, $params) {
        $statement = $this->conn->prepare($query);
        $statement->execute($params);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    protected function query_unique($query, $params) {
        $results = $this->query($query, $params);
        return reset($results);
    }

    public function get_customer_meals($customer_id) {
        return $this->query_unique(
            "SELECT m.created_at, f.name, f.brand
             FROM customers c
             JOIN meals m ON c.id = m.customer_id
             JOIN foods f ON f.id = m.food_id
             WHERE c.id = :id", 
            [
                'id' => $customer_id
            ]
        );
    }

    public function add_customer($first_name, $last_name, $birth_date) {
        $query = "INSERT INTO customers (first_name, last_name, birth_date)
                  VALUES (:first_name, :last_name, :birth_date)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':last_name', $last_name);
        $stmt->bindParam(':birth_date', $birth_date);
        $stmt->execute();
        return $this->conn->lastInsertId();
    }

    public function get_foods_report() {
        $query = "SELECT f.name, f.brand, f.image_url AS image, 
                  SUM(CASE WHEN n.name = 'Energy' THEN fn.quantity ELSE 0 END) AS energy,
                  SUM(CASE WHEN n.name = 'Protein' THEN fn.quantity ELSE 0 END) AS protein,
                  SUM(CASE WHEN n.name = 'Fat' THEN fn.quantity ELSE 0 END) AS fat,
                  SUM(CASE WHEN n.name = 'Carb' THEN fn.quantity ELSE 0 END) AS carbs,
                  SUM(CASE WHEN n.name = 'Fiber' THEN fn.quantity ELSE 0 END) AS fiber
                  FROM 
                      foods f
                  JOIN 
                      food_nutrients fn ON f.id = fn.food_id
                  JOIN 
                      nutrients n ON fn.nutrient_id = n.id
                  GROUP BY 
                      f.id, f.name, f.brand, f.image_url";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function get_user_by_name($first_name, $last_name) {
        return $this->query_unique(
            "SELECT * FROM customers WHERE first_name = :first_name AND last_name = :last_name",
            ['first_name' => $first_name, 'last_name' => $last_name]
        );
    }
}
    // private $conn;

    // /**
    //  * constructor of dao class
    //  */
    // public function __construct(){
    //     try {

    //       $host = "localhost"; // Replace with your host
    //       $dbname = "webfinal"; // Replace with your database name
    //       $username = "root"; // Replace with your username
    //       $password = "root"; // Replace with your password
    //       /** TODO
    //        * List parameters such as servername, username, password, schema. Make sure to use appropriate port
    //        */

    //       /** TODO
    //        * Create new connection
    //        */
    //       $this->conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    //       $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //       echo "Connected successfully";
    //     } catch(PDOException $e) {
    //       echo "Connection failed: " . $e->getMessage();
    //     }
    // }

?>
