<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	if(isset($_POST['userid']) && isset($_POST['pictureid'])){
		$userid = $_POST['userid'];
		$pictureid = $_POST['pictureid'];

		$query = $db->prepare('update picture set picture.owner_id = :userid where picture.id = :pictureid');
		$query->bindValue(':userid', $username, PDO::PARAM_STR);
		$query->bindValue(':pictureid', $pictureid, PDO::PARAM_STR);
		$query->execute();
	}
 ?>