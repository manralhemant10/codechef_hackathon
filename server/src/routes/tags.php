<?php
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Http\Message\ResponseInterface as Response;

    $app->get('/tags',function(Request $request, Response $response,array $args){

        $db = new db();
        $db = $db->connect_db();

        $sql = "select * from tags";
        $result = $db->query($sql);
        $tagsdata = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $rowdata = array("tagname"=>$row['tag_name'], "tagcount"=>$row['tag_count'],
                "type"=>$row['tag_type']);
                array_push($tagsdata,$rowdata);
            }
        }
        $db->close();
        return $response->withJson($tagsdata);


        


    });
?>