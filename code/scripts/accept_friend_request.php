<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	$requesterid = $_POST['requesterid'];
	$requesteeid = $_POST['requesteeid'];

	$query = $db->prepare('select * from friend_request where requester_id = :requester and requestee_id = :requestee and acceptance = false');
	$query->bindValue(':requester', $requesterid, PDO::PARAM_STR);
	$query->bindValue(':requestee', $requesteeid, PDO::PARAM_STR);
	$query->execute();

	$count = $query->rowCount();

	// if there is no request between the two users, then fail
	if($count == 0) {
		http_response_code(500);
	}

	$query = $db->prepare('update friend_request set acceptance = true where requester_id = :requester and requestee_id = :requestee and acceptance = false');
	$query->bindValue(':requester', $requesterid, PDO::PARAM_STR);
	$query->bindValue(':requestee', $requesteeid, PDO::PARAM_STR);
	$query->execute();
 ?>