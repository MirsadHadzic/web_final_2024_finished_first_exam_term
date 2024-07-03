<?php

Flight::route('GET /connection-check', function(){
    Flight::examService();
    /** TODO
    * This endpoint prints the message from constructor within ExamDao class
    * Goal is to check whether connection is successfully established or not
    * This endpoint does not have to return output in JSON format
    * 5 points
    */
});

Flight::route('GET /customers', function(){
    /** TODO
    * This endpoint returns list of all customers that will be used
    * to populate the <select> list
    * This endpoint should return output in JSON format
    * 10 points
    */
    Flight::json(Flight::examService()->get_customers());
});

Flight::route('GET /customer/meals/@customer_id', function($customer_id){
    $meals = Flight::examService()->get_customer_meals($customer_id);

    // Ensure the response is always an array
    if (!is_array($meals)) {
        $meals = [$meals];
    }

    Flight::json($meals);
    /** TODO
    * This endpoint returns array of all meals for a specific customer
    * Every item in the array should have following properties
    *   `food_name` -> name of the food that customer eat for the meal
    *   `food_brand` -> brand of the food that customer eat for the meal
    *   `meal_date` -> date when the customer eat the meal
    * This endpoint should return output in JSON format
    * 10 points
    */

    // if ($meals === false) {
    //     Flight::json(["error" => "Failed to fetch meals"], 500);
    // } else {
    //     Flight::json($meals);
    // }
});

Flight::route('POST /customers/add', function() {
    // $first_name = Flight::request()->data['first_name'];
    // $last_name = Flight::request()->data['last_name'];
    // $birth_date = Flight::request()->data['birth_date'];
    // // $id = Flight::request()->data['id'];
    // $result = Flight::examService()->add_customer($first_name, $last_name, $birth_date);
    // Flight::json($result);
    $data = Flight::request()->data->getData();
    //$payload = Flight::request()->data->getData();
    $service = new ExamService();
    $id = $service->add_customer($data['first_name'], $data['last_name'], $data['birth_date']);
    $data['id'] = $id;
    Flight::json($data);
    /** TODO
    * This endpoint should add the customer to the database
    * The data that will come from the form (if you don't change
    * the template form) has following properties
    *   `first_name` -> first name of the customer
    *   `last_name` -> last name of the customer
    *   `birth_date` -> date when the customer has been born
    * This endpoint should return the added customer in JSON format
    * 10 points
    */
});

Flight::route('GET /foods/report', function(){
    Flight::json(Flight::examService()->foods_report());
    /** TODO
    * This endpoint should return the array of all foods from the database
    * together with the image of the foods. This endpoint should be fully
    * paginated. Every food returned should have following properties:
    *   `name` -> name of the food
    *   `brand` -> brand of the food
    *   `image` -> <img> of the food
    *   `energy` -> total amount of calories (energy) of the food
    *   `protein` -> total amount of proteins of the food
    *   `fat` -> total amount of fat of the food
    *   `fiber` -> total amount of fiber of the food
    *   `carbs` -> total amount of carbs of the food
    * This endpoint should return output in JSON format
    * 15 points
    */
});

?>
