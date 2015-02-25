<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	$userid = $_GET['userid'];

	$query = $db->prepare('select user.id, user.username, user.profile_pic_id from (select user.id from user where user.id not in (select user.id from((select requester_id as id from friend_request where requestee_id = :userid) union (select requestee_id from friend_request where requester_id = :userid) order by id asc) as friends join user on user.id = friends.id) and user.id != :userid) as nonaffiliated join user on user.id = nonaffiliated.id');
	$query->bindValue(':userid', $userid, PDO::PARAM_STR);
	$query->execute();

	$count = $query->rowCount();

	$results = array();

	if ($query->execute()) {
	    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
	    	$not_friend_id = $row["id"];
	    	$not_friend_username = $row["username"];
	    	$not_friend_pic_id = $row["profile_pic_id"];

	    	$results[$not_friend_username] = array();
	    	$results[$not_friend_username]["id"] = $not_friend_id;

	    	$path = 'pictures/picture' . $not_friend_id . '.png';
	
			// Read path path, convert to base64 encoding
			$imageData = base64_encode(file_get_contents($path));

			// Format the path SRC:  data:{mime};base64,{data};
			$src = 'data: '.mime_content_type($path).';base64,'.$imageData;

			// Echo out a sample path
			$imageHTML = "<img src=\"$src\" alt=\"\" />";
			
			$results[$not_friend_username]["image"] = $imageHTML;
	    }
	}

	echo json_encode($results);
 ?>


