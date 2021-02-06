<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require  '../../vendor/autoload.php';
require '../../src/config/db.php';

header('Access-Control-Allow-Origin:*'); 
header('Access-Control-Allow-Headers:X-Request-With');

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

$app = new \Slim\App;

$app->get('/', function () { 
  echo 'Welcome to my slim app'; 
});

require '../../src/routes/searchtag.php';

/**************get all tags************/


require '../../src/routes/loggedinProblems.php';
require '../../src/routes/tags.php';
require '../../src/routes/registeration.php';
require '../../src/middleware/allowed.php';
require '../../src/routes/user.php';
require '../../src/routes/login.php';

require '../../src/routes/addtag.php';
require '../../src/routes/removetag.php';

require '../../src/routes/usertag.php';
require '../../src/routes/userTable.php';




#require '../../src/routes/problems/problems.php';

$app->run();