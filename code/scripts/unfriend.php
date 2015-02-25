<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	$userid = $_POST['userid'];
	$friendid = $_POST['friendid'];

	$query = $db->prepare('delete from friend_request where (requester_id = :userid || requester_id = :friendid) and (requestee_id = :userid || requestee_id = :friendid) and acceptance = true');

	$query->bindValue(':userid', $userid, PDO::PARAM_STR);
	$query->bindValue(':friendid', $friendid, PDO::PARAM_STR);
	$query->execute();
 ?>