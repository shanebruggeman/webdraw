<?php 
	header("Access-Control-Allow-Origin: *");

	include 'setdb.php';

	$picture_name = $_POST['name'];
	$ownerid = $_POST['userid'];
	$parentid;

	if(isset($_POST['parent'])) {
		$parentid = $_POST['parent'];
	}

	$profileQuery = $db->prepare('insert into picture(name,owner_id) values(:picture_name,:ownerid)');
	$profileQuery->bindValue(':picture_name', $picture_name, PDO::PARAM_STR);
	$profileQuery->bindValue(':ownerid', $ownerid, PDO::PARAM_STR);
	$profileQuery->execute();

	$maxQuery = $db->prepare('select max(id) as max from picture');
	$maxQuery->execute();

	$row = $maxQuery->fetch(PDO::FETCH_ASSOC);

	echo $row["max"];
?>