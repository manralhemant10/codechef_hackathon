<?php

    use Slim\Http\Request;
    use Slim\Http\Response;
    use \Firebase\JWT\JWT;

    $app->post('/users/addtag', function (Request $request, Response $response, array $args) {
        $db = new db();
        $db = $db->connect_db();

        $input = $request->getParsedBody();       
        $token = substr($request->getHeader("Authorization")[0],7);
        $usertag = $input['usertag'];
        $problemcode = $input['problemcode'];
        $decoded = JWT::decode($token,"codechef_hackathon_secret", array('HS256'));
        $decoded =(array)$decoded;

        //add checks for valid id and qcode for security
        
        $stmt = $db->prepare('insert into user_tags (user_id,user_tagname,problem_code,user_tagtype) values (?,?,?,"user")');
        $stmt->bind_param('sss',$decoded['id'],$usertag,$problemcode);
        $stmt->execute();
        $stmt->close();

        
        $db->close();



        return $response->withJson(['status' => "Tag added"]);
    });

?>