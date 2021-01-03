<!DOCTYPE html>
<html lang="fr">
    <head>
    <link type="text/css" rel="stylesheet" href="../../CSS/style.css">
        <!-- <?php include_once("../../View/heads/head.php"); // base ?>  -->
        <title>Snake - Reascer</title>
    </head>
    <body>
        <!-- <?php include_once("../../View/templates/header.html"); // header ?> -->
        <div class="content">
            <div class="center-element full absolute column">
<pre class="title">                 _        
 ___ _ ___  __ _| | _____ 
/ __| '_  \/ _` | |/ / _ \
\__ \ | | | (_| |   <  __/
|___/_| |_|\__,_|_|\_\___|
    -------------------
          Ascii
</pre>
<div class="gameBox">
<div class="shopMap" style="display: none">
<pre class="shopTitle">                 [shop]</pre>
<pre class="shopCadre">
+----------------------------------------+
|                                        |
|                                        |
|                                        |
|                                        |
|                                        |
|                                        |
|                                        |
|                                        |
|                                        |
|                                        |
|                                        |
|                                        |
|                                        |
|                                        |
|                                        |
|                                        |
+----------------------------------------+
</pre>
<pre class="snakeBody absolute">

                                         
                                          
                    <span class="snakeTail">o</span>                     
                    ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤       
                                  ¤       
        ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤       
        ¤                                 
        ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤           
                              ¤           
            ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤           
            ¤                             
            ¤ ¤ ¤ ¤ ¤ ¤ ¤ ¤               
                          ¤               
                    ¤ ¤ ¤ ¤               
                    <span class="snakeRing"></span>                     
                    <span class="snakeHead">O</span>                     
                                          
                                         

</pre>
<pre class="mySnakeBody"></pre>
</div>
    <pre class="map"></pre>
    <pre class="snake"></pre>
</div>
<div class="scoreBox">
    <pre class="score"></pre>
    <pre class="appleMessage"></pre>
</div>
<pre class="message"></pre>
<pre class="board"></pre>
<pre class="debug"></pre>
            </div>
        </div>
        <!-- <?php include_once("../../View/templates/footer.html"); // footer ?> -->
        <script type="text/javascript" src="../../JS/vanilla-tilt.min.js"></script>
        <script type="text/javascript">
            VanillaTilt.init(document.querySelectorAll("nav ul li"), {
                scale: 1.2,
                reverse: true,
                perspective: 500,
                speed: 700,
                max: 25,
            });
        </script>
        <script type="text/javascript" src="Snake.js"></script>
    </body>
</html>