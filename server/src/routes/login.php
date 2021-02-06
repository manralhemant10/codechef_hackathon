<?php

    use Slim\Http\Request;
    use Slim\Http\Response;
    use \Firebase\JWT\JWT;

    $app->post('/login', function (Request $request, Response $response, array $args) {
        $db = new db();
        $db = $db->connect_db();

        $input = $request->getParsedBody();
        $email = $input['email'];
        $pwd = sha1($input['password']);
        if ( !isset($email, $pwd) ) {
            return $response->withStatus(400)->withJson(['error' => true, 'message' => 'Either email or password missing']);  
        }

        if ($stmt = $db->prepare('select user_id,email,password FROM users WHERE email = ?')) {
            $stmt->bind_param('s', $email);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows > 0) {

                $stmt->bind_result($id, $emailData, $password);

                $stmt->fetch();
                //passwor_veriy fun not working do check
                if (!strcmp($pwd,$password)){
                    $payload = array(
                        'id' => $id,
                        'email' => $emailData
                    );
                    $secret = "codechef_hackathon_secret";
                    $token = JWT::encode($payload, $secret, "HS256");
                    return $response->withStatus(200)->withJson(['status'=>"success",'token' => $token]);
                } else {
                    return $response->withStatus(400)->withJson(['status' => 'failed','error'=>'These credentials do not match our records.']);  
                }
            } else {
                return $response->withStatus(400)->withJson(['status' => 'failed','error'=>'These credentials do not match our records.']);  
            }
            $stmt->close();

        }

    });

?>