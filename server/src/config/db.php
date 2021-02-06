<?php

    $jwtarray = array("jwt" => [
        'secret' => 'supersecretkeyyoushouldnotcommittogithub'
    ]);


    class db{

        public function connect_db(){
            $conn = new mysqli( "localhost","root","", "codechef_hackathon");
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error());
            }

            return $conn;

        }
        
    }


?>