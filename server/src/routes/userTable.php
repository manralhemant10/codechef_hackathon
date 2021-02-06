<?php

    use Slim\Http\Request;
    use Slim\Http\Response;
    use \Firebase\JWT\JWT;

    $app->get('/users/mytags', function (Request $request, Response $response, array $args) {
        $db = new db();
        $db = $db->connect_db();

        $token = substr($request->getHeader("Authorization")[0],7);
        $decoded = JWT::decode($token,"codechef_hackathon_secret", array('HS256'));
        $decoded =(array)$decoded;

        if ($stmt = $db->prepare('select p.problem_code, p.problem_name, p.problem_solved, p.problem_attempted, ut.user_tagname from problems as p,user_tags as ut where p.problem_code=ut.problem_code and p.problem_code in (select problem_code FROM user_tags WHERE user_id = ?)'))
         {
            $stmt->bind_param('i', $decoded['id']);
            $stmt->execute();
            $result = $stmt->get_result();
            $userques = array();
            while($row = $result->fetch_assoc()) {
                $probdata = array("name"=>$row['problem_name'], "solved"=>$row['problem_solved'],
                "attempted"=>$row['problem_attempted']);
                $quesobj = array("prob"=>$probdata, "code"=>$row['problem_code'],"tagname"=>$row['user_tagname']);
                array_push($userques,$quesobj);
        }
            
        }
        $db->close();
        return $response->withJson($userques);
    
    });

?>