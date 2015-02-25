<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	$userid = $_POST['userid'];
	$pictureid = $_POST['pictureid'];

	$query = $db->prepare('update user set user.profile_pic_id = :pictureid where user.id = :userid');
	$query->bindValue(':userid', $userid, PDO::PARAM_STR);
	$query->bindValue(':pictureid', $pictureid, PDO::PARAM_STR);
	$query->execute();
 ?>