<?php 
	header("Access-Control-Allow-Origin: *");

	include 'setdb.php';

	$username = $_GET['username'];

	$profileQuery = $db->prepare('select user.profile_pic_id from user join picture on user.profile_pic_id = picture.id where user.username = :username');
	$profileQuery->bindValue(':username', $username, PDO::PARAM_STR);

	$results = array();
	if ($profileQuery->execute()) {
	    while ($row = $profileQuery->fetch(PDO::FETCH_ASSOC)) {
	        $results["picture_id"] = $row["profile_pic_id"];
	    }
	}

	$picture_id = $results["picture_id"];

	$path = 'picture' . $picture_id . '.png';

	// Read path path, convert to base64 encoding
	$imageData = base64_encode(file_get_contents($path));

	// Format the path SRC:  data:{mime};base64,{data};
	$src = 'data: '.mime_content_type($path).';base64,'.$imageData;

	// Echo out a sample path
	echo "<img src=\"$src\" alt=\"\" />";
 ?>