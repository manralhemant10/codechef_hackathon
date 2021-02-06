<?php
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Http\Message\ResponseInterface as Response;

    $app->get('/users', function ($request, $response, $args) {
        echo "i am secure";
    });
    
?>