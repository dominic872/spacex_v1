
<!doctype html>
<html lang="en">
<head>
  <title>PoC for SpaceX</title>
  <meta charset="utf-8">
  <meta http-equiv="Content-Language" content="en">
	<meta name="keywords" content="SpaceX | POC" />
	<meta name="description" content="PoC for SpaceX: Develop a front-end application which would help users list and browse all launches by SpaceX program. " />
  <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">

  <link href="css/styles.css" rel="stylesheet">
  <link href="css/styles.min.css" rel="stylesheet">
</head>
<body>
  <div class="container-fluid">
    <h1 id="test">SpaceX Launch Programs</h1>    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    <div class="row">
      <div class="col-sm-12 col-md-4 col-lg-3 filter-group">
        <div class="filters">
        <strong>Filters</strong>
        <div >
            <span>Launch Year</span>
          <div class="launch-year">
            <button type="button" class="btn btn-success btn-sm">2006</button>
            <button type="button" class="btn btn-success btn-sm">2007</button>
            <button type="button" class="btn btn-success btn-sm">2008</button>
            <button type="button" class="btn btn-success btn-sm">2009</button>
            <button type="button" class="btn btn-success btn-sm">2010</button>
            <button type="button" class="btn btn-success btn-sm">2011</button>
            <button type="button" class="btn btn-success btn-sm">2012</button>
            <button type="button" class="btn btn-success btn-sm">2013</button>
            <button type="button" class="btn btn-success btn-sm">2014</button>
            <button type="button" class="btn btn-success btn-sm">2015</button>
            <button type="button" class="btn btn-success btn-sm">2016</button>
            <button type="button" class="btn btn-success btn-sm">2017</button>
            <button type="button" class="btn btn-success btn-sm">2018</button>
            <button type="button" class="btn btn-success btn-sm">2019</button>
            <button type="button" class="btn btn-success btn-sm">2020</button>
          </div>
        </div>
        <div>
          <span>Successful Launch</span>
          <div class="successful-launch">
            <button type="button" class="btn btn-success btn-sm">True</button>
            <button type="button" class="btn btn-success btn-sm">False</button>
          </div>
        </div>
        <div>
            <span>Successful Landing</span>
          <div class="successful-landing">
            <button type="button" class="btn btn-success btn-sm">True</button>
            <button type="button" class="btn btn-success btn-sm">False</button>
          </div>
        </div>
      
      </div>
      </div>
      <div class="col-sm-12 col-md-8 col-lg-9 products">
        <div class="row product-group">
          <?php
          $url1 = 'json.json'; // path to your JSON file
          $url2 = 'https://api.spacexdata.com/v3/launches?limit=100'; // path to your JSON file
          $url3 = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true'; // path to your JSON file
          $json = file_get_contents($url1);

          $data = json_decode($json);

          $i = 0;
          foreach ($data as $key->value){
            //echo "$data[0]->flight_number";
          
          echo "<div class='col-sm-12 col-md-6 col-lg-4 product-tile'>";
          echo "<div class='display-product'>";
          echo "<img src='".$data[$i]->links->mission_patch_small."' alt='".$data[$i]->details."' loading='lazy' width='100%' height='100%'/><br />";
          echo "<ul><li><strong>".$data[$i]->mission_name ." #".$data[$i]->flight_number."</strong></li>";
          
          echo "<li><strong>Mission IDs: </strong>";
          
          if(count($data[$i]->mission_id) === 0)
          echo "No ID Found";
          else {
            foreach ($data[$i]->mission_id as &$value) {
                echo $value;
            }
          }
          
          echo "</li>";
          echo "<li><strong>Launch Year: </strong>".$data[$i]->launch_year."</li>";
          echo "<li><strong>Successfull Launch: </strong>";
          if($data[$i]->launch_success==1)
          echo "true";
          else 
          echo "false";
          echo "</li></ul>";
          

          echo "</div>\n</div>";
          $i = $i+1;
          }



          ?>

        </div>
      </div>
    
    </div>



  </div>
</body>
</html>
  <script src="js/scripts.js"></script>
