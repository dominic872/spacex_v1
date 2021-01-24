<?php
//$url1 = 'json.php'; // path to your JSON file
$url2 = 'https://api.spacexdata.com/v3/launches?limit=100'; // path to your JSON file
$url3 = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true'; // path to your JSON file
$json = file_get_contents($url3);

$data = json_decode($json);
//echo $data[0]['title'];
echo $data[0]->flight_number;
echo $data[0]->mission_name;

foreach ($data as $dat) {
	echo $dat->flight_number .'::'. $dat->mission_name. '<br>';
}

$i = 0;
foreach ($data as $key->value){
  //echo "$data[0]->flight_number";
echo "<hr> $i";
echo $data[$i]->flight_number;
echo $data[$i]->mission_name;
$i = $i+1;
}



?>
