<?php
$baseURL = $_GET['base'];
$stop = $_GET['stop'];
$url = str_replace("<!stopNum!>",$stop, $baseURL);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$data = curl_exec($ch);
curl_close($ch);
echo $data;
?>
