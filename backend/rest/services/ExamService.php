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
}
?>
