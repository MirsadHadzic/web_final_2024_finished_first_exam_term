<?php

class ExamDao {

    private $conn;

    /**
     * constructor of dao class
     */
    public function __construct(){
        try {

          $host = "db1.ibu.edu.ba"; // Replace with your host
          $dbname = "webfinal"; // Replace with your database name
          $username = "webfinal_24"; // Replace with your username
          $password = "web24finPWD"; // Replace with your password
          /** TODO
           * List parameters such as servername, username, password, schema. Make sure to use appropriate port
           */

          /** TODO
           * Create new connection
           */
          $this->conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
          $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          echo "Connected successfully";
        } catch(PDOException $e) {
          echo "Connection failed: " . $e->getMessage();
        }
    }

    /** TODO
     * Implement DAO method used to get customer information
     */
    public function get_customers(){
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

    /** TODO
     * Implement DAO method used to get customer meals
     */
    public function get_customer_meals($customer_id) {
      // $stmt = $this->conn->prepare("SELECT * FROM customers WHERE id = :id");
      // $stmt = $this->conn->prepare($query);
      // $stmt->bindParam(':id', $customer_id); #prevent SQL injection
      // $stmt->execute();
      // return $result;
      // c.first_name, c.last_name, 
      return $this->query_unique(
        "SELECT m.created_at, f.name, f.brand
        FROM customers c
        JOIN meals m ON c.id = m.customer_id
        JOIN foods f ON f.id = m.food_id
        where c.id = :id", 
        [
            'id' => $customer_id
        ]
        );
  }

    /** TODO
     * Implement DAO method used to save customer data
     */
    public function add_customer($first_name, $last_name, $birth_date){
        $query = "INSERT INTO customers (first_name, last_name, birth_date)
                  VALUES (:first_name, :last_name, :birth_date)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':last_name', $last_name);
        $stmt->bindParam(':birth_date', $birth_date);
        //$stmt->bindParam(':id', $id);
        $stmt->execute();
        return $this->conn->lastInsertId();
        // Fetch the inserted row
        // $query = "SELECT * FROM customers WHERE id = :id";
        // $stmt = $this->conn->prepare($query);
        // $stmt->bindParam(':id', $id);
        // $stmt->execute();

        // $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // return $result;
    }

    /** TODO
     * Implement DAO method used to get foods report
     */
    public function get_foods_report(){
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
}
?>
