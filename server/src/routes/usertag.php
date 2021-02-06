<?php

    use Slim\Http\Request;
    use Slim\Http\Response;
    use \Firebase\JWT\JWT;

    $app->get('/users/usertag', function (Request $request, Response $response, array $args) {
        $db = new db();
        $db = $db->connect_db();
        $token = substr($request->getHeader("Authorization")[0],7);
        $decoded = JWT::decode($token,"codechef_hackathon_secret", array('HS256'));
        $decoded =(array)$decoded;

        //add checks for valid id and qcode for security
        if ($stmt = $db->prepare('select * FROM user_tags WHERE user_id = ?')) {
            $stmt->bind_param('i', $decoded['id']);
            $stmt->execute();
            $result = $stmt->get_result();
            $usertagsdata = array();
            while($row = $result->fetch_assoc()) {
                $rowdata = array("tagname"=>$row['user_tagname'], "tagcount"=>$row['user_tagcount'],
                "type"=>$row['user_tagtype']);
                array_push($usertagsdata,$rowdata);
           }
            
        }
        $db->close();
        return $response->withJson($usertagsdata);
    
    });

?>