<?php
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Http\Message\ResponseInterface as Response;

    $app->get('/problems[/{params:.*}]', function ($request, $response, $args) {
        $db = new db();
        $db = $db->connect_db();
      
        $allquestions =array();
            if(count($args)>0){
                $len = count(explode('/', $args['params']));
                $params = explode('/', $args['params']);
                $names = implode('\', \'', $params); 
                $fin = "'" . $names . "'"; 
                //problem_Tag table get common ones
               // $sql = $db->prepare('select problem_code, problem_name, problem_solved, problem_attempted from problems where problem_id in (select problem_id from problem_tag where tag_id in (select tag_id from tags where tag_name in ('.$fin.')) group by problem_id having count(problem_id)>=?)');

                if ($stmt = $db->prepare('select problem_code, problem_name, problem_solved, problem_attempted from problems where problem_id in (select problem_id from problem_tag where tag_id in (select tag_id from tags where tag_name in ('.$fin.')) group by problem_id having count(problem_id)>=?)')) {
                    $stmt->bind_param('i', $len);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    $usertagsdata = array();
                    while($row = $result->fetch_assoc()) {
                        $quesobj = array("name"=>$row['problem_name'], "solved"=>$row['problem_solved'],
                        "attempted"=>$row['problem_attempted'], "code"=>$row['problem_code']);
                        array_push($allquestions,$quesobj);
                }
                    
                }
            }
            else{
                $sql = "select problem_code, problem_name, problem_solved, problem_attempted from problems where problem_name is not null";
                $result = $db->query($sql);
                if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $quesobj = array("name"=>$row['problem_name'], "solved"=>$row['problem_solved'],
                    "attempted"=>$row['problem_attempted'], "code"=>$row['problem_code']);
                    array_push($allquestions,$quesobj);
                }
            }
        
            } 
        
        
        $db -> close();
        return $response->withJson($allquestions);
    });
?>