<?php
  include('common.php');
  include('db.php');
  include('emails.php');

  class WFTrip{
    protected $db;
    
    function __construct($db){ $this->db = $db; }

    public function addTrip($data){

      $trip_id = 'T'.Common::generateRand(5);
      $err = false;

      $data['trip_id'] = $trip_id;
      // Add to DB
      try {
        $trip_type = "Care about location: ";
        if($data["isCare"] === "true") $trip_type.= "Yes";
        else $trip_type.= "No";
        $trip_type.=", Budget: ". $data["selOpts"];

        $this->db->save("x_wf_trip51887", array(
          "id"                => $trip_id,
          "x_from"            => $data["vonStadt"],
          "x_to"              => $data["nachStadt"],
          "x_gift"            => $data["isGift"] === "true" ? "Yes" : "No",
          "x_fname"           => $data["fname"],
          "x_lname"           => $data["lname"],
          "x_email"           => $data["email"],
          "x_phone"           => $data["phone"],
          "x_travel_type"     => $trip_type,
          "x_travel_opts"     => $data["selTravelOpts"],
          "x_start_date"      => $data["startDate"],
          "x_start_flexible"  => $data["isStartFlexible"] === "true" ? "Yes" : "No", 
          "x_return_date"     => $data["returnDate"],
          "x_return_flexible" => $data["isReturnFlexible"] === "true" ? "Yes" : "No", 
          "x_pass"            => $data["passengers"],
          "x_created"         => date('Y-m-d H:i:s')
        ));
      } catch (Exception $e) {
        $err = true;
        Common::respond($e, "There was an error inserting in DB, please try again.", false);
      }

      !$err && Common::respond(Common::sendEmail($data, "company"), "Trip details added successfully.", true);
    }

  }

  $e = new WFTrip($db);
  switch($_REQUEST["type"]){
    case 'addTrip': $e->addTrip($data); break;
    default: Common::respond("", "Attempted to send email to user.", Common::sendEmail($data, "user"));
  }
?>