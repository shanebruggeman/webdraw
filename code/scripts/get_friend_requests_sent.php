<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	$userid = $_GET['userid'];

	$query = $db->prepare('select user.id, user.username, user.profile_pic_id from (select requestee_id as id from friend_request where requester_id = :userid and acceptance = false) as almost_friends join user on user.id = almost_friends.id');
	$query->bindValue(':userid', $userid, PDO::PARAM_STR);
	$query->execute();

	$results = array();

	if ($query->execute()) {
	    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
	    	$friend_id = $row["id"];
	    	$friend_username = $row["username"];
	    	$friend_pic_id = $row["profile_pic_id"];

	    	$results[$friend_username] = array();
	    	$results[$friend_username]["id"] = $friend_id;

	    	$path = 'pictures/picture' . $friend_id . '.png';
	
			// Read path path, convert to base64 encoding
			$imageData = base64_encode(file_get_contents($path));

			// Format the path SRC:  data:{mime};base64,{data};
			$src = 'data: '.mime_content_type($path).';base64,'.$imageData;

			// Echo out a sample path
			$imageHTML = "<img src=\"$src\" alt=\"\" />";
			
			$results[$friend_username]["image"] = $imageHTML;
	    }
	}

	echo json_encode($results);
 ?>