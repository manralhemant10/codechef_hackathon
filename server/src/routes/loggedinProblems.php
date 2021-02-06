<?php
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Http\Message\ResponseInterface as Response;

    $app->post('/users/problems', function ($request, $response, $args) {
        $db = new db();
        $db = $db->connect_db();
        
        $userprobArr = array();
        $probArr = array();

        $allData = $request->getParsedBody();

        foreach($allData as $data){
            if(!strcmp($data['tagtype'],"user"))
                array_push($userprobArr, $data['tagname']);
            else
                array_push($probArr, $data['tagname']);
        }

        $outputuser = array();

        if(count($probArr)>0){
            $len = count($probArr);
            $fin='"' . implode ( '","', $probArr ) . '"'    ;     
            $normques = array();
            if ($stmt = $db->prepare('select problem_code, problem_name, problem_solved, problem_attempted from problems where problem_id in (select problem_id from problem_tag where tag_id in (select tag_id from tags where tag_name in ('.$fin.')) group by problem_id having count(problem_id)>=?)')) 
            {
                $stmt->bind_param('i', $len);
                $stmt->execute();
                $result = $stmt->get_result();
                $usertagsdata = array();
                while($row = $result->fetch_assoc()) {
                    $quesobj = array("name"=>$row['problem_name'], "solved"=>$row['problem_solved'],
                    "attempted"=>$row['problem_attempted'], "code"=>$row['problem_code']);
                    array_push($normques,$quesobj);
                }
                $stmt->close();
            }
        }
      
    //assuming only that user tag will be called ..can make it work other way by checking jwt id and verifying
       if(count($userprobArr)>0)
       {
            if(count($probArr)>0){
                $len = count($userprobArr);
                $fin='"' . implode ( '","', $userprobArr ) . '"'    ;     
               
                if ($stmt = $db->prepare('select problem_code from user_tags where user_tagname in ('.$fin.') group by problem_code having count(problem_code)>=?'))
                {
                    $stmt->bind_param('i', $len);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    $usertagsdata = array();
                    while($row = $result->fetch_assoc()) {
                        $code = $row['problem_code'];
                        foreach($normques as $nq){
                            if($nq['code']==$code)
                                array_push($outputuser,$nq);
                        }
                    }
                }
            }
            else{
                $fin='"' . implode ( '","', $userprobArr ) . '"'    ;  
                $codearr = array();
                if ($stmt = $db->prepare('select problem_code from user_tags where user_tagname in ('.$fin.')'))
                {
                    $stmt->execute();
                    $stmt->store_result();
                    $stmt->bind_result($code);
                    $usertagsdata = array();
                    while($stmt->fetch()){
                        $codearr[]= $code;
                    }
                }
                $fin='"' . implode ( '","', $codearr ) . '"'    ;  

                if ($stmt = $db->prepare('select problem_code, problem_name, problem_solved, problem_attempted from problems where problem_code in ('.$fin.')')) 
                {
                    $stmt->execute();
                    $result = $stmt->get_result();
                    $usertagsdata = array();
                    while($row = $result->fetch_assoc()) {
                        $quesobj = array("name"=>$row['problem_name'], "solved"=>$row['problem_solved'],
                        "attempted"=>$row['problem_attempted'], "code"=>$row['problem_code']);
                        array_push($outputuser,$quesobj);
                    }
                }
            }          
       }
       else{
        if(count($probArr)>0)
            $outputuser = $normques;
       }

       return $response->withJson($outputuser);

    });
?>