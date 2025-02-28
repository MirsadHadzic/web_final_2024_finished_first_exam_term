<?php
require_once __DIR__."/../dao/ExamDao.php";

class ExamService {
    protected $dao;

    public function __construct(){
        // Pass the table name to the ExamDao constructor
        $this->dao = new ExamDao('customers'); // Replace 'your_table_name_here' with the actual table name
        // dodan samo customers
    }

    /** TODO
    * Implement service method to get all customers
    */
    public function get_customers(){
        return $this->dao->get_customers();
    }

    /** TODO
    * Implement service method to get all customer meals
    */
    public function get_customer_meals($customer_id){
        return $this->dao->get_customer_meals($customer_id);
    }

    /** TODO
    * Implement service method to add customer to the database
    */
    public function add_customer($first_name, $last_name, $birth_date){
        return $this->dao->add_customer($first_name, $last_name, $birth_date);
    }

    /** TODO
    * Implement service method to return detailed list of foods
    * and total of nutrients for each food
    */
    public function foods_report(){
        return $this->dao->get_foods_report();
    }

    public function get_user_by_name($first_name, $last_name) {
        return $this->dao->get_user_by_name($first_name, $last_name);
    }

        public function get_nutrients()
        {
            return $this->dao->get_nutrients();
        }
    public function get_nutrients_by_id($id)
    {
        return $this->dao->get_nutrients_by_id($id);
    }
    public function delete_meho_by_id($id)
    {
        return $this->dao->delete_meho_by_id($id);
    }
    public function get_meho_by_id($id)
    {
        return $this->dao->get_meho_by_id($id);
    }
    public function get_meho()
    {
        return $this->dao->get_meho();
    }

    public function updateProductRandomNumber($id) {
        if (!$this->dao->get_meho_by_id($id)) {
            throw new Exception("Product with ID $id not found", 404);
        }

        $updatedRows = $this->dao->updateRandomNumber($id);

        if ($updatedRows > 0) {
            return ["message" => "Random brojevi_naki for this ID updated successfully!"];
        } else {
            throw new Exception("No rows were updated", 500);
        }
    }

    public function updateMeho($id, $imena_naka, $prezimena_naka, $brojevi_naki)
    {
        return $this->dao->updateMeho($id, $imena_naka, $prezimena_naka, $brojevi_naki);
    }
    
    public function addMeho($imena_naka, $prezimena_naka, $brojevi_naki) {
        return $this->dao->addMeho($imena_naka, $prezimena_naka, $brojevi_naki);
    }

    public function updateMeho2($id, $imena_naka, $prezimena_naka, $brojevi_naki)
    {
        return $this->dao->updateMeho($id, $imena_naka, $prezimena_naka, $brojevi_naki);
    }
}
?>
