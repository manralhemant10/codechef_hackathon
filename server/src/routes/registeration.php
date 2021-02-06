<?php

    use Slim\Http\Request;
    use Slim\Http\Response;

    $app->post('/register', function (Request $request, Response $response, array $args) {
        $db = new db();
        $db = $db->connect_db();

        $input = $request->getParsedBody();       
        $uname = $input['username'];
        $email = $input['email'];
        $pwd = sha1($input['password']);

        $sql="select * from users where user_name='$uname' or email='$email'";
        $res=mysqli_query($db,$sql);

        if (mysqli_num_rows($res) > 0) {
            $row = mysqli_fetch_assoc($res);
            if ($uname==$row['user_name'])
                return $response->withStatus(400)->withJson(['status' => "failed",'error'=>'User name already exist']);
            elseif($email==$row['email'])
                return $response->withStatus(400)->withJson(['status' => "failed",'error'=>'email already exist']);
            
        }
        $stmt = $db->prepare('insert into users (user_id,user_name,email,password) values (NULL,?,?,?)');
        $stmt->bind_param('sss',$uname,$email,$pwd);
        $stmt->execute();
        $stmt->close();
        $db->close();
        
        return $response->withJson(['status' => "success"]);
                        
      

    });

?>